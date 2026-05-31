
/* =================================================================
   1) DỮ LIỆU TỪ VỰNG — tải động từ data/level1/part01-20.json
   ================================================================= */
let WORDS = [];
const WORD_MAP = {};
const STATUS = { NEW: 'new', LEARNING: 'learning', KNOWN: 'known' };

/* =================================================================
   1b) FIREBASE CONFIG — điền 6 giá trị sau khi tạo Firebase project
       (Hướng dẫn: console.firebase.google.com → Project settings → Web app)
   ================================================================= */
const FB_CFG = {
  apiKey:            "AIzaSyDhlDpLqN-lUsjIBE-lMw0srVgn3-7-bQQ",
  authDomain:        "english-app-cfd5d.firebaseapp.com",
  projectId:         "english-app-cfd5d",
  storageBucket:     "english-app-cfd5d.firebasestorage.app",
  messagingSenderId: "829270282426",
  appId:             "1:829270282426:web:062852b77391b413e13283"
};
const USE_FIREBASE = typeof firebase !== 'undefined' && FB_CFG.apiKey !== "FILL_IN";
let db = null, auth = null;
if (USE_FIREBASE) {
  firebase.initializeApp(FB_CFG);
  db   = firebase.firestore();
  auth = firebase.auth();
}

/* =================================================================
   1c) AZURE SPEECH CONFIG — chấm điểm phát âm qua Cloudflare Worker proxy
       Sau khi deploy worker/, điền URL vào đây. Key không còn ở client.
   ================================================================= */
const WORKER_URL = "https://english-app-azure-proxy.tuanvu-kttt.workers.dev";
const USE_AZURE  = WORKER_URL !== "FILL_IN_AFTER_DEPLOY";

/* =================================================================
   2) LỚP LƯU TRỮ — localStorage, tự chuyển sang bộ nhớ tạm
      nếu môi trường chặn (ví dụ trong artifact của Claude.ai)
   ================================================================= */
const Store = (() => {
  let ok = false, mem = {};
  try { const k="__t"; localStorage.setItem(k,"1"); localStorage.removeItem(k); ok=true; } catch(e){ ok=false; }
  return {
    available: ok,
    get(key, def){
      try{ const v = ok ? localStorage.getItem(key) : (key in mem ? mem[key] : null);
        return v==null ? def : JSON.parse(v); }catch(e){ return def; }
    },
    set(key, val){
      const s = JSON.stringify(val);
      try{ if(ok) localStorage.setItem(key,s); else mem[key]=s; }catch(e){ mem[key]=s; }
    }
  };
})();

/* =================================================================
   2b) LAZY LOADER — tải từ vựng Level 1 từ 20 file JSON nhỏ
   ================================================================= */
const levelCache = {};
let level1Ready = false;
let _level1Promise = null;

async function loadLevel1() {
  if (level1Ready) return;
  if (!_level1Promise) {
    _level1Promise = (async () => {
      if (levelCache[1]) { WORDS = levelCache[1]; level1Ready = true; return; }
      const manifest = await fetch('./data/level1/manifest.json').then(r => r.json());
      const parts = await Promise.all(
        Array.from({ length: manifest.parts }, (_, i) => {
          const n = String(i + 1).padStart(2, '0');
          return fetch(`./data/level1/part${n}.json`).then(r => r.json());
        })
      );
      const words = parts.flat();
      words.forEach(w => { WORD_MAP[w.id] = w; });
      WORDS = words;
      levelCache[1] = words;
      level1Ready = true;
      if (view === 'level1') render();
    })();
  }
  return _level1Promise;
}


/* =================================================================
   3) TRẠNG THÁI ỨNG DỤNG
   ================================================================= */
const todayStr = () => new Date().toISOString().slice(0,10);

let settings = Object.assign(
  { autoSpeak:true, autoSpeakExample:false, voiceLang:"en-US", theme:"light", dailyGoal:20 },
  Store.get("vocab_settings", {})
);
// progress[id] = {status:'new'|'learning'|'known', reps, ease, intervalDays, due(ts), last(ts)}
let progress = Store.get("vocab_progress", {});
let streak   = Store.get("vocab_streak", { count:0, lastDate:null });
let daily    = Store.get("vocab_daily",  { date:todayStr(), count:0 });
let currentUser = null;
let fsWriteTimer = null;

function saveAll(){
  Store.set("vocab_settings", settings);
  Store.set("vocab_progress", progress);
  Store.set("vocab_streak", streak);
  Store.set("vocab_daily", daily);
  if(currentUser){ clearTimeout(fsWriteTimer); fsWriteTimer = setTimeout(saveToFirestore, 2000); }
}

