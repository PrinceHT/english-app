# English Vocab App — Kế hoạch phát triển

> Cập nhật: 2026-05-31 · A, B, C, C+, C++, C+++, E, H hoàn thành — tiếp theo: D (chờ data) hoặc F (Quiz nâng cao)

## Context

- App học từ vựng tiếng Anh, mục tiêu 3000 từ (hiện có 1000 từ Level 1)
- Người dùng: cá nhân + 4-5 người dùng nội bộ
- Thiết bị chính: Mobile (iOS + Android), có dùng máy tính
- Yêu cầu cốt lõi: offline được, lưu tiến độ, auto-sync giữa thiết bị

---

## Stack hiện tại

```
GitHub Pages    →  Static hosting, miễn phí
Firebase Auth   →  Đăng nhập Google 1 click
Firestore       →  Sync tiến độ realtime + offline persistence
PWA             →  Cài Home Screen, chạy offline
Azure Speech    →  Chấm điểm phát âm (Pronunciation Assessment)
Vanilla JS/CSS  →  Không framework, không bundler
```

**Chi phí:** Miễn phí với 5 người dùng, dữ liệu nhỏ, Azure F0 tier.

---

## Đã hoàn thành

| Giai đoạn | Kết quả | Trạng thái |
|---|---|---|
| 0 — Fix bugs | UX đúng, không còn lỗi filter/viewport/daily count | ✅ |
| 1 — Quiz mode | Flashcard + trắc nghiệm EN↔VI, SM-2 tích hợp | ✅ |
| 2 — PWA + GitHub Pages | Cài mobile, offline, URL cố định | ✅ |
| 3 — Firebase | Multi-user, Google Sign-In, auto-sync Firestore | ✅ |
| 5 — Phát âm | Azure Pronunciation Assessment, score card 4 chỉ số | ✅ |

---

## Điểm số hiện tại (review 2026-05-31)

| Tiêu chí | Điểm |
|---|---|
| Bảo mật | 3/10 |
| Code Quality | 6/10 |
| Kiến trúc | 5/10 |
| Hiệu năng | 6/10 |
| Accessibility | 7/10 |
| Testing | 1/10 |
| Documentation | 7/10 |
| Maintainability | 5/10 |
| PWA Quality | 8/10 |
| UX/Design | 8/10 |
| **Tổng** | **5.6/10** |

---

## Thứ tự ưu tiên tiếp theo

```
[A] Bảo mật         ✅ Xong
      ↓
[B] Quick wins      ✅ Xong
      ↓
[C] Tách data JSON  ✅ Xong (47KB, 20 JSON parts)
      ↓
[C+] UI 20 phần     ✅ Xong
      ↓
[C++] Listening     ✅ Xong
      ↓
[C+++] Lưu vị trí   ✅ Xong
      ↓
[E] Statistics      ✅ Xong
      ↓
[D] Level 2/3       ← Khi có đủ data (chờ content)
[E] Statistics      ← Làm được ngay (data đã có)
      ↓
[E] Statistics      ← Feature người dùng muốn nhất
      ↓
[F] Quiz nâng cao   ← Tăng engagement
      ↓
[G] Push notifications ← Retention
      ↓
[H] Phoneme feedback   ← Deep pronunciation
```

---

## Giai đoạn A — Bảo mật (CRITICAL)

**Ưu tiên: Làm ngay | Ước tính: ~3 giờ**

Azure Speech Key đang lộ công khai trong repo. Bất kỳ ai cũng có thể trích key từ DevTools và dùng hết quota.

### A.1 — Cloudflare Worker proxy cho Azure (~2h)

Thay vì gọi Azure trực tiếp từ browser, dùng Cloudflare Worker làm middleman. Key nằm ở server-side (environment variable), không bao giờ xuất hiện ở client.

```
Browser  →  POST /assess  →  Cloudflare Worker  →  Azure Speech API
                              (có AZURE_KEY trong env)
```

**Luồng triển khai:**

```
1. Tạo Cloudflare Worker (free, 100k req/ngày)
2. Set AZURE_KEY + AZURE_REGION trong Worker env vars (không hardcode)
3. Worker nhận { word, audioBase64 } → forward lên Azure → trả kết quả
4. Giới hạn: chỉ cho phép request từ princeht.github.io (CORS)
5. Trong app.js: xóa AZURE_KEY, đổi endpoint sang Worker URL
```

