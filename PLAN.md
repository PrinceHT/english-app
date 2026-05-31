# English Vocab App — Kế hoạch phát triển

> Cập nhật: 2026-05-31

## Context

- App học 1000 từ tiếng Anh (Level 1), sau này mở rộng lên 3000 từ
- Người dùng: cá nhân + 4-5 người dùng nội bộ
- Thiết bị chính: Mobile (iOS + Android)
- Yêu cầu: offline được, lưu tiến độ, auto-sync giữa thiết bị

---

## Stack đề xuất

```
GitHub Pages  →  Static hosting, miễn phí, URL cố định
Firebase Auth →  Đăng nhập Google 1 click
Firestore     →  Sync tiến độ realtime + offline mode sẵn có
PWA           →  Cài lên Home Screen mobile, chạy offline
```

**Chi phí:** Miễn phí với 5 người dùng và dữ liệu nhỏ.

---

## Giai đoạn 0 — Fix bugs (file hiện tại, không thay đổi kiến trúc)

**Ưu tiên: Làm ngay | Ước tính: ~2 giờ**

- [x] **0.1** Fix filter bug: `"adverb".includes("verb") = true` → lọc "Động từ" đang hiện cả adverb
- [x] **0.2** Thêm màn hình hoàn thành deck → học xong thẻ cuối không có feedback
- [x] **0.3** Fix logic "Ôn từ chưa thuộc" → đang show tất cả 1000 từ với người mới
- [x] **0.4** Thêm `WORD_MAP` (O(1) lookup) → `WORDS.find()` O(n) gọi nhiều lần mỗi render
- [x] **0.5** Fix `daily.count` đếm đúng unique words → hiện đếm cả lượt mark lại
- [x] **0.6** Fix mobile viewport `height: 100dvh` → bàn phím ảo iOS che layout
- [x] **0.7** Thêm `aria-label` cho icon buttons → accessibility

---

## Giai đoạn 1 — Quiz Mode

**Ưu tiên: Cao | Ước tính: ~4 giờ | Vẫn single HTML file**

Flashcard (passive) + Quiz (active recall) = tăng retention ~2-3x.

### Thiết kế quiz

```
Chế độ A: EN → VI  (thấy từ tiếng Anh, chọn nghĩa đúng)
Chế độ B: VI → EN  (thấy nghĩa tiếng Việt, chọn từ đúng)

Mỗi câu: 1 đúng + 3 sai (cùng level, cùng POS)
Kết quả: ảnh hưởng SM-2 (đúng = good, sai = again)
```

### Checklist

- [x] **1.1** Thêm `view = "quiz"` vào state machine
- [x] **1.2** Hàm `generateDistractors(word, count=3)` — chọn từ cùng level + POS
- [x] **1.3** UI quiz 4 đáp án, shuffle thứ tự mỗi lần
- [x] **1.4** Feedback đúng/sai có animation (correct=xanh, wrong=đỏ, dimmed=mờ)
- [x] **1.5** Tích hợp kết quả quiz vào `review()` (SM-2)
- [x] **1.6** Thêm section "Trắc nghiệm" vào home screen

---

## Giai đoạn 2 — PWA + Deploy GitHub Pages

**Ưu tiên: Cao | Ước tính: ~3 giờ | Cần tách file**

Sau giai đoạn này: cài được lên Home Screen mobile, hoạt động offline.

### Cấu trúc file sau split

```
english-app/
├── index.html          ← UI shell (~10KB)
├── app.js              ← JS logic (~15KB)
├── style.css           ← CSS (~8KB)
├── manifest.json       ← PWA config
├── sw.js               ← Service Worker (offline cache)
├── icon-192.png
├── icon-512.png
└── data/
    └── level1.json     ← 1000 từ (~180KB, lazy loaded)
```

### Checklist

- [x] **2.1** Tách CSS → `style.css`, JS → `app.js` (data giữ trong app.js, tách riêng sau khi có Level 2/3)
- [x] **2.2** Tạo `manifest.json` (tên app, icon, theme color)
- [x] **2.3** Viết `sw.js` — cache assets để offline
- [x] **2.4** Thêm `<link rel="manifest">` và register service worker trong `index.html`
- [x] **2.5** Tạo GitHub repo public, enable GitHub Pages → https://princeht.github.io/english-app/
- [ ] **2.6** Test: mở URL trên iOS Safari → "Add to Home Screen"
- [ ] **2.7** Test: tắt wifi → mở app → vẫn chạy được

---

## Giai đoạn 3 — Backend Firebase (Multi-user + Auto-sync)

**Ưu tiên: Trung bình | Ước tính: ~6 giờ**

Sau giai đoạn này: 4-5 người dùng, mỗi người có tiến độ riêng, tự sync giữa thiết bị.

### Firestore data schema

```
users/
  {uid}/
    profile:   { name, email, createdAt }
    settings:  { autoSpeak, theme, dailyGoal, voiceLang }
    progress/
      {wordId}: { status, reps, ease, intervalDays, due, last }
    streak:    { count, lastDate }
    daily:     { date, count }
```

### Offline strategy

Firestore SDK có offline persistence sẵn — khi mất mạng vẫn đọc/ghi được (cache local). Khi có mạng trở lại, tự sync. `localStorage` giữ làm fallback nếu chưa đăng nhập.

### Checklist