async function saveToFirestore(){
  if(!currentUser || !db) return;
  try{
    await db.doc(`users/${currentUser.uid}`).set(
      { settings, progress, streak, daily,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    );
  } catch(e){ /* offline — localStorage has the data */ }
}

async function loadFromFirestore(){
  if(!currentUser || !db) return;
  try{
    const snap = await db.doc(`users/${currentUser.uid}`).get();
    if(!snap.exists) return;
    const d = snap.data();
    if(d.progress){
      const merged = {...progress};
      for(const [id, remote] of Object.entries(d.progress)){
        const local = progress[id];
        if(!local || (remote.last||0) > (local.last||0)) merged[id] = remote;
      }
      progress = merged;
    }
    if(d.settings)  settings = Object.assign({...settings}, d.settings);
    if(d.streak)    streak   = d.streak;
    if(d.daily && d.daily.date === todayStr()) daily = d.daily;
    setTheme(settings.theme);
    Store.set("vocab_progress", progress);
    Store.set("vocab_settings", settings);
    Store.set("vocab_streak",   streak);
    Store.set("vocab_daily",    daily);
  } catch(e){ /* offline or error — use localStorage data */ }
}

// Trạng thái phiên học hiện tại (không cần lưu)
let view = "home";
let deck = [];        // mảng id từ trong bộ thẻ đang học
let pos = 0;          // vị trí thẻ hiện tại trong deck
let flipped = false;
let deckTitle = "";
let browseFilters = { q:"", level:0, pos:"all", status:"all" };
let deckDone = false;
let lastDeckKind = null;
const dailyMarked = new Set();

// Quiz state
let quizDeck = [], quizPos = 0, quizMode = "en_vi";
let quizAnswered = false, quizSelectedId = null, quizCorrectId = null;
let quizOptions = [], quizScore = { correct:0, total:0 };
let quizDone = false, lastQuizKind = null;

// Listening state
let listeningDeck = [], listeningPos = 0;
let listeningAnswered = false, listeningSelectedId = null;
let listeningCorrectId = null, listeningOptions = [];
let listeningScore = { correct:0, total:0 };
let listeningDone = false, lastListeningKind = null;

// Pronunciation assessment state
let isRecording    = false;
let mediaRecorder  = null;
let recordingStream = null;
let audioChunks    = [];
let recordingWordId = null;
let pronResult     = null;
let pronLoading    = false;
let recordedBlobUrl = null;

const P = id => progress[id] || { status:"new", reps:0, ease:2.5, intervalDays:0, due:0, last:0 };
const isKnown = id => P(id).status === "known";

/* =================================================================
   4) PHÁT ÂM — Web Speech API
   ================================================================= */
let voiceCache = [];
function loadVoices(){ try{ voiceCache = window.speechSynthesis.getVoices() || []; }catch(e){ voiceCache=[]; } }
if("speechSynthesis" in window){
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}
function pickVoice(lang){
  if(!voiceCache.length) loadVoices();
  // ưu tiên đúng ngôn ngữ (en-US / en-GB), nếu không có thì lấy giọng en bất kỳ
  return voiceCache.find(v=>v.lang && v.lang.toLowerCase()===lang.toLowerCase())
      || voiceCache.find(v=>v.lang && v.lang.toLowerCase().startsWith(lang.slice(0,2)))
      || null;
}
function speak(text, btn){
  if(!("speechSynthesis" in window)){ toast("Trình duyệt không hỗ trợ phát âm 😕"); return; }
  try{
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = settings.voiceLang;
    const v = pickVoice(settings.voiceLang);
    if(v) u.voice = v;
    u.rate = 0.92;
    if(btn){ btn.classList.add("speaking"); u.onend = u.onerror = ()=>btn.classList.remove("speaking"); }
    window.speechSynthesis.speak(u);
  }catch(e){ toast("Không phát âm được 😕"); }
}

/* =================================================================
   5) LẶP LẠI NGẮT QUÃNG (SM-2 rút gọn)
      - "Đã thuộc" (good): giãn khoảng cách ôn dần ra
      - "Học lại" (again): đặt lại, cho xuất hiện lại sớm
   ================================================================= */
function review(id, quality){
  const p = Object.assign({}, P(id));
  const now = Date.now();
  if(quality === "again"){
    p.reps = 0; p.intervalDays = 0;
    p.ease = Math.max(1.3, p.ease - 0.2);
    p.due = now + 60*1000;            // hiện lại sau ~1 phút (trong phiên)
    p.status = "learning";
  }else{ // good
    if(p.reps === 0) p.intervalDays = 1;
    else if(p.reps === 1) p.intervalDays = 3;
    else p.intervalDays = Math.round(p.intervalDays * p.ease);
    p.ease = Math.min(2.8, p.ease + 0.08);
    p.reps += 1;
    p.due = now + p.intervalDays*24*60*60*1000;
    p.status = p.reps >= 2 ? "known" : "learning";
  }
  p.last = now;
  progress[id] = p;
  saveAll();
}
// cập nhật mục tiêu ngày + streak khi học
function bumpDaily(){
  const t = todayStr();
  if(daily.date !== t){ daily = { date:t, count:0 }; }
  daily.count += 1;
  // streak
  if(streak.lastDate !== t){
    const yest = new Date(Date.now()-86400000).toISOString().slice(0,10);
    streak.count = (streak.lastDate === yest) ? streak.count+1 : 1;
    streak.lastDate = t;
  }
}

/* =================================================================
   6) TẠO BỘ THẺ (deck)
   ================================================================= */
async function startDeck(kind){
  if(!level1Ready) await loadLevel1();
  lastDeckKind = kind; deckDone = false;
  if(kind === "all"){ deck = WORDS.map(w=>w.id); deckTitle = "Học tất cả"; }
  else if(kind === "review"){
    const now = Date.now();
    deck = WORDS.filter(w=>{ const p=P(w.id); return p.status==="learning" || (p.status==="known" && p.due<=now); })
                .map(w=>w.id);
    deckTitle = "Ôn từ chưa thuộc";
  }
  else if(typeof kind==='string' && kind.startsWith('level1_part_')){
    const partIdx = parseInt(kind.slice('level1_part_'.length), 10);
    const start = partIdx * 50;
    deck = (levelCache[1] || WORDS).slice(start, start + 50).map(w => w.id);
    deckTitle = `Level 1 · Phần ${partIdx + 1} (${start + 1}–${start + 50})`;
  }
  else { // level 1/2/3
    deck = WORDS.filter(w=>w.level===kind).map(w=>w.id);
    deckTitle = "Cấp độ " + kind;
  }
  pos = 0; flipped = false; view = "study";
  render();
}
function startSingle(id){
  deck = [id]; pos = 0; flipped = false; deckDone = false; deckTitle = "Xem từ"; view = "study"; render();
}

/* =================================================================
   QUIZ
   ================================================================= */
function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}
function generateDistractors(word, count=3){
  const mainPos = word.pos.split(/\s*\/\s*/)[0];
  let pool = WORDS.filter(w=>w.id!==word.id && w.level===word.level && w.pos.split(/\s*\/\s*/)[0]===mainPos);
  if(pool.length < count) pool = WORDS.filter(w=>w.id!==word.id && w.level===word.level);
  if(pool.length < count) pool = WORDS.filter(w=>w.id!==word.id);
  return shuffle(pool).slice(0, count);
}
async function startQuiz(kind){
  if(!level1Ready) await loadLevel1();
  lastQuizKind = kind; quizDone = false;
  quizScore = { correct:0, total:0 }; quizPos = 0;
  const CAP = 20;
  if(kind === "all"){
    quizDeck = shuffle(WORDS.map(w=>w.id)).slice(0, CAP);
    deckTitle = "Quiz — Tất cả";
  } else if(kind === "review"){
    const now = Date.now();
    let ids = WORDS.filter(w=>{ const p=P(w.id); return p.status==="learning"||(p.status==="known"&&p.due<=now); }).map(w=>w.id);
    if(!ids.length) ids = WORDS.map(w=>w.id);
    quizDeck = shuffle(ids).slice(0, CAP);
    deckTitle = "Quiz — Ôn từ";
  } else if(typeof kind==='string' && kind.startsWith('level1_part_')){
    const partIdx = parseInt(kind.slice('level1_part_'.length), 10);
    const start = partIdx * 50;
    const slice = (levelCache[1] || WORDS).slice(start, start + 50);
    quizDeck = shuffle(slice.map(w => w.id)).slice(0, CAP);
    deckTitle = `Quiz · Phần ${partIdx + 1} (${start + 1}–${start + 50})`;
  } else {
    quizDeck = shuffle(WORDS.filter(w=>w.level===kind).map(w=>w.id)).slice(0, CAP);
    deckTitle = "Quiz — Cấp độ " + kind;
  }
  prepareQuestion();
  view = "quiz"; render();
}
function prepareQuestion(){
  quizAnswered = false; quizSelectedId = null;
  const word = WORD_MAP[quizDeck[quizPos]];
  quizMode = Math.random() > 0.5 ? "en_vi" : "vi_en";
  quizCorrectId = word.id;
  quizOptions = shuffle([word, ...generateDistractors(word, 3)]);
}
function quizAnswer(selectedId){
  if(quizAnswered) return;
  quizAnswered = true; quizSelectedId = selectedId;
  const correct = selectedId === quizCorrectId;
  quizScore.total++;
  if(correct) quizScore.correct++;
  review(quizCorrectId, correct ? "good" : "again");
  if(!dailyMarked.has(quizCorrectId)){ bumpDaily(); dailyMarked.add(quizCorrectId); }
  render();
}
function quizNext(){
  cancelRecording();
  if(quizPos < quizDeck.length-1){ quizPos++; prepareQuestion(); render(); }
  else { quizDone = true; render(); }
}

/* =================================================================
   LISTENING
   ================================================================= */
async function startListening(kind) {
  if (!level1Ready) await loadLevel1();
  lastListeningKind = kind;
  listeningDone = false;
  listeningScore = { correct:0, total:0 };
  listeningPos = 0;
  const CAP = 20;
  if (typeof kind === 'string' && kind.startsWith('level1_part_')) {
    const partIdx = parseInt(kind.slice('level1_part_'.length), 10);
    const start = partIdx * 50;
    const slice = (levelCache[1] || WORDS).slice(start, start + 50);
    listeningDeck = shuffle(slice.map(w => w.id)).slice(0, CAP);
    deckTitle = `Listening · Phần ${partIdx + 1} (${start + 1}–${start + 50})`;
  } else {
    listeningDeck = shuffle(WORDS.map(w => w.id)).slice(0, CAP);
    deckTitle = 'Listening — Tất cả';
  }
  prepareListeningQuestion();
  view = 'listening';
  render();
}