**Worker code (skeleton):**

```javascript
// wrangler.toml: AZURE_KEY = secret
export default {
  async fetch(req, env) {
    if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
    const origin = req.headers.get('Origin') || '';
    if (!origin.includes('princeht.github.io') && !origin.includes('localhost'))
      return new Response('Forbidden', { status: 403 });
    const { word, audioBase64 } = await req.json();
    const wavBytes = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));
    // forward lên Azure...
    const azRes = await fetch(`https://${env.AZURE_REGION}.stt.speech.microsoft.com/...`, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': env.AZURE_KEY, ... },
      body: wavBytes
    });
    const data = await azRes.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Access-Control-Allow-Origin': origin, 'Content-Type': 'application/json' }
    });
  }
};
```

- [x] **A.1.1** Tạo Cloudflare account, tạo Worker project (đã làm qua web UI)
- [x] **A.1.2** Viết Worker: nhận audio → forward Azure → trả JSON (`worker/index.js`)
- [x] **A.1.3** Set env vars: `AZURE_KEY`, `AZURE_REGION` qua Cloudflare Dashboard → Settings → Variables and Secrets
- [x] **A.1.4** CORS: chỉ cho phép `princeht.github.io` và `localhost`
- [x] **A.1.5** Sửa `assessPronunciation()` trong app.js → gọi Worker thay vì Azure trực tiếp
- [x] **A.1.6** Xóa `AZURE_KEY` khỏi app.js, chỉ giữ `WORKER_URL` placeholder
- [x] **A.1.7** Test end-to-end: ghi âm từ GitHub Pages → Worker → Azure → nhận điểm đúng

### A.2 — Kiểm tra Firestore Security Rules (~1h)

Firebase config (apiKey, projectId) trong app.js là bình thường với web app, nhưng nếu Firestore rules không đúng thì bất kỳ user nào cũng đọc/ghi được data của người khác.

**Rules đúng cần đảm bảo:**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

- [x] **A.2.1** Vào Firebase Console → Firestore → Rules
- [x] **A.2.2** Xác nhận rule trên đã active (rules đúng, đã publish)
- [x] **A.2.3** Test qua Rules Playground: user lạ → Denied, đúng user → Allowed

---

## Giai đoạn B — Quick Wins (Accessibility + PWA Polish)

**Ưu tiên: Cao | Ước tính: ~1 giờ tổng**

Các fix nhỏ, impact lớn, không cần thay đổi kiến trúc.

- [x] **B.1** Xóa `user-scalable=no` trong `index.html` viewport meta — chặn pinch-to-zoom, vi phạm WCAG 1.4.4. Thay bằng `width=device-width, initial-scale=1.0`.
- [x] **B.2** Fix `manifest.json` — tách `"purpose": "any maskable"` thành 2 icon entries riêng (browsers hiện đại xử lý khác nhau).
- [x] **B.3** Thêm `STATUS = { NEW, LEARNING, KNOWN }` constants sau WORD_MAP trong app.js.
- [x] **B.4** Service Worker cache name đổi thành `vocab-20260531` — cần cập nhật thủ công khi deploy lớn.
- [x] **B.5** Thêm `aria-live="polite" aria-atomic="true"` cho toast container trong index.html.

---

## Giai đoạn C — Tách dữ liệu ra file JSON

**Ưu tiên: Cao | Ước tính: ~2 giờ**

`app.js` hiện nặng 290KB vì 1000 từ nhúng thẳng vào. Tách ra JSON giúp:
- App logic còn ~25KB → load nhanh hơn nhiều
- Service Worker cache riêng data và code → chỉ revalidate khi đúng phần thay đổi
- Mở đường cho Level 2/3 lazy load

### Cấu trúc file (đã hoàn thành)

```
english-app/
├── index.html
├── app.js          ← logic thuần (47KB, đã tách data)
├── style.css
├── manifest.json
├── sw.js
├── scripts/
│   ├── extract-words.mjs   ← tái dùng cho Level 2/3
│   └── refactor-data.mjs
└── data/
    └── level1/
        ├── manifest.json   ← { parts: 20, totalWords: 1000 }
        ├── part01.json     ← từ id 1–50
        ├── part02.json     ← từ id 51–100
        └── ... part20.json ← từ id 951–1000
