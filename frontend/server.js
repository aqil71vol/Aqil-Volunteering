const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// ✅ خلي المنفذ يقرأ من متغير البيئة، عشان Railway يشتغل
const PORT = process.env.PORT || 3000;

// ✅ بروكسي: إذا عندك باك إند منفصل على Railway أو لوكال
app.use('/api', createProxyMiddleware({
  target: 'https://your-backend-app.up.railway.app', // ← غيّر هذا حسب رابط الباك إند عندك
  changeOrigin: true,
}));

// ✅ ملفات الموقع (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ شغّل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Frontend server running at http://localhost:${PORT}`);
});



// // ✅ إضافة: استيراد proxy middleware لتوجيه /api إلى الباك إند
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const express = require('express');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// // ✅ إعداد البروكسي لتحويل أي طلب يبدأ بـ /api إلى الباك إند
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost:5000', // ← رابط الباك إند
//     changeOrigin: true
//   })
// );

// // ✅ ملفات الفرونت إند الثابتة
// app.use(express.static(path.join(__dirname, 'public')));

// // ✅ تشغيل السيرفر
// app.listen(PORT, () => {
//   console.log(`🚀 Frontend Server running at http://localhost:${PORT}`);
// });