function prepareListeningQuestion() {
  listeningAnswered = false;
  listeningSelectedId = null;
  const correctWord = WORD_MAP[listeningDeck[listeningPos]];
  listeningCorrectId = correctWord.id;

  // Build distractor pool from same part slice (prefer same part, fallback to all WORDS)
  const partIds = new Set(listeningDeck);
  let pool = WORDS.filter(w => w.id !== correctWord.id && w.examples && w.examples.length > 0
    && partIds.has(w.id));
  if (pool.length < 3) {
    pool = WORDS.filter(w => w.id !== correctWord.id && w.examples && w.examples.length > 0);
  }
  const distractors = shuffle(pool).slice(0, 3);

  listeningOptions = shuffle([correctWord, ...distractors]).map(w => ({
    id: w.id,
    display: esc(blankWord(w.examples[0].en, w.word))
  }));

  // Auto-play after a short delay to let render complete
  setTimeout(() => { if (view === 'listening') speak(correctWord.word); }, 300);
}

function listeningAnswer(id) {
  if (listeningAnswered) return;
  listeningAnswered = true;
  listeningSelectedId = id;
  const correct = id === listeningCorrectId;
  listeningScore.total++;
  if (correct) listeningScore.correct++;
  review(listeningCorrectId, correct ? 'good' : 'again');
  if (!dailyMarked.has(listeningCorrectId)) { bumpDaily(); dailyMarked.add(listeningCorrectId); }
  render();
}

function listeningNext() {
  if (listeningPos < listeningDeck.length - 1) {
    listeningPos++;
    prepareListeningQuestion();
    render();
  } else {
    listeningDone = true;
    render();
  }
}

/* ---------- MÀN HÌNH QUIZ ---------- */
function viewQuiz(){
  if(quizDone){
    const pct = quizScore.total ? Math.round(quizScore.correct/quizScore.total*100) : 0;
    const emoji = pct>=80?'🏆':pct>=50?'👍':'💪';
    const msg   = pct>=80?'Xuất sắc!':pct>=50?'Tốt lắm!':'Cố lên nhé!';
    const reArg = typeof lastQuizKind==='number' ? lastQuizKind : `'${lastQuizKind}'`;
    return `
      <div class="topbar"><button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button><h1 style="font-size:1.1rem">${deckTitle}</h1></div>
      <div class="empty-state" style="padding-top:50px">
        <div class="big">${emoji}</div>
        <b style="font-size:1.3rem">${msg}</b><br><br>
        <div style="font-size:2rem;font-weight:700;color:var(--accent)">${quizScore.correct}/${quizScore.total}</div>
        <div style="color:var(--ink-soft);margin-top:4px">câu đúng · ${pct}%</div>
        <div style="margin-top:28px;display:flex;flex-direction:column;gap:12px;max-width:280px;margin-left:auto;margin-right:auto">
          <button class="mark-btn mark-known" onclick="startQuiz(${reArg})">🔁 Quiz lại</button>
          <button class="nav-btn" onclick="go('home')" style="padding:14px">🏠 Về trang chính</button>
        </div>
      </div>`;
  }
  if(!quizDeck.length){
    return `<div class="topbar"><button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button><h1>Quiz</h1></div>
      <div class="empty-state"><div class="big">😅</div><b>Không có từ để quiz!</b></div>`;
  }
  const word = WORD_MAP[quizCorrectId];
  const total = quizDeck.length;
  const isEnVi = quizMode === "en_vi";
  const shortVi = w => esc(w.vi.split(/[—;]/)[0].trim());
  const answerBtns = quizOptions.map(opt=>{
    const label = isEnVi ? shortVi(opt) : esc(opt.word);
    let cls = 'quiz-btn';
    if(quizAnswered){
      if(opt.id===quizCorrectId)       cls += ' correct';
      else if(opt.id===quizSelectedId) cls += ' wrong';
      else                             cls += ' dimmed';
    }
    return `<button class="${cls}" onclick="quizAnswer(${opt.id})" ${quizAnswered?'disabled':''}>${label}</button>`;
  }).join('');
  return `
  <div class="study-head">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button>
    <span class="deck-name">${deckTitle}</span>
    <span class="counter">${quizPos+1} / ${total}</span>
  </div>
  <div class="progress-track" style="margin-bottom:16px">
    <div class="progress-fill" style="width:${(quizPos+1)/total*100}%"></div>
  </div>
  <div class="quiz-question-card">
    ${isEnVi
      ? `<div class="quiz-word">${esc(word.word)}</div><div class="quiz-meta">${esc(word.ipa)} · ${esc(word.pos)}</div>`
      : `<div class="quiz-vi-q">${shortVi(word)}</div>`}
  </div>
  <div class="quiz-label">${isEnVi ? 'Nghĩa tiếng Việt là gì?' : 'Từ tiếng Anh là gì?'}</div>
  <div class="quiz-answers">${answerBtns}</div>
  ${quizAnswered
    ? `<div class="quiz-score-bar">${quizScore.correct}/${quizScore.total} câu đúng</div>
       <button class="mark-btn mark-known" onclick="quizNext()" style="width:100%">${quizPos<total-1?'Tiếp theo ›':'Xem kết quả 🏆'}</button>
       <div class="pronun-section">${recordBtn(quizCorrectId)}${viewPronResult(quizCorrectId)}</div>`
    : '<div class="quiz-score-bar">Chọn đáp án đúng</div>'}`;
}

/* ---------- MÀN HÌNH LISTENING ---------- */
function viewListening() {
  if (listeningDone) {
    const pct = listeningScore.total ? Math.round(listeningScore.correct / listeningScore.total * 100) : 0;
    const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪';
    const msg   = pct >= 80 ? 'Xuất sắc!' : pct >= 50 ? 'Tốt lắm!' : 'Cố lên nhé!';
    const reArg = `'${lastListeningKind}'`;
    return `
      <div class="topbar"><button class="icon-btn" aria-label="Về trang trước" onclick="go('level1')">‹</button><h1 style="font-size:1.1rem">${deckTitle}</h1></div>
      <div class="empty-state" style="padding-top:50px">
        <div class="big">${emoji}</div>
        <b style="font-size:1.3rem">${msg}</b><br><br>
        <div style="font-size:2rem;font-weight:700;color:var(--accent)">${listeningScore.correct}/${listeningScore.total}</div>
        <div style="color:var(--ink-soft);margin-top:4px">câu đúng · ${pct}%</div>
        <div style="margin-top:28px;display:flex;flex-direction:column;gap:12px;max-width:280px;margin-left:auto;margin-right:auto">
          <button class="mark-btn mark-known" onclick="startListening(${reArg})">🔁 Nghe lại</button>
          <button class="nav-btn" onclick="go('level1')" style="padding:14px">‹ Về Level 1</button>
        </div>
      </div>`;
  }

  if (!listeningDeck.length) {
    return `<div class="topbar"><button class="icon-btn" onclick="go('level1')">‹</button><h1>Listening</h1></div>
      <div class="empty-state"><div class="big">😅</div><b>Không có từ nào!</b></div>`;
  }

  const word = WORD_MAP[listeningCorrectId];
  const total = listeningDeck.length;

  const optionBtns = listeningOptions.map(opt => {
    let cls = 'listen-btn';
    if (listeningAnswered) {
      if (opt.id === listeningCorrectId)      cls += ' correct';
      else if (opt.id === listeningSelectedId) cls += ' wrong';
      else                                     cls += ' dimmed';
    }
    return `<button class="${cls}" onclick="listeningAnswer(${opt.id})" ${listeningAnswered ? 'disabled' : ''}>${opt.display}</button>`;
  }).join('');

  return `
  <div class="study-head">
    <button class="icon-btn" aria-label="Về Level 1" onclick="go('level1')">‹</button>
    <span class="deck-name">${deckTitle}</span>
    <span class="counter">${listeningPos + 1} / ${total}</span>
  </div>
  <div class="progress-track" style="margin-bottom:20px">
    <div class="progress-fill" style="width:${(listeningPos + 1) / total * 100}%"></div>
  </div>
  <div class="listen-card">
    <div class="listen-label">Câu nào dùng từ vừa nghe?</div>
    <button class="listen-play-btn" onclick="speak('${jsEsc(word.word)}')" title="Nghe lại">
      🔊 <span>Nghe lại</span>
    </button>
    <div class="listen-ipa">${esc(word.ipa)} · ${esc(word.pos)}</div>
  </div>
  <div class="listen-options">${optionBtns}</div>
  ${listeningAnswered ? `
    <div class="quiz-score-bar">${listeningScore.correct}/${listeningScore.total} câu đúng</div>
    <button class="mark-btn mark-known" onclick="listeningNext()" style="width:100%">
      ${listeningPos < total - 1 ? 'Tiếp theo ›' : 'Xem kết quả 🏆'}
    </button>` : `<div class="quiz-score-bar">Chọn câu đúng</div>`}`;
}