```

- [x] **C.1** Trích 1000 từ từ `app.js` → 20 file `data/level1/part01-20.json` (50 từ/file)
- [x] **C.2** Viết `loadLevel1()` — fetch 20 parts song song, cache trong `levelCache`, populate `WORD_MAP`
- [x] **C.3** `startDeck()` và `startQuiz()` đổi thành async, `await loadLevel1()` trước khi dùng WORDS
- [x] **C.4** Hiển thị loading indicator khi fetch — giải quyết trong C+.6 (spinner trong viewLevel1)
- [x] **C.5** Cập nhật `sw.js`: cache toàn bộ 20 file JSON cùng với assets
- [ ] **C.6** Test offline: load lần đầu có mạng, tắt wifi, mở lại → data vẫn có

---

## Giai đoạn C+ — UI Phần trong Level 1

**Ưu tiên: Cao (làm ngay sau C) | Ước tính: ~3 giờ**

Hiện tại app có nút "Học Level 1" → load hết 1000 từ — user không biết mình đang ở đâu, dễ bị overwhelmed. Phase này chia Level 1 thành 20 phần học rõ ràng với progress từng phần.

### Luồng UI sau thay đổi

```
Home screen
└── [Level 1 →]  250/1000 đã thuộc
        ↓
    viewLevel1 (màn hình mới)
    ├── Progress bar tổng: ████░░  250/1000
    │
    ├── Phần 1  (1–50)    ████████░░  45/50  [Học] [Quiz]
    ├── Phần 2  (51–100)  ████░░░░░░  20/50  [Học] [Quiz]
    ├── Phần 3  (101–150) ░░░░░░░░░░   0/50  [Học] [Quiz]  ← tự động gợi ý học tiếp
    │   ...
    └── Phần 20 (951–1000) ░░░░░░░░░░  0/50  [Học] [Quiz]
        + [Học tất cả Level 1]  [Quiz tất cả Level 1]
```

### Logic tính progress từng phần

```javascript
// Part i (0-indexed) chứa WORDS[i*50 .. (i+1)*50 - 1]
function partStats(partIndex) {
  const words = levelCache[1].slice(partIndex * 50, (partIndex + 1) * 50);
  const known = words.filter(w => isKnown(w.id)).length;
  return { total: words.length, known };
}
```

### Giao diện phần học (part card)

- **Màu card:** xanh lá nếu ≥80% thuộc, vàng nếu đang học (có từ learning), xám nếu chưa bắt đầu
- **Badge "Học tiếp":** đánh dấu phần đầu tiên chưa hoàn thành (dưới 80%)
- **Loading state:** spinner khi `level1Ready === false` (giải quyết C.4 luôn)

### Tasks

- [x] **C+.1** Thêm `"level1"` vào state machine và `render()`
- [x] **C+.2** Viết `viewLevel1()` — hiển thị 20 part cards với progress bar + nút Học/Quiz
- [x] **C+.3** Sửa `startDeck()` hỗ trợ `kind = "level1_part_N"` (N = 0–19)
- [x] **C+.4** Sửa `startQuiz()` hỗ trợ `kind = "level1_part_N"`
- [x] **C+.5** Sửa Home screen: nút "Học Level 1" → nút điều hướng đến `view = "level1"`
- [x] **C+.6** Loading indicator khi `level1Ready === false` (spinner thay vì blank screen)
- [x] **C+.7** Highlight part gợi ý học tiếp (phần đầu tiên chưa đạt 80%)
- [x] **C+.8** Nút back từ `viewLevel1` về Home

---

## Giai đoạn C++ — Home Cleanup + Listening Mode

**Ưu tiên: Cao (làm ngay sau C+) | Ước tính: ~2 giờ**

### Mục tiêu
1. Dọn Home screen: bỏ 2 quiz button thừa (Quiz đang học, Quiz Level 1) — quiz đã có trong từng phần Level 1.
2. Thêm chế độ **Listening** vào mỗi phần trong Level 1: nghe từ → chọn câu ví dụ đúng.

### Format Listening

```
Nghe từ: "abandon" 🔊

