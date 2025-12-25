# 用 AI 打造智慧時鐘儀表板：從零到部署的完整教學

**作者**: bangdoll  
**發布日期**: 2025-12-25  
**Demo**: [ai-smart-clock.vercel.app](https://ai-smart-clock.vercel.app)  
**原始碼**: [GitHub - bangdoll/SmartClock](https://github.com/bangdoll/SmartClock)

---

## 前言

這篇文章記錄了我如何使用 AI 輔助開發工具，在短短幾小時內打造一個功能完整的智慧時鐘儀表板。專案整合了即時新聞、天氣預報、地震資訊和 Google 日曆，並支援響應式設計，可在手機、平板和桌面上完美顯示。

---

## 專案特色

| 功能 | 說明 |
|------|------|
| 🕐 翻頁時鐘 | 精美的數字翻頁動畫效果 |
| 📰 新聞輪播 | 自動抓取智流 AI 科技新聞 |
| 🌤️ 即時天氣 | Open-Meteo 免費 API（不需 Key）|
| 🌋 地震快報 | USGS 公開 API + 中文翻譯 |
| 📅 Google 日曆 | OAuth 2.0 登入 + 今日行程 |
| 📱 響應式設計 | 支援手機/平板/桌面 |
| 🌙 深淺主題 | 一鍵切換深色/淺色模式 |

---

## 開發過程

### Phase 1：基礎架構（v1.0.0）

首先建立專案的核心功能：

```
Smart-Clock/
├── index.html    # 單一檔案包含所有 HTML/CSS/JS
├── README.md
└── CHANGELOG.md
```

**核心元件：**

1. **翻頁時鐘** - 使用 CSS 3D transform 實現翻頁動畫
2. **新聞輪播** - 解析 RSS Feed 顯示最新 5 則新聞
3. **天氣卡片** - 整合 OpenWeatherMap API
4. **地震卡片** - 整合中央氣象署 API
5. **主題切換** - CSS 變數 + localStorage 持久化

**關鍵程式碼 - 翻頁時鐘：**

```javascript
function updateClock() {
    const now = new Date();
    updateDigit('hour1', Math.floor(now.getHours() / 10));
    updateDigit('hour2', now.getHours() % 10);
    updateDigit('min1', Math.floor(now.getMinutes() / 10));
    updateDigit('min2', now.getMinutes() % 10);
    updateDigit('sec1', Math.floor(now.getSeconds() / 10));
    updateDigit('sec2', now.getSeconds() % 10);
}
setInterval(updateClock, 1000);
```

---

### Phase 2：Google Calendar 整合（v1.1.0）

整合 Google Calendar API 是這個專案最有挑戰性的部分。

**步驟：**

1. 在 Google Cloud Console 建立 OAuth 2.0 憑證
2. 設定 JavaScript 來源和重新導向 URI
3. 使用 Google Identity Services 實作登入流程

```javascript
googleTokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CONFIG.GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
    callback: (response) => {
        if (response.access_token) {
            fetchCalendarEvents(response.access_token);
        }
    },
});
```

**遇到的問題與解決：**

- **Token 過期**：實作靜默刷新機制
- **閃爍問題**：加入樂觀 UI，先顯示快取資料
- **API 錯誤**：完整的錯誤處理和顯示

---

### Phase 3：Token 持久化（v1.2.0）

讓使用者不需要每次重新整理都重新登入：

```javascript
// 儲存 token
localStorage.setItem('google_access_token', token);
localStorage.setItem('google_token_expires_at', expiresAt);

// 載入時檢查
const savedToken = localStorage.getItem('google_access_token');
if (savedToken && Date.now() < expiresAt) {
    validateAndFetchEvents(savedToken);
}
```

---

### Phase 4：移除 API Key 依賴（v1.2.1）

原本需要申請多個 API Key 才能使用，這對想 fork 專案的人來說是個門檻。

**解決方案 - 改用免費公開 API：**

| 原本 | 改用 | 優點 |
|------|------|------|
| OpenWeatherMap（需 Key）| Open-Meteo | 完全免費，無需註冊 |
| 中央氣象署（需 Key）| USGS | 公開 API，全球地震資料 |

**天氣 API 範例：**

```javascript
const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code`;
const data = await fetch(url).then(r => r.json());
```

**地震位置翻譯：**

USGS 回傳英文地名如 `81 km ESE of Yujing, Taiwan`，需要翻譯成中文：

```javascript
function translateUSGSLocation(place) {
    const directions = {
        'N': '北', 'S': '南', 'E': '東', 'W': '西',
        'ESE': '東南東', 'WSW': '西南西', // ...
    };
    const cities = {
        'Taipei': '台北', 'Hualien': '花蓮', 'Yujing': '玉井', // ...
    };
    // 解析並翻譯
    return `${城市}${方向}方 ${距離} 公里`;
}
```

---

### Phase 5：響應式設計

使用 CSS Media Queries 支援各種螢幕尺寸：

```css
/* 平板 */
@media (max-width: 768px) {
    body {
        grid-template-columns: 1fr;  /* 改為單欄 */
    }
}

/* 手機 */
@media (max-width: 480px) {
    .digit-card {
        width: 42px;
        height: 65px;
        font-size: 2.5rem;
    }
}

/* 橫向手機 */
@media (max-height: 500px) and (orientation: landscape) {
    body {
        grid-template-columns: 1fr 1fr;  /* 保持左右佈局 */
    }
}
```

---

## 部署到 Vercel

專案使用 Vercel 進行部署，只需幾個步驟：

1. 推送到 GitHub
2. 在 Vercel 連結 Repository
3. 自動部署完成！

每次 `git push` 都會自動觸發新的部署。

---

## 技術總結

| 類別 | 使用技術 |
|------|----------|
| 前端 | HTML5 + CSS3 + Vanilla JS |
| API | Open-Meteo、USGS、Google Calendar |
| 動畫 | CSS 3D Transform、Keyframes |
| 部署 | Vercel（自動 CI/CD）|

**程式碼行數：** 約 1800 行（單一 index.html）

---

## 心得

這個專案展示了如何用 AI 輔助快速開發一個功能完整的 Web 應用。從最初的概念到上線部署，整個過程不到一天，而且完全不需要任何付費 API。

如果你想打造自己的智慧儀表板，歡迎 fork 這個專案並客製化！

---

## 相關連結

- **Demo**: https://ai-smart-clock.vercel.app
- **GitHub**: https://github.com/bangdoll/SmartClock
- **智流 Smart Flow**: https://smart-flow.rd.coach

---

*本文由 AI 輔助撰寫，使用 Antigravity 開發工具。*