/* ---------- MÀN HÌNH LEVEL 1 — 20 PHẦN ---------- */
function partStats(partIndex) {
  const words = (levelCache[1] || []).slice(partIndex * 50, (partIndex + 1) * 50);
  const known = words.filter(w => isKnown(w.id)).length;
  const learning = words.filter(w => P(w.id).status === 'learning').length;
  return { total: words.length || 50, known, learning };
}

function viewLevel1() {
  if (!level1Ready) {
    loadLevel1(); // promise memoized — safe to call repeatedly
    return `
    <div class="topbar">
      <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button>
      <h1 style="font-size:1.2rem">Cấp độ 1</h1>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:55vh;gap:14px">
      <div class="loading-dot"></div>
      <p style="color:var(--ink-soft);font-size:.9rem">Đang tải từ vựng…</p>
    </div>`;
  }

  const total = levelCache[1].length;
  const totalKnown = levelCache[1].filter(w => isKnown(w.id)).length;
  const totalPct = Math.round(totalKnown / total * 100);
  const nextPartIdx = Array.from({length: 20}, (_, i) => i)
    .find(i => { const s = partStats(i); return s.total && s.known / s.total < 0.8; });

  const partCards = Array.from({length: 20}, (_, i) => {
    const s = partStats(i);
    const pct = s.total ? Math.round(s.known / s.total * 100) : 0;
    const start = i * 50 + 1;
    const end = (i + 1) * 50;
    const isRec = i === nextPartIdx;
    const colorCls = pct >= 80 ? 'part-done' : (s.known > 0 || s.learning > 0) ? 'part-progress' : '';
    const k = `'level1_part_${i}'`;
    return `<div class="part-card ${colorCls}">
      <div class="part-card-header">
        <div class="part-card-title">Phần ${i + 1}<span class="part-range">${start}–${end}</span>${isRec ? '<span class="part-badge">Học tiếp</span>' : ''}</div>
        <div class="part-stat">${s.known}/${s.total} thuộc</div>
      </div>
      <div class="progress-track" style="margin:6px 0 10px"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="part-actions">
        <button class="part-btn" onclick="startDeck(${k})">📖 Học</button>
        <button class="part-btn" onclick="startQuiz(${k})">🧠 Quiz</button>
      </div>
      <button class="part-btn part-listen-btn" onclick="startListening(${k})">👂 Listening</button>
    </div>`;
  }).join('');

  return `
  <div class="topbar">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button>
    <h1 style="font-size:1.2rem">Cấp độ 1 — 1000 Từ</h1>
  </div>
  <div class="progress-wrap">
    <div class="progress-meta"><span>Tiến độ Level 1</span><span>${totalKnown}/${total} từ (${totalPct}%)</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${totalPct}%"></div></div>
  </div>
  <div class="part-grid">${partCards}</div>
  <div class="level-grid" style="margin-top:12px;padding-bottom:20px">
    <button class="level-btn special" onclick="startDeck(1)">
      <div class="level-emoji">📚</div>
      <div class="level-info"><span class="t">Học tất cả Level 1</span><span class="d">Học toàn bộ 1000 từ liên tục</span></div>
      <span class="level-chev">›</span>
    </button>
    <button class="level-btn special" onclick="startQuiz(1)">
      <div class="level-emoji">⚡</div>
      <div class="level-info"><span class="t">Quiz Level 1</span><span class="d">20 câu ngẫu nhiên từ toàn bộ</span></div>
      <span class="level-chev">›</span>
    </button>
  </div>`;
}

/* =================================================================
   7) RENDER — vẽ giao diện theo trạng thái
   ================================================================= */
const app = document.getElementById("app");
const el = (html) => { const t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstChild; };

function setTheme(t){
  settings.theme = t;
  document.documentElement.setAttribute("data-theme", t);
  document.querySelector('meta[name=theme-color]').setAttribute("content", t==="dark" ? "#16140f" : "#f7f3ec");
}

/* =================================================================
   5b) FIREBASE AUTH
   ================================================================= */
/* =================================================================
   5c) PRONUNCIATION ASSESSMENT — Azure Speech REST API
   ================================================================= */
function cancelRecording(){
  if(recordedBlobUrl){ URL.revokeObjectURL(recordedBlobUrl); recordedBlobUrl=null; }
  if(mediaRecorder && mediaRecorder.state !== 'inactive'){
    mediaRecorder.onstop = null;
    mediaRecorder.stop();
  }
  if(recordingStream){ recordingStream.getTracks().forEach(t=>t.stop()); recordingStream=null; }
  isRecording=false; pronLoading=false; pronResult=null;
}

async function toggleRecording(wordId){
  if(isRecording){ stopRecording(); return; }
  await startRecording(wordId);
}

async function startRecording(wordId){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    recordingStream = stream;
    audioChunks = [];
    recordingWordId = wordId;
    pronResult = null;
    if(recordedBlobUrl){ URL.revokeObjectURL(recordedBlobUrl); recordedBlobUrl=null; }

    const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus'
               : MediaRecorder.isTypeSupported('audio/webm')             ? 'audio/webm'
               : '';
    mediaRecorder = mime ? new MediaRecorder(stream, {mimeType:mime}) : new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => { if(e.data.size>0) audioChunks.push(e.data); };
    mediaRecorder.onstop = async () => {
      if(recordingStream){ recordingStream.getTracks().forEach(t=>t.stop()); recordingStream=null; }
      isRecording = false;
      pronLoading = true;
      updateRecordBtnDOM();
      const rawBlob = new Blob(audioChunks, {type: mediaRecorder.mimeType||'audio/webm'});
      recordedBlobUrl = URL.createObjectURL(rawBlob);
      const word = WORD_MAP[recordingWordId];
      if(word){
        try{
          const wavBlob = await blobToWav(rawBlob);
          pronResult = await assessPronunciation(word.word, wavBlob, recordingWordId);
        }catch(e){ toast("Lỗi chấm điểm: "+(e.message||e)); }
      }
      pronLoading = false;
      render();
    };

    mediaRecorder.start();
    isRecording = true;
    updateRecordBtnDOM();
    setTimeout(()=>{ if(isRecording) stopRecording(); }, 6000);

  }catch(e){
    if(e.name==='NotAllowedError') toast("Hãy cho phép truy cập microphone rồi thử lại.");
    else toast("Lỗi microphone: "+(e.message||e));
  }
}

