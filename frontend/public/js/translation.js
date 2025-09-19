// aqil-volunteering/frontend/public/js/translation.js

const translations = {
  en: {
    // General
    profile: "Profile",
    personal_info: "Personal Information",
    experience: "Experience",
    projects: "Projects",
    courses: "Courses",
    skills: "Skills",
    languages: "Languages",
    photo: "Profile Photo",

    // Fields
    national_id: "National ID",
    name: "Full Name",
    email: "Email",
    mother_name: "Mother's Name",
    dob: "Date of Birth",
    gender: "Gender",
    select_gender: "Select Gender",
    male: "Male",
    female: "Female",
    nationality: "Nationality",
    country: "Country of Residence",
    previous_address: "Previous Address",
    current_address: "Current Address",
    marital_status: "Marital Status",
    select_marital: "Select Marital Status",
    single: "Single",
    married: "Married",
    divorced: "Divorced",
    widowed: "Widowed",
    family_members: "Number of Family Members",
    phone: "Phone",
    bio: "Bio",
    save_photo: "Save Photo",

    // Buttons
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    restore: "Restore",
    save: "Save",
  },

  ar: {
    // General
    profile: "الملف الشخصي",
    personal_info: "البيانات الشخصية",
    experience: "الخبرات",
    projects: "المشاريع",
    courses: "الدورات",
    skills: "المهارات",
    languages: "اللغات",
    photo: "صورة الملف الشخصي",

    // Fields
    national_id: "الرقم الوطني",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    mother_name: "اسم الأم",
    dob: "تاريخ الميلاد",
    gender: "الجنس",
    select_gender: "اختر الجنس",
    male: "ذكر",
    female: "أنثى",
    nationality: "الجنسية",
    country: "بلد الإقامة",
    previous_address: "العنوان السابق",
    current_address: "العنوان الحالي",
    marital_status: "الحالة الزوجية",
    select_marital: "اختر الحالة الزوجية",
    single: "أعزب/عزباء",
    married: "متزوج/متزوجة",
    divorced: "مطلق/مطلقة",
    widowed: "أرمل/أرملة",
    family_members: "عدد أفراد الأسرة",
    phone: "الهاتف",
    bio: "نبذة",
    save_photo: "حفظ الصورة",

    // Buttons
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    restore: "استرجاع",
    save: "حفظ",
  }
};

// Helper functions
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

    if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && el.placeholder) {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  const lang = getUserLang();
  applyTranslation(lang);

  const select = document.getElementById("language-select");
  if (select) {
    select.value = lang;
    select.addEventListener("change", (e) => {
      const newLang = e.target.value;
      setUserLang(newLang);
      applyTranslation(newLang);
    });
  }
});
