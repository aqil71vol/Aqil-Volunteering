├── frontend/
│   ├── public/               ← نضع فيه الملفات التي ستُخدّم على الويب
│   │   ├── index.html
│   │   ├── dashbord.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── pages/
│   │   │   ├── page 1.html
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

# Aqil Volunteering - Frontend

واجهة المستخدم (Frontend) باستخدام HTML, CSS, JavaScript، مع دعم RTL و EN، وواجهة ديناميكية للـ Profile.

## المتطلبات
- Node.js >= 18 (لتشغيل سيرفر البروكسي المحلي)
- متصفح حديث (Chrome, Firefox, Edge)
- npm

## إعداد المشروع

1. استنساخ المشروع:
```bash
git clone <repo-url>
cd aqil-volunteering/frontend

2. تثبيت الاعتماديات (لتشغيل السيرفر المحلي فقط):

npm install

3. إعداد متغيرات البيئة:

. إذا أردت توجيه الطلبات للباك إند على سيرفر مختلف، اضبط .env أو متغير BACKEND_URL في server.js.

4. تشغيل سيرفر الفرونت إند:

node server.js

أو لتطوير سريع مع مراقبة التغييرات:

npm run dev

. السيرفر يستمع افتراضيًا على http://localhost:3000

. جميع الطلبات التي تبدأ بـ /api يتم تحويلها تلقائيًا إلى الباك إند (/api proxy)

الهيكلية

frontend/
├── public/                  # ملفات HTML, CSS, JS و Assets
│   ├── pages/               # صفحات الموقع (profile.html, index.html)
│   ├── css/                 # ملفات CSS
│   ├── js/                  # ملفات JS (auth, profile, translation)
│   └── assets/              # صور، فيديوهات، أي ملفات ثابتة
├── server.js                # سيرفر Express لتقديم الملفات + بروكسي API
├── package.json
└── .env

المميزات

صفحة Profile كاملة:

تعديل المعلومات الشخصية

إدارة الخبرات، الوظائف، الدورات، الهوايات، اللغات

رفع الصورة الشخصية

طباعة السيرة الذاتية باللغتين

دعم تعدد اللغات (EN / AR)

Navbar ديناميكي بين الأقسام

حماية الصفحة باستخدام JWT المخزن في localStorage

أزرار تسجيل الدخول / تسجيل خروج

تعليمات

افتح http://localhost:3000/pages/profile.html للوصول إلى البروفايل.

تأكد أن الباك إند يعمل على http://localhost:5000 أو حسب إعدادك في server.js.

عند تسجيل الدخول، سيتم تخزين JWT في localStorage واستخدامه في جميع الطلبات المحمية.

ملاحظات

جميع الملفات الثابتة في public/ يمكن تعديلها مباشرة.

ملفات JS منظمة حسب الوظيفة (auth, profile, translation).

CSS مركزي في style.css، مع استخدام متغيرات root لتسهيل التعديل على الألوان والتنسيق.

