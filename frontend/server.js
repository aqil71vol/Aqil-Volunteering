// ✅ إضافة: استيراد proxy middleware لتوجيه /api إلى الباك إند
const { createProxyMiddleware } = require('http-proxy-middleware');

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// ✅ إعداد البروكسي لتحويل أي طلب يبدأ بـ /api إلى الباك إند
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5000', // ← رابط الباك إند
    changeOrigin: true
  })
);

// ✅ ملفات الفرونت إند الثابتة
app.use(express.static(path.join(__dirname, 'public')));

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Frontend Server running at http://localhost:${PORT}`);
});
