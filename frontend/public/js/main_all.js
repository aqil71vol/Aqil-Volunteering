// js/main.js

const translations = {
  en: {
    title: "Welcome to Aqil Volunteering",
    introText: "Join us to make a difference in your community through volunteering!",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    submit: "Submit",
    name: "Name",
    confirmPassword: "Confirm Password",
    dashboard: "Dashboard",
    welcome: "Welcome, Aqil!",
    info: "Here you can manage your volunteering projects, view applications, and more.",
    projects: "Your Projects",
    projectsInfo: "No projects created yet. Click to add a new one.",
    applications: "Volunteer Applications",
    applicationsInfo: "No applications at the moment.",
    login: "login",
    register: "register",
    p1_title: "🌟 What is Aqil Volunteering?",
    p1: "Aqil Volunteering is a dynamic social platform connecting volunteers and organizations worldwide.",
    p2_title: "🚀 Why Join Us?",
    p2: "Engage with meaningful projects, grow your skills, and make a positive impact.",
    copyright: "© 2025 Aqil. All rights reserved.",
    ball: "Hold me",
    background: "Vounteering Day",
    thanks: "Thanks",
    lecture: "Lecture",
    training: "Training",
    data_entry: "Data Entry",
    data_registration: "Data Registration",
    search_data: "Search data...",
    id_number: "ID Number",
    name: "Full Name",
    gender: "Gender",
    select_gender: "Select Gender",
    male: "Male",
    female: "Female",
    nationality: "Nationality",
    email: "Email",
    phone: "Phone Number",
    address: "Address",
    edit: "Edit",
    restore: "Restore",
    delete: "Delete",
    clear: "Clear All",
    submit: "Submit",
    thanks_title: "Thank You",
    thanks_message: "Your information has been received. We appreciate your contribution.",
    back_home: "Back to Home",
    lecture_title: "Lecture",
    lecture_message: "This page is under construction. Please check back later.",
    training_title: "Training",
    training_message: "This page is under construction. Please check back later.",
    socialLinks: {
      facebook: "https://facebook.com/aqilvolunteer",
      instagram: "https://instagram.com/aqilvolunteer",
      whatsapp: "https://wa.me/1234567890"
    }
  },
  ar: {
    title: "مرحبًا بك في عقيل للتطوع",
    introText: "انضم إلينا لتُحدث فرقًا في مجتمعك من خلال التطوع!",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    submit: "إرسال",
    name: "الاسم",
    confirmPassword: "تأكيد كلمة المرور",
    dashboard: "لوحة التحكم",
    welcome: "مرحبًا، عقيل!",
    info: "يمكنك هنا إدارة مشاريعك التطوعية، وعرض الطلبات، والمزيد",
    projects: "مشاريعك",
    projectsInfo: "لا توجد مشاريع حالياً. اضغط لإضافة مشروع جديد",
    applications: "طلبات المتطوعين",
    applicationsInfo: "لا توجد طلبات في الوقت الحالي",
    login: "تسجيل الدخول",
    register: "يسجل",
    p1_title: "🌟ما هي عقيل للتطوع؟",
    p1: "عقيل للتطوع هي منصة اجتماعية ديناميكية تربط بين المتطوعين والمنظمات حول العالم",
    p2_title: "🚀لماذا تنضم إلينا؟",
    p2: "شارك في مشاريع هادفة، طوّر مهاراتك، واصنع فرقاً إيجابياً في مجتمعك",
    copyright: "© ٢٠٢٥ عقيل. جميع الحقوق محفوظة.",
    ball: "امسكني",
    background: "يوم التطوع العالمي",
    thanks: "شكراً",
    lecture: "محاضرة",
    training: "تدريب",
    data_entry: "ادخال بيانات",
    data_registration: "تسجيل بيانات",
    search_data: "ابحث عن البيانات...",
    id_number: "الرقم التعريفي",
    name: "الاسم الكامل",
    gender: "الجنس",
    select_gender: "اختر الجنس",
    male: "ذكر",
    female: "أنثى",
    nationality: "الجنسية",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    address: "العنوان",
    edit: "تعديل",
    restore: "إرجاع",
    delete: "حذف",
    clear: "مسح الكل",
    submit: "إرسال",
    thanks_title: "شكراً لك",
    thanks_message: "تم استلام بياناتك. نشكرك على مساهمتك.",
    back_home: "العودة إلى الصفحة الرئيسية",
    lecture_title: "المحاضرة",
    lecture_message: "هذه الصفحة قيد الإنشاء، يرجى العودة لاحقاً",
    training_title: "المحاضرة",
    training_message: "هذه الصفحة قيد الإنشاء، يرجى العودة لاحقاً",
    socialLinks: {
      facebook: "https://facebook.com/aqilvolunteer",
      instagram: "https://instagram.com/aqilvolunteer",
      whatsapp: "https://wa.me/1234567890"
    }
  }
};