function stopRecording(){
  if(!mediaRecorder || mediaRecorder.state==='inactive') return;
  mediaRecorder.stop();
}

function updateRecordBtnDOM(){
  document.querySelectorAll('.record-btn').forEach(btn=>{
    btn.textContent = isRecording ? '⏹ Dừng ghi' : pronLoading ? '⏳ Đang chấm...' : '🎙 Ghi âm';
    btn.classList.toggle('recording', isRecording);
    btn.disabled = pronLoading;
  });
}

function playRecording(){
  if(!recordedBlobUrl) return;
  new Audio(recordedBlobUrl).play().catch(()=>{});
}

/* Chuyển blob ghi âm → WAV PCM 16kHz mono (Azure yêu cầu) */
async function blobToWav(blob){
  const arrayBuf = await blob.arrayBuffer();
  const decodeCtx = new (window.AudioContext||window.webkitAudioContext)();
  const sourceBuf = await decodeCtx.decodeAudioData(arrayBuf);
  decodeCtx.close();
  const targetRate = 16000;
  const offCtx = new OfflineAudioContext(1, Math.ceil(sourceBuf.duration*targetRate), targetRate);
  const src = offCtx.createBufferSource();
  src.buffer = sourceBuf;
  src.connect(offCtx.destination);
  src.start(0);
  const resampled = await offCtx.startRendering();
  return pcmToWav(resampled.getChannelData(0), targetRate);
}

function pcmToWav(pcm, rate){
  const buf = new ArrayBuffer(44 + pcm.length*2);
  const v = new DataView(buf);
  const ws = (o,s)=>{ for(let i=0;i<s.length;i++) v.setUint8(o+i,s.charCodeAt(i)); };
  ws(0,'RIFF'); v.setUint32(4,36+pcm.length*2,true);
  ws(8,'WAVE'); ws(12,'fmt '); v.setUint32(16,16,true);
  v.setUint16(20,1,true); v.setUint16(22,1,true);
  v.setUint32(24,rate,true); v.setUint32(28,rate*2,true);
  v.setUint16(32,2,true); v.setUint16(34,16,true);
  ws(36,'data'); v.setUint32(40,pcm.length*2,true);
  let o=44;
  for(let i=0;i<pcm.length;i++){
    const s=Math.max(-1,Math.min(1,pcm[i]));
    v.setInt16(o,s<0?s*0x8000:s*0x7FFF,true); o+=2;
  }
  return new Blob([buf],{type:'audio/wav'});
}

async function assessPronunciation(word, wavBlob, wordId){
  const audioBase64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(wavBlob);
  });

  const res = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word, audioBase64 })
  });
  if(!res.ok){ const t=await res.text(); throw new Error(`Worker ${res.status}: ${t.slice(0,120)}`); }
  const data = await res.json();
  const nb = data.NBest?.[0];
  if(data.RecognitionStatus !== 'Success' || nb?.PronScore == null){
    return {wordId, score:0, accuracy:0, fluency:0, completeness:0, recognized:data.DisplayText||'', failed:true, status:data.RecognitionStatus};
  }
  return {
    wordId,
    score:        Math.round(nb.PronScore),
    accuracy:     Math.round(nb.AccuracyScore),
    fluency:      Math.round(nb.FluencyScore),
    completeness: Math.round(nb.CompletenessScore),
    recognized:   (data.DisplayText||'').replace(/\.$/, '')
  };
}

function recordBtn(wordId){
  if(!USE_AZURE) return '';
  const active  = isRecording  && recordingWordId===wordId;
  const loading = pronLoading  && recordingWordId===wordId;
  const label   = active ? '⏹ Dừng ghi' : loading ? '⏳ Đang chấm...' : '🎙 Ghi âm phát âm';
  const playBtn = !active && !loading && recordedBlobUrl && recordingWordId===wordId
    ? `<button class="play-rec-btn" onclick="playRecording()" title="Nghe lại giọng của bạn">▶ Nghe lại</button>` : '';
  return `<div class="record-row">${playBtn}<button class="record-btn${active?' recording':''}" onclick="toggleRecording(${wordId})" ${loading?'disabled':''}>${label}</button></div>`;
}

function viewPronResult(wordId){
  if(!pronResult || pronResult.wordId!==wordId) return '';
  const r = pronResult;
  const color = r.score>=80?'var(--known)':r.score>=50?'var(--accent)':'var(--relearn)';
  const bar = v=>`<div class="pron-bar-track"><div class="pron-bar-fill" style="width:${v}%;background:${color}"></div></div>`;
  if(r.failed) return `<div class="pronun-result"><div class="pron-fail">Không nhận ra được từ (${r.status||'NoMatch'}). Nói to và rõ hơn nhé!</div></div>`;
  return `
  <div class="pronun-result">
    <div class="pron-header">
      <span class="pron-main" style="color:${color}">${r.score}<span class="pron-pct">%</span></span>
      <span class="pron-sublabel">Phát âm tổng</span>
    </div>
    <div class="pron-breakdown">
      <div class="pron-row"><span>Chính xác</span>${bar(r.accuracy)}<span class="pron-val">${r.accuracy}</span></div>
      <div class="pron-row"><span>Lưu loát</span>${bar(r.fluency)}<span class="pron-val">${r.fluency}</span></div>
      <div class="pron-row"><span>Đầy đủ</span>${bar(r.completeness)}<span class="pron-val">${r.completeness}</span></div>
    </div>
    ${r.recognized?`<div class="pron-recognized">Nghe được: "<b>${esc(r.recognized)}</b>"</div>`:''}
  </div>`;
}
function signInGoogle(){
  if(!auth) return;
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch(e => {
      if(e.code === 'auth/popup-blocked')
        toast("Popup bị chặn — hãy cho phép popup trong trình duyệt rồi thử lại.");
      else if(e.code !== 'auth/popup-closed-by-user')
        toast("Đăng nhập thất bại: " + (e.message || e.code));
    });
}

function doSignOut(){
  if(!auth) return;
  if(!confirm("Đăng xuất? Tiến độ đã được lưu trên server.")) return;
  clearTimeout(fsWriteTimer);
  auth.signOut().then(() => { currentUser = null; view = "login"; render(); });
}

function continueAsGuest(){ loadLevel1(); view = "home"; render(); }

async function initAuth(){
  setTheme(settings.theme);
  if(!USE_FIREBASE || !auth){ view = "home"; render(); return; }
  app.innerHTML = `<div class="loading-screen"><div class="loading-dot"></div></div>`;
  auth.onAuthStateChanged(async user => {
    currentUser = user;
    if(user) await loadFromFirestore();
    loadLevel1(); // start loading in background
    view = user ? "home" : "login";
    render();
  });
}

function render(){
  app.className = "app fade-in";
  if(view==="login")         app.innerHTML = viewLogin();
  else if(view==="home")        app.innerHTML = viewHome();
  else if(view==="study")  app.innerHTML = viewStudy();
  else if(view==="quiz")   app.innerHTML = viewQuiz();
  else if(view==="browse") app.innerHTML = viewBrowse();
  else if(view==="level1")     app.innerHTML = viewLevel1();
  else if(view==="listening")  app.innerHTML = viewListening();
  else if(view==="settings")app.innerHTML = viewSettings();
  // ép trình duyệt chạy lại animation
  void app.offsetWidth;
}

