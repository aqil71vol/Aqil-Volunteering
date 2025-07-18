# 🌟 Aqil Volunteer App

تطبيق تطوعي متعدد اللغات (العربية والإنجليزية) يساعد المستخدمين على تسجيل الدخول، إدارة المشاريع، وتقديم بيانات المشاركة في الفعاليات.

## 📱 وصف التطبيق

تطبيق مخصص للمتطوعين، يتيح لهم:

- التسجيل وتسجيل الدخول بأمان.
- عرض المشاريع التطوعية المتاحة.
- إرسال بياناتهم للمشاركة.
- مشاهدة فيديوهات وصور تعريفية.
- دعم لغتين: 🇸🇦 العربية و 🇬🇧 الإنجليزية.

---

## 🚀 التقنيات المستخدمة

### 📦 Back-end
- Node.js + Express
- MySQL (قاعدة بيانات)
- JWT (للمصادقة)
- dotenv (لإدارة الإعدادات السرية)
- CORS و Body-parser

### 📱 Front-end (موبايل)
- HTML/CSS/JS *(أو React Native / Flutter حسب التنفيذ)*
- `localStorage` لحفظ التوكن
- واجهات سهلة وتفاعلية
- دعم اللغات من خلال ملفات ترجمة `translation.js`

---

## 🔧 التثبيت والتشغيل

### 🖥️ Back-end (Node.js)

1. استنسخ المشروع:
   ```bash
   git clone https://github.com/username/aqil-volunteer-app.git
   cd aqil-volunteer-app/backend

2. ثبّت التبعيات:

npm install

3. أنشئ ملف .env يحتوي على:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=aqil_db
JWT_SECRET=your_jwt_secret

4. شغل الخادم:

bush
node server.js


📱 Front-end (موبايل أو WebView)
افتح مجلد frontend/ في المتصفح أو ضمن WebView في تطبيقك.

تأكد من ربط النموذج بـ API الخلفي عبر fetch() أو axios.

الملفات المهمة:

login.html ← لتسجيل الدخول

dashboard.html ← لعرض المشاريع

js/login.js, js/projects.js, js/translation.js ← المنطق البرمجي

🛡️ المصادقة
يتم استخدام JWT token.

التوكن يُخزن في localStorage ويُرسل في Header:

Authorization: Bearer YOUR_TOKEN_HERE

🗃️ قاعدة البيانات
الجداول الأساسية:
users ← معلومات المستخدمين

projects ← المشاريع التطوعية

data_entries ← بيانات المشاركة

📸 صور وشروحات (اختياري)



✨ المميزات القادمة
لوحة تحكم للمشرف.

إشعارات فورية (Push Notifications).

دعم Flutter أو React Native كامل.

📬 تواصل
هل لديك ملاحظات أو اقتراحات؟ راسلنا عبر:

📧 info@aqil.org

🌐 aqil.org

📝 الترخيص
هذا المشروع متاح تحت ترخيص MIT.

yaml

---

هل ترغب أن أجهزه كملف جاهز للتحميل؟  
وإن كنت تستخدم Flutter أو React Native فعلًا، أخبرني لأكيّف محتواه أكثر نحو بيئة الموبايل الفعلية.








Ask ChatGPT



Tools