- [x] **3.1** Tạo Firebase project, enable Auth + Firestore
- [x] **3.2** Thêm Firebase SDK vào `index.html`
- [x] **3.3** Màn hình đăng nhập — Google Sign-In (1 click)
- [x] **3.4** Thay `Store` layer bằng Firestore (giữ localStorage làm fallback offline/guest)
- [x] **3.5** Sync 2 chiều: load từ Firestore khi mở app, write ngay khi mark từ
- [x] **3.6** Test: học trên điện thoại → mở trên máy tính → tiến độ đồng bộ
- [x] **3.7** Test: tắt wifi → học → bật lại → data sync đúng

---

## Giai đoạn 4 — Level 2 và Level 3

**Làm sau khi có đủ data | Ước tính: ~2 giờ**

- [ ] **4.1** Thêm `data/level2.json`, `data/level3.json`
- [ ] **4.2** Lazy load: chỉ fetch level khi user chọn lần đầu
- [ ] **4.3** Merge vào `WORD_MAP` khi load xong
- [ ] **4.4** Không cần sửa logic khác — data schema đã tương thích

---

## Giai đoạn 5 — Chấm điểm phát âm (Azure Pronunciation Assessment)

**Ưu tiên: Cao | Ước tính: ~5 giờ**

Sau giai đoạn này: Người dùng có thể ghi âm giọng đọc và nhận điểm phát âm % theo chuẩn người bản xứ, cả trong màn học lẫn quiz.

### Thiết kế tính năng

```
Màn học (mặt sau thẻ):
  → Nút 🎙️ "Ghi âm phát âm"
  → Bấm 1 lần: bắt đầu ghi (có chỉ báo đang ghi)
  → Bấm lần 2 (hoặc tự dừng sau 5s): gửi lên Azure
  → Hiện kết quả: Phát âm 87% · Chính xác 90% · Lưu loát 85%

Màn quiz (sau khi chọn đáp án):
  → Tương tự — ghi âm từ vừa học
  → Không ảnh hưởng đến điểm quiz, chỉ cho phản hồi phát âm
```

### Kỹ thuật

- **Ghi âm**: `MediaRecorder` API (có sẵn trong trình duyệt, không cần thư viện)
- **API**: Azure Cognitive Services Speech — Pronunciation Assessment REST API
- **Định dạng audio**: `audio/webm` (Chrome/Android), `audio/mp4` (iOS Safari)
- **Không cần SDK**: Gọi trực tiếp qua `fetch()` — nhẹ, không tải thêm file

### Điểm trả về từ Azure

| Điểm | Ý nghĩa |
|---|---|
| `PronScore` | Tổng điểm phát âm (cái hiển thị chính) |
| `AccuracyScore` | Từng âm tiết có đúng không |
| `FluencyScore` | Nói có tự nhiên, đúng tốc độ không |
| `CompletenessScore` | Có đọc đủ tất cả các âm không |

### Lưu ý bảo mật

Azure Speech Key sẽ nằm trong `app.js` (public repo). Rủi ro thấp vì:
- Free tier giới hạn 5 giờ/tháng — nếu ai dùng hết, chỉ cần đổi key
- Có thể restrict key chỉ cho phép từ `princeht.github.io` bằng Azure Policy

### Checklist

- [ ] **5.1** Tạo Azure Speech resource (free tier F0)
- [ ] **5.2** Thêm Azure config vào `app.js` (key + region)
- [ ] **5.3** Hàm `startRecording()` / `stopRecording()` — `MediaRecorder` API
- [ ] **5.4** Hàm `assessPronunciation(word, audioBlob)` — gọi Azure REST API
- [ ] **5.5** UI nút ghi âm trong màn học (mặt sau thẻ) + chỉ báo đang ghi
- [ ] **5.6** UI nút ghi âm trong quiz (sau khi trả lời)
- [ ] **5.7** UI hiển thị kết quả — score card với breakdown 4 chỉ số
- [ ] **5.8** CSS cho recording state, score card

---

## Thứ tự thực hiện

```
[0] Fix bugs       ✅ Xong
      ↓
[1] Quiz mode      ✅ Xong
      ↓
[2] PWA + GitHub   ✅ Xong
      ↓
[3] Firebase       ✅ Xong
      ↓
[5] Phát âm        ←  Đang làm
      ↓
[4] Level 2/3      ←  Khi có đủ data
```

---

## Tóm tắt

| Giai đoạn | Kết quả đạt được | Ước tính | Trạng thái |
|---|---|---|---|
| 0 — Fix bugs | Không còn bug, UX đúng | ~2h | ✅ |
| 1 — Quiz mode | Học hiệu quả hơn rõ rệt | ~4h | ✅ |
| 2 — PWA + GitHub | Cài mobile, share URL | ~3h | ✅ |
| 3 — Firebase | Multi-user, auto-sync | ~6h | ✅ |
| 5 — Phát âm | Chấm điểm phát âm realtime | ~5h | 🔄 |
| 4 — Level 2/3 | Mở rộng lên 3000 từ | ~2h | ⏸️ |

**Tổng:** ~22 giờ từ fix bugs đến full pronunciation scoring.

---

## Ghi chú

- Audio (Web Speech API vs pre-recorded): để lại sau, đánh giá sau Giai đoạn 2
- Timer cho quiz: nice-to-have, thêm sau Giai đoạn 1
- Statistics dashboard (đồ thị tiến độ): nice-to-have, thêm sau Giai đoạn 3