function getUserLang() {
  return localStorage.getItem("language") || (navigator.language.startsWith("ar") ? "ar" : "en");
}

function setUserLang(lang) {
  localStorage.setItem("language", lang);
}

function applyTranslation(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.style.textAlign = lang === "ar" ? "right" : "left";

  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    const text = translations[lang]?.[key];
    if (!text) return;

    if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && "placeholder" in el) {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });

  // Update social links & copyright
  const fb = document.getElementById("fb-link");
  const insta = document.getElementById("insta-link");
  const wa = document.getElementById("wa-link");
  const copy = document.getElementById("copyright");

  const links = translations[lang].socialLinks;
  if (fb) fb.href = links.facebook;
  if (insta) insta.href = links.instagram;
  if (wa) wa.href = links.whatsapp;
  if (copy) copy.textContent = translations[lang].copyright;

  // Sync language select dropdown if exists
  const select = document.getElementById("language-select");
  if (select) select.value = lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getUserLang();
  applyTranslation(lang);

  const select = document.getElementById("language-select");
  if (select) {
    select.addEventListener("change", (e) => {
      const newLang = e.target.value;
      setUserLang(newLang);
      applyTranslation(newLang);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.collapsible').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const content = button.nextElementSibling;

      button.setAttribute('aria-expanded', (!expanded).toString());

      if (!expanded) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.paddingTop = "15px";
      } else {
        content.style.maxHeight = null;
        content.style.paddingTop = null;
      }
    });
  });
});

// ✅ أولاً: ربط زر Submit بعملية الإرسال إلى الـ API

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    full_name: form.name.value,
    id_number: form.idNumber.value,
    gender: form.gender.value,
    nationality: form.nationality.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/data-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("✅ تم حفظ البيانات بنجاح!");
      form.reset();
    } else {
      alert("❌ فشل الحفظ.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ خطأ أثناء الاتصال بالخادم.");
  }
});

// 📥 ثانياً: زر البحث Search

document.getElementById("search").addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  if (!query) return;

  try {
    const res = await fetch(`http://localhost:5000/api/data-entry/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.length > 0) {
      const user = data[0]; // نعرض أول نتيجة
      form.idNumber.value = user.id_number;
      form.name.value = user.full_name;
      form.gender.value = user.gender;
      form.nationality.value = user.nationality;
      form.email.value = user.email;
      form.phone.value = user.phone;
      form.address.value = user.address;

      form.dataset.id = user.id; // نخزن ID للتعديل أو الحذف لاحقًا
    } else {
      alert("لا توجد نتائج");
    }
  } catch (err) {
    console.error(err);
  }
});

// ✏️ ثالثاً: زر Edit (تعديل)

document.querySelector(".btn-edit").addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return alert("🔍 ابحث عن سجل أولاً!");

  const payload = {
    full_name: form.name.value,
    id_number: form.idNumber.value,
    gender: form.gender.value,
    nationality: form.nationality.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
  };

  try {
    const response = await fetch(`http://localhost:5000/api/data-entry/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("✅ تم التعديل بنجاح");
    } else {
      alert("❌ فشل التعديل");
    }
  } catch (err) {
    console.error(err);
  }
});

// 🗑️ رابعاً: زر Trash (حذف مؤقت)

document.querySelector(".btn-delete").addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return alert("❗ ابحث عن سجل أولاً!");

  if (!confirm("هل أنت متأكد أنك تريد حذف هذا السجل مؤقتًا؟")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/data-entry/trash/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("🗑️ تم الحذف إلى سلة المهملات.");
      form.reset();
    } else {
      alert("❌ فشل الحذف المؤقت.");
    }
  } catch (err) {
    console.error(err);
  }
});

