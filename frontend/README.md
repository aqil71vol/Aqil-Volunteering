# Aqil-Volunteering - Frontend

1. rontend/README.md
تخفيض السعر

ينسخ

يحرر


واجهة مشروع تطوعي تفاعلي لدعم العمل التطوعي باستخدام HTML, CSS, JavaScript مع سيرفر Express محلي لتجربة الموقع.

---

## 📁 هيكل المشروع


---

## 🚀 خطوات تشغيل المشروع محليًا

### 1. الانتقال إلى مجلد المشروع

```bash
cd Aqil-Volunteering/frontend


Aqil-Volunteering/
├── frontend/
│   ├── public/               ← نضع فيه الملفات التي ستُخدّم على الويب
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── pages/
│   │   │   ├── data_entry.html
│   │   │   ├── lecture.html
│   │   │   ├── thanks.html
│   │   │   └── training.html
│   │   ├── css/
│   │   ├── js/
│   │   └── assets/
│   │       ├── images/
│   │       ├── videos/
│   │       └── sounds/
│   ├── package.json
│   └── node_modules/
├── server.js                 ← موجود بجذر المشروع


2. التحقق من تنصيب Node.js و NPM
node -v
npm -v

3. تهيئة المشروع
npm init -y

4. تثبيت Express.js
npm install express

5. إنشاء ملف يخدمserver.js
touch server.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// تقديم ملفات الواجهة
app.use(express.static(path.join(__dirname, 'public')));

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});



🌐 تشغيل السيرفر

node server.js

http://localhost:3000


