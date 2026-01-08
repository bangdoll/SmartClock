# 🕐 Smart Clock Dashboard

一個現代化、美觀的智慧時鐘儀表板，整合即時新聞、天氣與地震資訊。

**Demo**: https://ai-smart-clock.vercel.app

![Smart Clock Dashboard](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-blue)

## ✨ 功能特色

### 🕐 翻頁時鐘
- 精美的翻頁式數字時鐘動畫
- 即時顯示時、分、秒
- 當數字變換時有流暢的翻轉效果

### 📰 智流新聞輪播
- 自動抓取 [智流 Smart Flow](https://smart-flow.rd.coach) 最新 5 則 AI 科技新聞
- 新聞標題、摘要、發布時間完整呈現
- 每 10 秒自動切換下一則

### 🌤️ 即時天氣
- 顯示當前溫度與天氣狀況
- 使用 Open-Meteo 免費 API（不需 API Key）
- 預設顯示台北天氣

### 🌋 地震資訊
- 使用台灣中央氣象署 (CWA) 開放資料 API
- 同時監控大區域與小區域地震報告，顯示最新資訊
- 顯示震度、位置、規模、深度
- 視覺化震度指示器

### 📅 Google Calendar 整合
- OAuth 2.0 安全登入
- 自動顯示今日行程
- 支援登入/登出切換
- **記住登入狀態**：重新整理頁面後自動保持登入
- 完整的錯誤處理與狀態顯示

### 📱 響應式設計
- 支援手機、平板、桌面各種螢幕尺寸
- 768px 以下自動切換為垂直佈局
- 480px 以下縮小時鐘和卡片尺寸
- **觸控滑動**：手機/平板可左右滑動切換卡片
- **點擊指示器**：可點擊底部圓點直接跳轉
- **PWA 全螢幕**：加入主畫面後無瀏覽器 UI

### 📴 離線支援
- **Service Worker**：App 檔案完整快取，離線也能載入
- 時鐘永遠使用本機時間
- 天氣/新聞/地震資料快取到 localStorage
- 離線時顯示上次快取的資料
- 網路恢復時自動更新最新資料
- **自動資料刷新**：每分鐘檢查資料新鮮度，過期自動更新

### 🚗 CarPlay / 車用整合支援
雖然網頁無法直接作為 CarPlay App 安裝，但本專案支援 **Web Audio** 與 **MediaSession API**，讓您可以透過以下方式在車上使用：

1. **連接 CarPlay**：將手機連接至車機。
2. **開啟網頁**：在手機瀏覽器打開 [Smart Clock](https://ai-smart-clock.vercel.app/)。
3. **播放新聞**：點擊新聞卡片下方的 **「🔊 朗讀新聞」** 按鈕。
4. **車機顯示**：CarPlay 畫面上的 **「播放中 (Now Playing)」** 介面即會顯示：
   - 即時新聞標題與摘要（作為專輯/藝術家資訊）
   - 新聞圖片或 App 圖示
5. **車上控制**：您可以使用方向盤或車機螢幕上的「暫停/播放/上一首/下一首」來控制新聞播報。

### 🗣️ 如何用 Siri 語音開啟？
由於網頁不是原生 App，Siri 預設無法直接開啟。請透過 iOS **「捷徑 (Shortcuts)」** 設定語音指令：

1.  開啟 iPhone 上的 **「捷徑」** App。
2.  點擊右上角 **「+」** 新增捷徑。
3.  點擊 **「加入動作」**，搜尋 **「打開 URL」**。
4.  將 URL 設定為：`https://ai-smart-clock.vercel.app/`
5.  點擊上方標題，選擇 **「重新命名」**，輸入您想對 Siri 說的指令，例如：**「啟動時鐘」** 或 **「打開儀表板」**。
6.  設定完成！現在您可以對 Siri 說：**「黑 Siri，啟動時鐘」** 即可自動打開網頁。

### ⚡ 進階技巧：上車自動開啟 (最強大！)
如果不想要每次都對 Siri 說話，可以設定 **「上車自動打開」**：

1.  開啟 iPhone **「捷徑 (Shortcuts)」** App，切換到下方的 **「自動化 (Automation)」** 分頁。
2.  點擊 **「+」** 新增個人自動化操作。
3.  選擇 **「CarPlay」** → 當 **「連線」** 時。
4.  下一步，加入動作搜尋 **「打開 URL」**。
5.  貼上網址：`https://ai-smart-clock.vercel.app/`
6.  **關鍵**：關閉 **「執行前先詢問」** (Ask Before Running)，這樣才會全自動執行。
7.  完成！以後一接上車機，Smart Clock 就會自動彈出來。

## 🔄 輪播機制

儀表板會自動輪播以下內容：

```
新聞 1 → 新聞 2 → 新聞 3 → 日曆 → 新聞 4 → 新聞 5 → 天氣 → 地震 → (循環)
```

每張卡片顯示 **15 秒**，完整一輪約 **2 分鐘**。

## 🛠️ 技術架構

- **Frontend**: 純 HTML + CSS + JavaScript
- **API 整合**:
  - RSS Feed（智流新聞）
  - Open-Meteo API（天氣，免費）
  - USGS API（地震，免費）
  - Google Calendar API（行事曆）
- **部署**: Vercel

## 🚀 快速開始

### 本地開發

```bash
# Clone 專案
git clone https://github.com/bangdoll/SmartClock.git
cd SmartClock

# 開啟本地伺服器
npx http-server -p 8080

# 瀏覽 http://localhost:8080
```

### 設定 API Keys（選用）

編輯 `index.html` 中的 `CONFIG` 區塊：

```javascript
const CONFIG = {
    WEATHER_API_KEY: 'your-openweathermap-api-key',
    CWA_API_KEY: 'your-cwa-api-key',
    GOOGLE_CLIENT_ID: 'your-google-client-id',
    LAT: 25.0330,  // 緯度
    LON: 121.5654, // 經度
    CARD_INTERVAL: 10000, // 卡片切換間隔（毫秒）
};
```

## 📱 響應式設計

儀表板針對全螢幕顯示優化，適合作為：
- 桌面小工具
- 電視牆資訊看板
- 嵌入式顯示器

## 📄 License

MIT License

---

Made with ❤️ for [智流 Smart Flow](https://smart-flow.rd.coach)