/* ---------- thống kê tổng ---------- */
function stats(){
  const total = WORDS.length;
  const known = WORDS.filter(w=>isKnown(w.id)).length;
  const learning = WORDS.filter(w=>P(w.id).status==="learning").length;
  const t = todayStr();
  const todayCount = daily.date===t ? daily.count : 0;
  return { total, known, learning, streak:streak.count, todayCount, goal:settings.dailyGoal };
}

/* ---------- MÀN HÌNH ĐĂNG NHẬP ---------- */
function viewLogin(){
  const googleBtn = USE_FIREBASE ? `
    <button class="google-btn" onclick="signInGoogle()">
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Đăng nhập với Google
    </button>` : `<div class="app-note">Firebase chưa được cấu hình.</div>`;
  return `
  <div class="login-screen">
    <div class="login-logo">A</div>
    <div class="login-title">3000 Từ Vựng</div>
    <div class="login-sub">Đăng nhập để đồng bộ tiến độ học giữa điện thoại và máy tính.</div>
    ${googleBtn}
    <span class="guest-link" onclick="continueAsGuest()">Tiếp tục không đăng nhập →</span>
  </div>`;
}

/* ---------- MÀN HÌNH CHÍNH ---------- */
function viewHome(){
  const s = stats();
  const pct = s.total ? Math.round(s.known/s.total*100) : 0;
  const goalPct = Math.min(100, Math.round(s.todayCount/s.goal*100));
  const lvl = n => {
    const words = WORDS.filter(w=>w.level===n);
    const k = words.filter(w=>isKnown(w.id)).length;
    return { count:words.length, known:k, pct: words.length? Math.round(k/words.length*100):0 };
  };
  const l1=lvl(1), l2=lvl(2), l3=lvl(3);
  const levelRow = (emoji,title,desc,info,kind,special) => `
    <button class="level-btn ${special?'special':''}" onclick="startDeck(${typeof kind==='number'?kind:`'${kind}'`})">
      <div class="level-emoji">${emoji}</div>
      <div class="level-info">
        <span class="t">${title}</span>
        <span class="d">${desc}</span>
        ${info.count?`<div class="level-mini-track"><div class="level-mini-fill" style="width:${info.pct}%"></div></div>`:''}
      </div>
      <span class="level-chev">›</span>
    </button>`;

  return `
  <div class="topbar">
    <h1><span class="brand-dot"></span> 3000 Từ Vựng</h1>
    <button class="icon-btn" aria-label="Tìm kiếm" onclick="go('browse')" title="Tìm kiếm">🔍</button>
    <button class="icon-btn" aria-label="Cài đặt" onclick="go('settings')" title="Cài đặt">⚙️</button>
  </div>

  <div class="progress-wrap">
    <div class="progress-meta"><span>Tiến độ chung</span><span>${s.known}/${s.total} từ (${pct}%)</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
  </div>

  <div class="hero">
    <div class="hero-title">Xin chào 👋</div>
    <div class="hero-sub">Học vài từ mới hôm nay nhé. Mỗi ngày một chút!</div>
    <div class="stat-row">
      <div class="stat"><div class="num known">${s.known}</div><div class="lbl">Đã thuộc</div></div>
      <div class="stat"><div class="num">${s.learning}</div><div class="lbl">Đang học</div></div>
      <div class="stat"><div class="num streak">${s.streak}🔥</div><div class="lbl">Ngày liên tục</div></div>
    </div>
  </div>

  <div class="goal-card">
    <div class="goal-top"><b>Mục tiêu hôm nay</b><span>${s.todayCount}/${s.goal} từ</span></div>
    <div class="progress-track"><div class="progress-fill" style="width:${goalPct}%"></div></div>
  </div>

  <div class="section-label">Học thẻ</div>
  <div class="level-grid">
    <button class="level-btn" onclick="go('level1')">
      <div class="level-emoji">🌱</div>
      <div class="level-info">
        <span class="t">Cấp độ 1</span>
        <span class="d">1000 từ thông dụng · 20 phần học</span>
        ${l1.count ? `<div class="level-mini-track"><div class="level-mini-fill" style="width:${l1.pct}%"></div></div>` : ''}
      </div>
      <span class="level-chev">›</span>
    </button>
    ${levelRow('🌿','Cấp độ 2','1000 từ mức trung bình',l2,2)}
    ${levelRow('🌳','Cấp độ 3','1000 từ nâng cao hơn',l3,3)}
    ${levelRow('📚','Học tất cả',`Toàn bộ ${s.total} từ hiện có`,{count:0},'all',true)}
    ${levelRow('🔁','Ôn từ chưa thuộc','Ưu tiên từ cần ôn lại',{count:0},'review',true)}
  </div>
  <div class="app-note" style="margin-top:22px">${currentUser?'☁️ Tiến độ đồng bộ qua tài khoản Google.':Store.available?'':'⚠️ Môi trường này không lưu được tiến độ lâu dài. Khi mở file trên điện thoại/máy tính thật, tiến độ sẽ được lưu tự động.'}</div>`;
}

/* ---------- MÀN HÌNH HỌC ---------- */
function viewStudy(){
  if(deckDone){
    const replayArg = typeof lastDeckKind==='number' ? lastDeckKind : `'${lastDeckKind}'`;
    return `
      <div class="topbar"><button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button><h1 style="font-size:1.1rem">${deckTitle}</h1></div>
      <div class="empty-state" style="padding-top:60px">
        <div class="big">🎉</div>
        <b style="font-size:1.3rem">Xong rồi!</b><br><br>
        <div style="color:var(--ink-soft)">Bạn đã học qua <b style="color:var(--ink)">${deck.length}</b> thẻ trong bộ này.</div>
        <div style="margin-top:28px;display:flex;flex-direction:column;gap:12px;max-width:280px;margin-left:auto;margin-right:auto">
          <button class="mark-btn mark-known" onclick="startDeck(${replayArg})">🔁 Học lại bộ này</button>
          <button class="nav-btn" onclick="go('home')" style="padding:14px">🏠 Về trang chính</button>
        </div>
      </div>`;
  }
  if(!deck.length){
    return `
      <div class="topbar"><button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button><h1 style="font-size:1.1rem">${deckTitle}</h1></div>
      <div class="empty-state"><div class="big">🎉</div><b>Không có thẻ nào ở đây!</b><br>
      ${deckTitle==='Ôn từ chưa thuộc'?'Bạn đã ôn hết các từ cần học rồi. Quá giỏi!':'Hãy thêm từ vào danh sách hoặc chọn nội dung khác.'}</div>`;
  }
  const id = deck[pos];
  const w = WORD_MAP[id];
  const st = P(id).status;
  const total = deck.length;
  const statusBadge = st==="known" ? `<span class="status-dot status-known">đã thuộc</span>`
                    : st==="learning" ? `<span class="status-dot status-learning">đang học</span>` : "";
  const exHtml = w.examples.map((e,i)=>`
      <div class="example">
        <div class="ex-text"><div class="ex-en">${esc(e.en)}</div><div class="ex-vi">${esc(e.vi)}</div></div>
        <button class="speak-sm" aria-label="Nghe phát âm câu ví dụ" onclick="event.stopPropagation();speak('${jsEsc(e.en)}',this)">🔊</button>
      </div>`).join("");

  return `
  <div class="study-head">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')" title="Về trang chính">‹</button>
    <span class="deck-name">${deckTitle}</span>
    <span class="counter">Thẻ ${pos+1} / ${total}</span>
  </div>
  <div class="progress-track" style="margin-bottom:16px"><div class="progress-fill" style="width:${(pos+1)/total*100}%"></div></div>

  <div class="card-stage" id="stage">
    <div class="card ${flipped?'is-flipped':''}" id="card" onclick="toggleFlip()">
      <!-- MẶT TRƯỚC -->
      <div class="face front">
        ${statusBadge}
        <span class="pos-pill">${esc(w.pos)}</span>
        <div class="word">${esc(w.word)}</div>
        <div class="ipa">${esc(w.ipa)}</div>
        <button class="speak-big" aria-label="Nghe phát âm từ" onclick="event.stopPropagation();speak('${jsEsc(w.word)}',this)" title="Nghe phát âm">🔊</button>
        <div class="flip-hint">Chạm để lật • Space để xem nghĩa</div>
      </div>
      <!-- MẶT SAU -->
      <div class="face back">
        <div class="head-row">
          <div style="flex:1">
            <div class="word-sm">${esc(w.word)}</div>
            <div class="ipa-sm">${esc(w.ipa)} · ${esc(w.pos)}</div>
          </div>
          <button class="speak-sm" aria-label="Nghe phát âm từ" onclick="event.stopPropagation();speak('${jsEsc(w.word)}',this)">🔊</button>
        </div>
        <div class="vi-meaning">${esc(w.vi)}</div>
        <div class="divider"></div>
        <div class="ex-label">Ví dụ</div>
        ${exHtml}
      </div>
    </div>
  </div>

  <div id="pronunSection" class="pronun-section" style="${flipped?'':'display:none'}">${recordBtn(w.id)}${viewPronResult(w.id)}</div>

  <div class="study-controls">
    <div class="mark-row">
      <button class="mark-btn mark-relearn" onclick="mark('again')">🔁 Học lại</button>
      <button class="mark-btn mark-known" onclick="mark('good')">✅ Đã thuộc</button>
    </div>
    <div class="nav-row">
      <button class="nav-btn" onclick="prev()" ${pos===0?'disabled':''}>‹ Trước</button>
      <button class="nav-btn" onclick="next()" ${pos>=total-1?'disabled':''}>Sau ›</button>
    </div>
  </div>`;
}

