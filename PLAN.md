# English Vocab App — Kế hoạch phát triển

> Cập nhật: 2026-05-31 · Review toàn diện sau 5 giai đoạn hoàn thành

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
[A] Bảo mật         ← LÀM NGAY (critical)
      ↓
[B] Quick wins      ← Nhanh, ảnh hưởng lớn (~1h tổng)
      ↓
[C] Tách data JSON  ← Foundation cho Level 2/3
      ↓
[D] Level 2/3       ← Khi có đủ data (chờ content)
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

- [ ] **A.1.1** Tạo Cloudflare account, tạo Worker project
- [x] **A.1.2** Viết Worker: nhận audio → forward Azure → trả JSON (`worker/index.js`)
- [ ] **A.1.3** Set env vars: `AZURE_KEY`, `AZURE_REGION` qua Wrangler secrets
- [x] **A.1.4** CORS: chỉ cho phép `princeht.github.io` và `localhost`
- [x] **A.1.5** Sửa `assessPronunciation()` trong app.js → gọi Worker thay vì Azure trực tiếp
- [x] **A.1.6** Xóa `AZURE_KEY` khỏi app.js, chỉ giữ `WORKER_URL` placeholder
- [ ] **A.1.7** Test: ghi âm từ GitHub Pages → Worker → Azure → nhận điểm đúng

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

- [ ] **A.2.1** Vào Firebase Console → Firestore → Rules
- [ ] **A.2.2** Xác nhận rule trên đã active (hoặc thiết lập nếu chưa có)
- [ ] **A.2.3** Test: đăng nhập user A, thử truy cập `/users/{userB_id}` → phải bị từ chối

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

### Cấu trúc file sau khi tách

```
english-app/
├── index.html
├── app.js          ← logic thuần (~25KB sau khi bỏ data)
├── style.css
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512.png
└── data/
    ├── level1.json ← 1000 từ Level 1 (~180KB)
    ├── level2.json ← (khi có data)
    └── level3.json ← (khi có data)
```

### Lazy loading strategy

```javascript
const levelCache = {};  // { 1: [...words], 2: [...], 3: [...] }

async function loadLevel(n) {
  if (levelCache[n]) return levelCache[n];
  const res = await fetch(`./data/level${n}.json`);
  const words = await res.json();
  levelCache[n] = words;
  words.forEach(w => { WORD_MAP[w.id] = w; });
  return words;
}
```

- [ ] **C.1** Trích 1000 từ từ `app.js` → xuất ra `data/level1.json`
- [ ] **C.2** Viết `loadLevel(n)` — fetch + cache trong `levelCache` object
- [ ] **C.3** Sửa `startDeck()` và `startQuiz()` → `await loadLevel(n)` trước khi dùng
- [ ] **C.4** Hiển thị loading indicator khi fetch (lần đầu tiên user chọn level)
- [ ] **C.5** Cập nhật `sw.js`: cache `data/level1.json` cùng với assets, dùng cache-first
- [ ] **C.6** Test offline: load lần đầu có mạng, tắt wifi, mở lại → data vẫn có

---

## Giai đoạn D — Level 2 và Level 3

**Chờ data | Ước tính: ~1 giờ code (sau khi có C xong)**

Phase C là prerequisite — phải xong trước.

- [ ] **D.1** Chuẩn bị `data/level2.json` (1000 từ Level 2) — same schema như level1
- [ ] **D.2** Chuẩn bị `data/level3.json` (1000 từ Level 3)
- [ ] **D.3** Thêm Level 2, Level 3 vào home screen với mini progress bar
- [ ] **D.4** Thêm Quiz Level 2, Level 3 vào section trắc nghiệm
- [ ] **D.5** Test: lazy load Level 2 lần đầu → spinner → data hiện, Level 2 quiz chạy đúng

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

- [ ] **E.1** Thêm view `"stats"` vào state machine và navigation
- [ ] **E.2** Lưu `dailyHistory` vào Firestore — ghi khi `bumpDaily()` được gọi
- [ ] **E.3** Vẽ bar chart 7 ngày gần nhất — thuần CSS (bar = `height: X%`)
- [ ] **E.4** Heatmap 30 ngày — grid 30 ô, màu theo số từ học (4 cấp độ màu)
- [ ] **E.5** Stats cards: known/total, current streak, best streak, ngày học nhiều nhất
- [ ] **E.6** Progress bar theo level (dựa vào levelCache đã load)
- [ ] **E.7** Thêm icon "📊" vào topbar để truy cập nhanh

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

- [ ] **H.1** Parse `NBest[0].Words[].Phonemes[]` từ Azure response
- [ ] **H.2** Map phoneme scores → màu (>=80: xanh, 50-79: vàng, <50: đỏ)
- [ ] **H.3** Hiển thị từ dạng syllable + màu dưới score card
- [ ] **H.4** Tooltip/label khi tap vào phoneme: hiện tên IPA

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
| A | Bảo mật | Azure key an toàn, Firestore rules đúng | ~3h | ⏳ Tiếp theo |
| B | Quick wins | Accessibility + PWA polish | ~1h | ⏳ |
| C | Tách data JSON | app.js còn 25KB, lazy load levels | ~2h | ⏳ |
| D | Level 2/3 | Mở rộng lên 3000 từ | ~1h + data | ⏸️ Chờ data |
| E | Statistics | Dashboard tiến độ học | ~4h | 🔜 |
| F | Quiz nâng cao | Timer + quiz multi-level | ~3h | 🔜 |
| G | Push notifications | Nhắc học hàng ngày | ~3h | 🔜 |
| H | Phoneme feedback | Highlight từng âm sai | ~4h | 🔜 |
| TD | Technical debt | Tests, README, refactor | ongoing | 🔜 |

**Ước tính còn lại:** ~21 giờ để hoàn thiện toàn bộ roadmap.
