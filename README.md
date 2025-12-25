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
- 使用 USGS 公開 API 抓取台灣地區地震（不需 API Key）
- 顯示震度、位置、規模、深度
- 震央位置自動翻譯成繁體中文
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