/* ---------- MÀN HÌNH TÌM KIẾM / DUYỆT ---------- */
function viewBrowse(){
  const f = browseFilters;
  const q = f.q.trim().toLowerCase();
  let list = WORDS.filter(w=>{
    if(f.level && w.level!==f.level) return false;
    if(f.pos!=="all" && !w.pos.toLowerCase().split(/\s*\/\s*/).includes(f.pos)) return false;
    if(f.status==="known" && !isKnown(w.id)) return false;
    if(f.status==="unknown" && isKnown(w.id)) return false;
    if(q && !(w.word.toLowerCase().includes(q) || w.vi.toLowerCase().includes(q))) return false;
    return true;
  });
  const rows = list.slice(0,300).map(w=>{
    const st = P(w.id).status;
    const cls = st==="known"?"known":st==="learning"?"learning":"";
    return `<div class="word-row" onclick="startSingle(${w.id})">
        <span class="wr-status ${cls}"></span>
        <div class="wr-main">
          <span class="wr-word">${esc(w.word)}</span>
          <span style="color:var(--ink-soft);font-size:.8rem"> · L${w.level}</span>
        </div>
        <span class="wr-vi">${esc(w.vi.split('—')[0])}</span>
      </div>`;
  }).join("");

  const chip = (label,active,onclick)=>`<button class="chip ${active?'active':''}" onclick="${onclick}">${label}</button>`;
  return `
  <div class="topbar">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button>
    <h1 style="font-size:1.2rem">Tìm kiếm & Lọc</h1>
  </div>
  <div class="search-box">
    <span class="s-icon">🔍</span>
    <input id="searchInput" placeholder="Tìm theo tiếng Anh hoặc tiếng Việt..." value="${esc(f.q)}"
      oninput="browseFilters.q=this.value; refreshList()">
  </div>
  <div class="filters">
    ${chip('Tất cả cấp',f.level===0,"setFilter('level',0)")}
    ${chip('Cấp 1',f.level===1,"setFilter('level',1)")}
    ${chip('Cấp 2',f.level===2,"setFilter('level',2)")}
    ${chip('Cấp 3',f.level===3,"setFilter('level',3)")}
    ${chip('Danh từ',f.pos==='noun',"setFilter('pos','noun')")}
    ${chip('Động từ',f.pos==='verb',"setFilter('pos','verb')")}
    ${chip('Tính từ',f.pos==='adjective',"setFilter('pos','adjective')")}
    ${chip('Mọi loại từ',f.pos==='all',"setFilter('pos','all')")}
    ${chip('Đã thuộc',f.status==='known',"setFilter('status','known')")}
    ${chip('Chưa thuộc',f.status==='unknown',"setFilter('status','unknown')")}
    ${chip('Mọi trạng thái',f.status==='all',"setFilter('status','all')")}
  </div>
  <div class="result-count" id="resultCount">${list.length} từ</div>
  <div class="word-list" id="wordList">${rows || '<div class="empty-state">Không tìm thấy từ nào 🤔</div>'}</div>`;
}

/* ---------- MÀN HÌNH CÀI ĐẶT ---------- */
function viewSettings(){
  const s = settings;
  const seg = (val,opts) => `<div class="seg">${opts.map(o=>`<button class="${val===o.v?'active':''}" onclick="${o.fn}">${o.t}</button>`).join("")}</div>`;
  return `
  <div class="topbar">
    <button class="icon-btn" aria-label="Về trang chính" onclick="go('home')">‹</button>
    <h1 style="font-size:1.2rem">Cài đặt</h1>
  </div>

  ${currentUser ? `
  <div class="section-label">Tài khoản</div>
  <div class="setting-card">
    <div class="setting-row">
      <div class="s-info">
        <div class="s-title">${esc(currentUser.displayName||'Người dùng')}</div>
        <div class="s-desc">${esc(currentUser.email||'')}</div>
      </div>
      ${currentUser.photoURL?`<img src="${esc(currentUser.photoURL)}" width="38" height="38" style="border-radius:50%;border:1.5px solid var(--line);flex-shrink:0">`:``}
    </div>
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Đồng bộ dữ liệu</div><div class="s-desc">Tiến độ tự động lưu lên Google</div></div>
      <span style="color:var(--known);font-size:.85rem;font-weight:600">● Đang bật</span>
    </div>
  </div>
  <button class="data-btn danger" style="margin-bottom:8px" onclick="doSignOut()">🚪 Đăng xuất</button>
  ` : USE_FIREBASE ? `
  <div class="section-label">Tài khoản</div>
  <button class="google-btn" style="max-width:100%;margin-bottom:16px" onclick="signInGoogle()">
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    Đăng nhập để đồng bộ tiến độ
  </button>
  ` : ``}

  <div class="section-label">Phát âm</div>
  <div class="setting-card">
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Tự động đọc khi mở thẻ</div><div class="s-desc">Đọc từ ngay khi xem thẻ mới</div></div>
      <label class="toggle"><input type="checkbox" ${s.autoSpeak?'checked':''} onchange="settings.autoSpeak=this.checked;saveAll()"><span class="track"></span></label>
    </div>
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Tự động đọc cả câu ví dụ</div><div class="s-desc">Khi lật ra mặt sau, đọc luôn ví dụ đầu tiên</div></div>
      <label class="toggle"><input type="checkbox" ${s.autoSpeakExample?'checked':''} onchange="settings.autoSpeakExample=this.checked;saveAll()"><span class="track"></span></label>
    </div>
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Giọng đọc</div><div class="s-desc">Chọn giọng Anh-Mỹ hoặc Anh-Anh</div></div>
      ${seg(s.voiceLang,[{v:'en-US',t:'US 🇺🇸',fn:"settings.voiceLang='en-US';saveAll();render()"},{v:'en-GB',t:'UK 🇬🇧',fn:"settings.voiceLang='en-GB';saveAll();render()"}])}
    </div>
  </div>

  <div class="section-label">Giao diện</div>
  <div class="setting-card">
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Chế độ màu</div><div class="s-desc">Nền sáng hoặc nền tối (học ban đêm)</div></div>
      ${seg(s.theme,[{v:'light',t:'☀️ Sáng',fn:"applyTheme('light')"},{v:'dark',t:'🌙 Tối',fn:"applyTheme('dark')"}])}
    </div>
    <div class="setting-row">
      <div class="s-info"><div class="s-title">Mục tiêu mỗi ngày</div><div class="s-desc">Số từ muốn học mỗi ngày</div></div>
      <input class="goal-input" type="number" min="5" max="200" value="${s.dailyGoal}" onchange="settings.dailyGoal=Math.max(1,parseInt(this.value)||20);saveAll()">
    </div>
  </div>

  <div class="section-label">Dữ liệu & Tiến độ</div>
  <div class="setting-card" style="padding:16px 16px 6px">
    <button class="data-btn" onclick="exportProgress()">⬇️ Xuất tiến độ ra file JSON</button>
    <button class="data-btn" onclick="document.getElementById('importFile').click()">⬆️ Nhập tiến độ từ file JSON</button>
    <input type="file" id="importFile" accept="application/json" class="hidden" onchange="importProgress(event)">
    <button class="data-btn danger" onclick="resetProgress()">🗑️ Đặt lại toàn bộ tiến độ</button>
  </div>

  <div class="app-note">
    Hiện có <b>${WORDS.length}</b> từ trong ứng dụng.<br>
    Tiến độ ${currentUser?'đồng bộ qua tài khoản Google.':Store.available?'được lưu tự động trên thiết bị này.':'tạm thời (môi trường này không lưu được lâu dài).'}
  </div>`;
}