// ♻️ خامساً: زر Restore (استرجاع)

document.querySelector(".btn-restore").addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return alert("❗ ابحث عن سجل أولاً!");

  try {
    const res = await fetch(`http://localhost:5000/api/data-entry/restore/${id}`, {
      method: "PATCH",
    });

    if (res.ok) {
      alert("✅ تم استرجاع السجل");
    } else {
      alert("❌ فشل الاسترجاع");
    }
  } catch (err) {
    console.error(err);
  }
});

// ☠️ سادساً: حذف نهائي (إذا أضفت زر له)

document.querySelector(".btn-delete-final").addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return alert("❗ ابحث عن سجل أولاً!");

  if (!confirm("⚠️ سيتم حذف السجل نهائيًا. هل أنت متأكد؟")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/data-entry/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("❌ تم الحذف النهائي.");
      form.reset();
    } else {
      alert("❌ فشل الحذف النهائي.");
    }
  } catch (err) {
    console.error(err);
  }
});

// ⏱️ التاريخ والوقت
// يتم إدخاله تلقائيًا عبر قاعدة البيانات (created_at، updated_at). لا حاجة لإدخاله يدويًا

// في دالة applyTranslations أو translatePage، نضيف السطر:
// updateFooterLinks(lang);

//jBall الكرة

const ball = document.getElementById('ball');
const kickSound = document.getElementById('kickSound');

function getRandomPosition() {
  const maxX = window.innerWidth - ball.offsetWidth;
  const maxY = window.innerHeight - ball.offsetHeight;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  return { x, y };
}

let moveInterval;

function moveBall() {
  const { x, y } = getRandomPosition();
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
}

// ابدأ الحركة وتكرارها كل 2 ثانية
function startMoving() {
  moveBall();
  moveInterval = setInterval(moveBall, 2000);
}

function stopMoving() {
  clearInterval(moveInterval);
}

function kickBall() {
  stopMoving();

  const { x, y } = getRandomPosition();

  ball.style.transition = "left 0.15s ease, top 0.15s ease, transform 0.15s ease";
  ball.style.left = x + "px";
  ball.style.top = y + "px";

  ball.style.transform = "scale(1.3) rotate(15deg)";

  kickSound.currentTime = 0;
  kickSound.play();

  setTimeout(() => {
    ball.style.transform = "scale(1) rotate(0deg)";
    ball.style.transition = "left 0.5s ease, top 0.5s ease, transform 0.2s ease";

    // استأنف الحركة العشوائية
    startMoving();
  }, 150);
}

document.addEventListener('DOMContentLoaded', () => {
  startMoving();

  ball.addEventListener('mouseenter', kickBall);
  ball.addEventListener('click', kickBall);
});


// // main.js - تجريبي
// document.addEventListener("DOMContentLoaded", () => {
//   // نموذج الدخول
//   const loginForm = document.getElementById("login-form");
//   if (loginForm) {
//     loginForm.addEventListener("submit", (e) => {
//       e.preventDefault();

//       const email = loginForm.email.value.trim();
//       const password = loginForm.password.value.trim();

//       if (!email || !password) {
//         alert("Please fill in both email and password.");
//         return;
//       }

//       // تحقق من صحة البيانات أو إرسالها للسيرفر هنا
//       alert("Login successful!");
//       window.location.href = "dashboard.html";  // تأكد وجود الملف فعلاً
//     });
//   }

//   // نموذج التسجيل
//   const registerForm = document.getElementById("register-form");
//   if (registerForm) {
//     registerForm.addEventListener("submit", (e) => {
//       e.preventDefault();

//       const name = registerForm.name.value.trim();
//       const email = registerForm.email.value.trim();
//       const password = registerForm.password.value.trim();

//       if (!name || !email || !password) {
//         alert("Please fill all the fields.");
//         return;
//       }

//       if (password.length < 6) {
//         alert("Password must be at least 6 characters long.");
//         return;
//       }

//       // إرسال بيانات التسجيل للسيرفر أو التحقق هنا
//       alert("Registration successful!");
//       window.location.href = "login.html";  // بعد التسجيل يرجع للدخول
//     });
//   }
// });