Câu nào dùng từ vừa nghe?
┌─────────────────────────────────────────┐
│ She had to ___ her car in the snowstorm.│  ← đúng (abandon's example)
│ The doctor asked him to ___ smoking.    │  ← sai (quit's example)
│ She tried to ___ a new skill each month.│  ← sai (acquire's example)
│ He wanted to ___ the world record.      │  ← sai (break's example)
└─────────────────────────────────────────┘
```

**Dữ liệu:** Dùng `examples[0].en` của từng từ, thay từ bằng `___` — không cần thêm field mới vào JSON.

### Layout nút trong part card (Option B — 2 hàng)

```
[📖 Học]           [🧠 Quiz]
[👂 Nghe — Listening          ]   ← full width
```

### Tasks

- [x] **C++.1** Xóa section "Trắc nghiệm" (label + 2 nút) khỏi `viewHome()`
- [x] **C++.2** Thêm state variables cho Listening vào section 3
- [x] **C++.3** Viết helper `blankWord(sentence, word)` — thay từ bằng `___`
- [x] **C++.4** Viết `startListening(kind)` — build deck từ `level1_part_N`, shuffle, cap 20
- [x] **C++.5** Viết `prepareListeningQuestion()` — chọn từ + 3 distractors cùng phần, tạo 4 options
- [x] **C++.6** Viết `listeningAnswer(id)` + `listeningNext()` — xử lý câu trả lời + SM-2 review
- [x] **C++.7** Viết `viewListening()` — UI với nút 🔊 Nghe lại, 4 option buttons, score bar
- [x] **C++.8** Cập nhật `render()` thêm `view==="listening"`
- [x] **C++.9** Cập nhật `viewLevel1()`: thêm nút [👂 Nghe] full-width vào part cards (Option B layout)
- [x] **C++.10** Thêm CSS cho listening view

---

## Giai đoạn C+++ — Lưu vị trí học + Auto-mark

**Ưu tiên: Cao (UX thiết yếu) | Ước tính: ~1 giờ**

### Mục tiêu
1. Khi người dùng thoát ra và quay lại một phần (Phần 1 Level 1...), app mở đúng thẻ từ lần trước — không bắt đầu lại từ đầu.
2. Bỏ nút "Đã thuộc" và "Học lại" — xem thẻ nào = tự động đánh dấu đã học thẻ đó.

### Logic lưu vị trí

```javascript
// localStorage key: vocab_part_pos
// Shape: { "level1_part_0": 5, "level1_part_3": 12, ... }
```

- Vị trí được lưu mỗi khi chuyển thẻ (next/prev)
- Khi vào lại phần đó: `pos = partPositions[kind] ?? 0`
- Khi hoàn thành bộ thẻ: reset về 0 (bắt đầu lại từ đầu lần sau)

### Logic auto-mark

Mỗi thẻ được xem → gọi `review(id, 'good')` một lần (tracking bằng `dailyMarked`):
- Từ "new" → "learning" (reps=1, interval=1 ngày)
- Từ "learning" → "known" (reps=2, interval=3 ngày)
- Từ "known" → không thay đổi

### Tasks

- [x] **C+++.1** Thêm `partPositions` vào localStorage store + `saveAll()`
- [x] **C+++.2** Sửa `startDeck()`: khôi phục pos từ `partPositions` khi vào phần, gọi `autoMarkWord()`
- [x] **C+++.3** Thêm `savePartPos()` helper — lưu pos vào localStorage mỗi khi chuyển thẻ
- [x] **C+++.4** Thêm `autoMarkWord()` helper — gọi `review(id, 'good')` một lần mỗi từ mỗi phiên
- [x] **C+++.5** Sửa `next()` và `prev()` để gọi `savePartPos()` + `autoMarkWord()`
- [x] **C+++.6** Xóa nút "Đã thuộc" và "Học lại" khỏi `viewStudy()`
- [x] **C+++.7** Thêm nút "✓ Xong" khi ở thẻ cuối cùng thay cho nút "Sau ›" bị disabled
- [x] **C+++.8** Xóa keyboard shortcut `1` và `2` (mark again/good)
- [x] **C+++.9** Gọi `finishDeck()` khi xong: reset partPositions về 0

---

## Giai đoạn D — Level 2 và Level 3

**Chờ data | Ước tính: ~1 giờ code (sau khi có C+ xong)**

Phase C+ là prerequisite — structure phần đã có, chỉ thêm level mới.

- [ ] **D.1** Chuẩn bị `data/level2/` (1000 từ Level 2, 20 parts) — chạy `scripts/extract-words.mjs` với data mới
- [ ] **D.2** Chuẩn bị `data/level3/` (1000 từ Level 3)
- [ ] **D.3** Thêm Level 2, Level 3 vào home screen với progress tổng
- [ ] **D.4** `viewLevel2()`, `viewLevel3()` — tương tự `viewLevel1()` (refactor thành `viewLevel(n)`)
- [ ] **D.5** `loadLevel2()`, `loadLevel3()` — tương tự `loadLevel1()`
- [ ] **D.6** SW cache thêm data/level2/ và data/level3/

**Schema từ (giữ nguyên, tương thích):**
```json
{ "id": 1001, "word": "...", "ipa": "/.../", "pos": "noun", "level": 2, "vi": "...",
  "examples": [{ "en": "...", "vi": "..." }] }
```

---

## Giai đoạn E — Statistics Dashboard

**Ưu tiên: Cao (feature được yêu cầu) | Ước tính: ~4 giờ**

Người dùng muốn thấy mình học tốt đến đâu. Data đã có sẵn trong Firestore/localStorage.

### Thiết kế màn hình thống kê

```
[Biểu đồ cột] — Số từ học mỗi ngày (7 ngày gần nhất)
[Heatmap]     — Calendar 30 ngày (ô đậm = học nhiều)
[Stats cards]
  - Tổng từ đã thuộc     / Tổng từ trong app
  - Chuỗi ngày liên tục  / Best streak
  - Ngày học nhiều nhất
  - Phân bố theo POS (noun/verb/adj/adv)
[Progress by level]
  - Level 1: ██████░░░░ 620/1000
  - Level 2: ░░░░░░░░░░ 0/1000 (chưa có data)
```

### Lưu trữ history

Firestore schema mở rộng:

```
users/{uid}/
  dailyHistory/
    {date}:  { count, knownAt }   ← thêm mỗi ngày
```

- [x] **E.1** Thêm view `"stats"` vào state machine và navigation
- [x] **E.2** Lưu `dailyHistory` + `bestStreak` vào localStorage + Firestore — ghi khi `bumpDaily()` được gọi
- [x] **E.3** Vẽ bar chart 7 ngày gần nhất — thuần CSS (bar = `height: X%`)
- [x] **E.4** Heatmap 30 ngày — grid 30 ô, màu theo số từ học (4 cấp độ màu)
- [x] **E.5** Stats cards: known/total, current streak, best streak
- [x] **E.6** Progress bar theo level + phân bố từ loại (noun/verb/adj/adv)
- [x] **E.7** Thêm icon "📊" vào topbar để truy cập nhanh

---

## Giai đoạn F — Quiz Nâng cao

**Ưu tiên: Trung bình | Ước tính: ~3 giờ**

### F.1 — Quiz cho tất cả các Level (~1h)

Hiện chỉ có Quiz Level 1 và Quiz Review. Sau khi có Phase D:

- [ ] **F.1.1** Thêm Quiz Level 2, Quiz Level 3 vào home screen
- [ ] **F.1.2** Thêm Quiz "Tất cả" — lấy mẫu từ tất cả level đã load

### F.2 — Quiz Timer (~2h)

Tăng độ thử thách, tạo cảm giác urgency.

```
Mỗi câu có 10 giây → thanh đếm ngược hiển thị bên trên
Hết giờ = tự động chọn sai
Timer reset khi chuyển câu
Có thể bật/tắt trong Settings
```

- [ ] **F.2.1** Thêm toggle "Bật timer" trong Settings
- [ ] **F.2.2** Thanh countdown CSS animation — `width: 100% → 0%` trong `N` giây
- [ ] **F.2.3** Khi hết giờ: `quizAnswer(null)` — tính là sai, highlight đáp án đúng
- [ ] **F.2.4** Timer dừng khi đã chọn đáp án

---

## Giai đoạn G — Push Notifications (Nhắc học hàng ngày)

**Ưu tiên: Trung bình | Ước tính: ~3 giờ**

Service Worker đã có sẵn — hỗ trợ push notifications mà không cần server riêng (dùng Firebase Cloud Messaging).

```
Mỗi ngày lúc 20:00 → "Hôm nay bạn chưa học từ mới. Học 5 phút thôi nhé! 📚"
Chỉ gửi nếu user chưa học trong ngày
User có thể tắt trong Settings
```

- [ ] **G.1** Enable Firebase Cloud Messaging trong Firebase project
- [ ] **G.2** Request notification permission khi user lần đầu đăng nhập
- [ ] **G.3** Lưu FCM token vào Firestore: `users/{uid}/fcmToken`
- [ ] **G.4** Firebase Cloud Function (scheduled): mỗi ngày 20:00 → query user chưa học → gửi notification
- [ ] **G.5** Service Worker `push` event handler: hiển thị notification
- [ ] **G.6** Thêm toggle "Thông báo nhắc học" trong Settings

---

## Giai đoạn H — Phoneme-Level Feedback

**Ưu tiên: Thấp | Ước tính: ~4 giờ**

Azure đã trả về data phoneme-level trong response (khi dùng `Granularity: "Phoneme"`). Hiện tại chỉ hiển thị tổng điểm — có thể highlight từng âm tiết sai.

```
Từ: "beautiful"  →  beau·ti·ful
                      ✅   ⚠️   ✅
Màu xanh = đúng, màu đỏ = sai/yếu
```

- [x] **H.1** Parse `NBest[0].Words[0].Phonemes[]` từ Azure response — trả về `[{phoneme, score}]`
- [x] **H.2** Map phoneme scores → màu (>=80: xanh, 50-79: vàng, <50: đỏ)
- [x] **H.3** Hiển thị từng phoneme dưới dạng chip (IPA + score + màu)
- [x] **H.4** Bỏ rows "Lưu loát" và "Đầy đủ" — chỉ giữ điểm tổng + phoneme chips
- [x] **H.5** (thêm mới) Bỏ cả row "Chính xác" — phoneme chips đã đủ chi tiết

---

## Việc kỹ thuật còn nợ (Technical Debt)

**Không phải feature mới, nhưng cải thiện chất lượng lâu dài:**

- [ ] **TD.1** Viết unit tests cho các hàm thuần túy — `review()` (SM-2), `generateDistractors()`, `esc()`, `shuffle()`. Không cần framework — plain `<script type="module">` + `console.assert`.
- [ ] **TD.2** Viết `README.md` — hướng dẫn deploy, cấu trúc file, cách thêm từ mới.
- [ ] **TD.3** Refactor `render()` functions lớn — `viewStudy()` và `viewHome()` mỗi hàm >70 dòng, tách thành sub-functions.
- [ ] **TD.4** Thêm `aria-live="polite"` cho vùng nội dung quiz/study — screen reader theo dõi được thay đổi.

---

## Tóm tắt theo thứ tự ưu tiên

| # | Giai đoạn | Kết quả đạt được | Ước tính | Trạng thái |
|---|---|---|---|---|
| A | Bảo mật | Azure key an toàn, Firestore rules đúng | ~3h | ✅ |
| B | Quick wins | Accessibility + PWA polish | ~1h | ✅ |
| C | Tách data JSON | app.js còn 47KB, 20 file JSON | ~2h | ✅ |
| C+ | UI 20 phần Level 1 | Màn hình phần học, progress từng phần | ~3h | ✅ |
| C++ | Home cleanup + Listening | Bỏ quiz thừa, thêm chế độ nghe từ | ~2h | ✅ |
| C+++ | Lưu vị trí + Auto-mark | Tiếp tục đúng chỗ, xem = đã học | ~1h | ✅ |
| D | Level 2/3 | Mở rộng lên 3000 từ | ~1h + data | ⏸️ Chờ data |
| E | Statistics | Dashboard tiến độ học | ~4h | ✅ |
| F | Quiz nâng cao | Timer + quiz multi-level | ~3h | 🔜 |
| G | Push notifications | Nhắc học hàng ngày | ~3h | 🔜 |
| H | Phoneme feedback | Highlight từng âm sai | ~4h | ✅ |
| TD | Technical debt | Tests, README, refactor | ongoing | 🔜 |

**Ước tính còn lại:** ~23 giờ để hoàn thiện toàn bộ roadmap.