/* =================================================================
   8) HÀNH ĐỘNG NGƯỜI DÙNG
   ================================================================= */
function go(v){ cancelRecording(); view=v; render(); }
function toggleFlip(){
  flipped = !flipped;
  const c = document.getElementById("card");
  if(c) c.classList.toggle("is-flipped", flipped);
  const ps = document.getElementById("pronunSection");
  if(ps) ps.style.display = flipped ? '' : 'none';
  if(flipped && settings.autoSpeakExample){
    const w = WORD_MAP[deck[pos]];
    if(w && w.examples[0]) setTimeout(()=>speak(w.examples[0].en),350);
  }
}
function next(){ if(pos<deck.length-1){ cancelRecording(); pos++; flipped=false; render(); autoSpeak(); } }
function prev(){ if(pos>0){ cancelRecording(); pos--; flipped=false; render(); autoSpeak(); } }
function autoSpeak(){
  if(settings.autoSpeak){ const w=WORD_MAP[deck[pos]]; if(w) setTimeout(()=>speak(w.word),250); }
}
function mark(quality){
  cancelRecording();
  const id = deck[pos];
  review(id, quality);
  if(!dailyMarked.has(id)){ bumpDaily(); dailyMarked.add(id); }
  toast(quality==='good' ? '✅ Đã đánh dấu thuộc' : '🔁 Sẽ ôn lại sớm');
  setTimeout(()=>{ if(pos<deck.length-1){ next(); } else { deckDone=true; render(); } }, 250);
}
function applyTheme(t){ setTheme(t); saveAll(); render(); }

/* tìm kiếm: cập nhật danh sách mà không vẽ lại cả trang (giữ ô nhập) */
function setFilter(key,val){ browseFilters[key]=val; render(); setTimeout(()=>{const i=document.getElementById('searchInput'); if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}},0); }
function refreshList(){
  const f=browseFilters, q=f.q.trim().toLowerCase();
  const list = WORDS.filter(w=>{
    if(f.level && w.level!==f.level) return false;
    if(f.pos!=="all" && !w.pos.toLowerCase().split(/\s*\/\s*/).includes(f.pos)) return false;
    if(f.status==="known" && !isKnown(w.id)) return false;
    if(f.status==="unknown" && isKnown(w.id)) return false;
    if(q && !(w.word.toLowerCase().includes(q)||w.vi.toLowerCase().includes(q))) return false;
    return true;
  });
  const wl=document.getElementById("wordList"), rc=document.getElementById("resultCount");
  if(rc) rc.textContent = list.length+" từ";
  if(wl) wl.innerHTML = list.slice(0,300).map(w=>{
    const st=P(w.id).status, cls=st==="known"?"known":st==="learning"?"learning":"";
    return `<div class="word-row" onclick="startSingle(${w.id})"><span class="wr-status ${cls}"></span><div class="wr-main"><span class="wr-word">${esc(w.word)}</span><span style="color:var(--ink-soft);font-size:.8rem"> · L${w.level}</span></div><span class="wr-vi">${esc(w.vi.split('—')[0])}</span></div>`;
  }).join("") || '<div class="empty-state">Không tìm thấy từ nào 🤔</div>';
}

/* xuất / nhập / xóa tiến độ */
function exportProgress(){
  const data = { progress, streak, daily, settings, exportedAt:new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
  a.download="tien-do-tu-vung.json"; a.click(); URL.revokeObjectURL(a.href);
  toast("Đã xuất file tiến độ");
}
function importProgress(ev){
  const file = ev.target.files[0]; if(!file) return;
  const r = new FileReader();
  r.onload = () => { try{
    const d = JSON.parse(r.result);
    if(d.progress) progress = d.progress;
    if(d.streak) streak = d.streak;
    if(d.daily) daily = d.daily;
    if(d.settings) settings = Object.assign(settings, d.settings);
    setTheme(settings.theme); saveAll(); render(); toast("Đã nhập tiến độ thành công");
  }catch(e){ toast("File không hợp lệ 😕"); } };
  r.readAsText(file);
}
function resetProgress(){
  if(confirm("Đặt lại toàn bộ tiến độ học? Hành động này không thể hoàn tác.")){
    progress={}; streak={count:0,lastDate:null}; daily={date:todayStr(),count:0};
    saveAll(); render(); toast("Đã đặt lại tiến độ");
  }
}

/* =================================================================
   9) TIỆN ÍCH
   ================================================================= */
function blankWord(sentence, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return sentence.replace(new RegExp('\\b' + escaped + '\\b', 'gi'), '___');
}
function esc(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function jsEsc(s){ return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;'); }
let toastTimer;
function toast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"),1800);
}

/* =================================================================
   10) PHÍM TẮT (desktop) + VUỐT (mobile)
   ================================================================= */
document.addEventListener("keydown", e=>{
  if(view!=="study") return;
  if(e.code==="Space"){ e.preventDefault(); toggleFlip(); }
  else if(e.code==="ArrowRight"){ next(); }
  else if(e.code==="ArrowLeft"){ prev(); }
  else if(e.key==="1"){ mark('again'); }
  else if(e.key==="2"){ mark('good'); }
});
// vuốt trái/phải trên mobile
let touchX=0, touchY=0;
document.addEventListener("touchstart", e=>{ if(view!=="study")return; touchX=e.touches[0].clientX; touchY=e.touches[0].clientY; }, {passive:true});
document.addEventListener("touchend", e=>{
  if(view!=="study") return;
  const dx=e.changedTouches[0].clientX-touchX, dy=e.changedTouches[0].clientY-touchY;
  if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)){ if(dx<0) next(); else prev(); }
}, {passive:true});

/* =================================================================
   11) KHỞI ĐỘNG
   ================================================================= */
initAuth();
