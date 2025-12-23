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
- 支援 OpenWeatherMap API 整合
- 預設顯示台北天氣

### 🌋 地震資訊
- 整合中央氣象署地震資料
- 顯示震度、位置、規模、深度
- 視覺化震度指示器

## 🔄 輪播機制

儀表板會自動輪播以下內容：

```
新聞 1 → 新聞 2 → 新聞 3 → 新聞 4 → 新聞 5 → 天氣 → 地震 → (循環)
```

每張卡片顯示 **10 秒**，完整一輪約 **70 秒**。

## 🛠️ 技術架構

- **Frontend**: 純 HTML + CSS + JavaScript
- **API 整合**:
  - RSS Feed（智流新聞）
  - OpenWeatherMap API（天氣）
  - 中央氣象署 API（地震）
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
