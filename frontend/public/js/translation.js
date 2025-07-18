// translition.js

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
    passwordMismatch: "Passwords do not match",
    registrationFailed: "Registration failed",
    registrationSuccess: "Registration successful",
    serverConnectionError: "Error connecting to server",
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
    passwordMismatch: "كلمات المرور غير متطابقة",
    registrationFailed: "فشل التسجيل",
    registrationSuccess: "تم التسجيل بنجاح",
    serverConnectionError: "خطأ في الاتصال بالخادم",
    socialLinks: {
      facebook: "https://facebook.com/aqilvolunteer",
      instagram: "https://instagram.com/aqilvolunteer",
      whatsapp: "https://wa.me/1234567890"
    }
  }
};


// دالة لعرض رسالة مترجمة بناءً على اللغة المختارة
function alertMessage(key) {
  const lang = localStorage.getItem("lang") || "en";
  const message = translations[lang]?.[key] || key;
  alert(message);
}


function getUserLang() {
  return localStorage.getItem("lang") || (navigator.language.startsWith("ar") ? "ar" : "en");
}

function setUserLang(lang) {
  localStorage.setItem("lang", lang);
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

  const fb = document.getElementById("fb-link");
  const insta = document.getElementById("insta-link");
  const wa = document.getElementById("wa-link");
  const copy = document.getElementById("copyright");

  const links = translations[lang].socialLinks;
  if (fb) fb.href = links.facebook;
  if (insta) insta.href = links.instagram;
  if (wa) wa.href = links.whatsapp;
  if (copy) copy.textContent = translations[lang].copyright;

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

  // Zoom functionality
  window.addEventListener("wheel", (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      let scale = Number(document.body.style.zoom) || 1;
      scale += e.deltaY < 0 ? 0.1 : -0.1;
      scale = Math.min(Math.max(0.5, scale), 2);
      document.body.style.zoom = scale;
    }
  }, { passive: false });

  // Load saved data if available
  const form = document.getElementById("registerForm");
  const fields = ["idNumber", "name", "gender", "nationality", "email", "phone", "address"];

  if(form) {
    fields.forEach((field) => {
      if (localStorage.getItem(field)) {
        form[field].value = localStorage.getItem(field);
      }
    });

    // Submit handler
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
  }
});
