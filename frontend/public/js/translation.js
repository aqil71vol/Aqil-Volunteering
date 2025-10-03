// aqil-volunteering/frontend/public/js/translation.js (محسّن بالكامل)

// ======================
// translation.js (Universal with toast support)
// ======================

const translations = {
  en: {
    profile: "Profile",
    personal_info: "Personal Information",
    experience: "Experience",
    projects: "Projects",
    courses: "Courses",
    skills: "Skills",
    languages: "Languages",
    photo: "Profile Photo",
    data_entry: "Data Entry",
    data_entries: "Data Entries",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
    save_photo: "Save Photo",
    back: "Back",
    cancel: "Cancel",
    submit: "Submit",
    search: "Search",
    no_data: "No data available",
    actions: "Actions",
    national_id: "National ID",
    full_name: "Full Name",
    email: "Email",
    password: "Password",
    mother_name: "Mother's Name",
    dob: "Date of Birth",
    gender: "Gender",
    select_gender: "Select Gender",
    male: "Male",
    female: "Female",
    other: "Other",
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
    mobile: "Mobile",
    bio: "Bio",
    experiences: "Experiences",
    courses_list: "Courses",
    skills_list: "Skills",
    languages_list: "Languages",
    entries: "Entries",
    search_placeholder: "Type to search...",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    restore: "Restore",
    save: "Save",
    update: "Update",
    delete_soft: "Soft Delete",
    delete_hard: "Hard Delete",
    upload_file: "Upload",
    download_csv: "Download CSV",
    preview_pdf: "Preview PDF",
    login_success: "✅ Login successful",
    login_failed: "❌ Login failed",
    save_success: "✅ Saved successfully",
    save_failed: "❌ Failed to save",
    delete_success: "✅ Deleted successfully",
    delete_failed: "❌ Failed to delete",
    upload_success: "✅ Uploaded successfully",
    upload_failed: "❌ Failed to upload",
    select_file: "Select a file first",
    confirm_soft_delete: "Do you want to soft delete this entry?",
    confirm_hard_delete: "Do you want to permanently delete this entry?",
    confirm_restore: "Do you want to restore this entry?",
    email_invalid: "Invalid email format",
    download: "Download",
    pdf_downloaded: "PDF downloaded",

    info_loaded: "✅ Personal information loaded",
    info_load_failed: "❌ Failed to load personal information",
    info_saved: "✅ Personal information saved",
    info_save_failed: "❌ Failed to save personal information",
    file_uploaded: "✅ File uploaded successfully",
    file_upload_failed: "❌ Failed to upload file",
    file_soft_deleted: "✅ File soft deleted",
    file_hard_deleted: "✅ File permanently deleted",
    file_delete_failed: "❌ Failed to delete file",
    cv_preview_ready: "✅ CV preview is ready",
    cv_preview_failed: "❌ Failed to load CV preview",
    entry_added: "✅ Entry added successfully",
    entry_add_failed: "❌ Failed to add entry",
    entry_updated: "✅ Entry updated successfully",
    entry_update_failed: "❌ Failed to update entry",
  },

  ar: {
    profile: "الملف الشخصي",
    personal_info: "البيانات الشخصية",
    experience: "الخبرات",
    projects: "المشاريع",
    courses: "الدورات",
    skills: "المهارات",
    languages: "اللغات",
    photo: "صورة الملف الشخصي",
    data_entry: "نافذة إدخال البيانات",
    data_entries: "السجلات",
    login: "تسجيل الدخول",
    logout: "تسجيل الخروج",
    dashboard: "لوحة التحكم",
    save_photo: "حفظ الصورة",
    back: "رجوع",
    cancel: "إلغاء",
    submit: "إرسال",
    search: "بحث",
    no_data: "لا توجد بيانات",
    actions: "إجراءات",
    national_id: "الرقم الوطني",
    full_name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    mother_name: "اسم الأم",
    dob: "تاريخ الميلاد",
    gender: "الجنس",
    select_gender: "اختر الجنس",
    male: "ذكر",
    female: "أنثى",
    other: "آخر",
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
    mobile: "الجوال",
    bio: "نبذة",
    experiences: "الخبرات",
    courses_list: "الدورات",
    skills_list: "المهارات",
    languages_list: "اللغات",
    entries: "السجلات",
    search_placeholder: "اكتب للبحث...",
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    restore: "استرجاع",
    save: "حفظ",
    update: "تحديث",
    delete_soft: "حذف ناعم",
    delete_hard: "حذف نهائي",
    upload_file: "رفع ملف",
    download_csv: "تحميل CSV",
    preview_pdf: "معاينة PDF",
    login_success: "✅ تم تسجيل الدخول بنجاح",
    login_failed: "❌ فشل تسجيل الدخول",
    save_success: "✅ تم الحفظ بنجاح",
    save_failed: "❌ فشل الحفظ",
    delete_success: "✅ تم الحذف بنجاح",
    delete_failed: "❌ فشل الحذف",
    upload_success: "✅ تم رفع الملف بنجاح",
    upload_failed: "❌ فشل رفع الملف",
    select_file: "اختر ملفاً أولاً",
    confirm_soft_delete: "هل تريد حذف هذا السجل بشكل ناعم؟",
    confirm_hard_delete: "هل تريد حذف هذا السجل نهائياً؟",
    confirm_restore: "هل تريد استرجاع هذا السجل؟",
    email_invalid: "صيغة البريد الإلكتروني غير صحيحة",
    download: "تحميل",
    pdf_downloaded: "✅ تم تحميل الملف",

    info_loaded: "✅ تم تحميل البيانات الشخصية",
    info_load_failed: "❌ فشل تحميل البيانات الشخصية",
    info_saved: "✅ تم حفظ البيانات الشخصية",
    info_save_failed: "❌ فشل حفظ البيانات الشخصية",
    file_uploaded: "✅ تم رفع الملف بنجاح",
    file_upload_failed: "❌ فشل رفع الملف",
    file_soft_deleted: "✅ تم حذف الملف بشكل ناعم",
    file_hard_deleted: "✅ تم حذف الملف نهائياً",
    file_delete_failed: "❌ فشل حذف الملف",
    cv_preview_ready: "✅ معاينة السيرة الذاتية جاهزة",
    cv_preview_failed: "❌ فشل تحميل معاينة السيرة الذاتية",
    entry_added: "✅ تم إضافة السجل",
    entry_add_failed: "❌ فشل إضافة السجل",
    entry_updated: "✅ تم تعديل السجل",
    entry_update_failed: "❌ فشل تعديل السجل",
  }
};

// ======================
// Helper functions
// ======================

function getUserLang() {
  let lang = localStorage.getItem("lang");
  if (!lang) {
    lang = navigator.language.startsWith("ar") ? "ar" : "en";
    localStorage.setItem("lang", lang);
  }
  return lang;
}

function setUserLang(lang) {
  localStorage.setItem("lang", lang);
}

function translateElement(el, lang) {
  const key = el.getAttribute("data-translate");
  const text = translations[lang]?.[key] || translations['en']?.[key] || key;

  if (!text) return;

  if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && el.placeholder !== undefined) {
    el.placeholder = text;
  } else if (el.tagName === "OPTION") {
    el.textContent = text;
  } else {
    el.textContent = text;
  }
}

function applyTranslation(lang) {
  document.documentElement.lang = lang;
  document.body.classList.toggle('rtl', lang === 'ar');
  document.body.classList.toggle('ltr', lang !== 'ar');
  document.querySelectorAll("[data-translate]").forEach(el => translateElement(el, lang));
}

// Universal message function (toast or alert fallback)
function showMessage(key, type = "info") {
  const msg = translations[getUserLang()]?.[key] || translations['en']?.[key] || key;

  if (typeof profileToast === "function") {
    profileToast(key, type);
  } else {
    alert(msg);
  }
}

// Init language selector
document.addEventListener("DOMContentLoaded", () => {
  const lang = getUserLang();
  applyTranslation(lang);

  const select = document.getElementById("language-select");
  if (select) {
    select.value = lang;
    select.addEventListener("change", (e) => {
      setUserLang(e.target.value);
      applyTranslation(e.target.value);
    });
  }
});












// // aqil-volunteering/frontend/public/js/translation.js (محسّن بالكامل)

// const translations = {
//   en: {
//     profile: "Profile",
//     personal_info: "Personal Information",
//     experience: "Experience",
//     projects: "Projects",
//     courses: "Courses",
//     skills: "Skills",
//     languages: "Languages",
//     photo: "Profile Photo",
//     data_entry: "Data Entry",
//     data_entries: "Data Entries",
//     login: "Login",
//     logout: "Logout",
//     dashboard: "Dashboard",
//     save_photo: "Save Photo",
//     back: "Back",
//     cancel: "Cancel",
//     submit: "Submit",
//     search: "Search",
//     no_data: "No data available",
//     actions: "Actions",
//     national_id: "National ID",
//     full_name: "Full Name",
//     email: "Email",
//     password: "Password",
//     mother_name: "Mother's Name",
//     dob: "Date of Birth",
//     gender: "Gender",
//     select_gender: "Select Gender",
//     male: "Male",
//     female: "Female",
//     other: "Other",
//     nationality: "Nationality",
//     country: "Country of Residence",
//     previous_address: "Previous Address",
//     current_address: "Current Address",
//     marital_status: "Marital Status",
//     select_marital: "Select Marital Status",
//     single: "Single",
//     married: "Married",
//     divorced: "Divorced",
//     widowed: "Widowed",
//     family_members: "Number of Family Members",
//     phone: "Phone",
//     mobile: "Mobile",
//     bio: "Bio",
//     experiences: "Experiences",
//     courses_list: "Courses",
//     skills_list: "Skills",
//     languages_list: "Languages",
//     entries: "Entries",
//     search_placeholder: "Type to search...",
//     add: "Add",
//     edit: "Edit",
//     delete: "Delete",
//     restore: "Restore",
//     save: "Save",
//     update: "Update",
//     delete_soft: "Soft Delete",
//     delete_hard: "Hard Delete",
//     upload_file: "Upload",
//     download_csv: "Download CSV",
//     preview_pdf: "Preview PDF",
//     login_success: "✅ Login successful",
//     login_failed: "❌ Login failed",
//     save_success: "✅ Saved successfully",
//     save_failed: "❌ Failed to save",
//     delete_success: "✅ Deleted successfully",
//     delete_failed: "❌ Failed to delete",
//     upload_success: "✅ Uploaded successfully",
//     upload_failed: "❌ Failed to upload",
//     select_file: "Select a file first",
//     confirm_soft_delete: "Do you want to soft delete this entry?",
//     confirm_hard_delete: "Do you want to permanently delete this entry?",
//     confirm_restore: "Do you want to restore this entry?",
//     email_invalid: "Invalid email format",
//     download: "Download",
//     back: "Back",
//     pdf_downloaded: "PDF downloaded"

//   },

//   ar: {
//     profile: "الملف الشخصي",
//     personal_info: "البيانات الشخصية",
//     experience: "الخبرات",
//     projects: "المشاريع",
//     courses: "الدورات",
//     skills: "المهارات",
//     languages: "اللغات",
//     photo: "صورة الملف الشخصي",
//     data_entry: "نافذة إدخال البيانات",
//     data_entries: "السجلات",
//     login: "تسجيل الدخول",
//     logout: "تسجيل الخروج",
//     dashboard: "لوحة التحكم",
//     save_photo: "حفظ الصورة",
//     back: "رجوع",
//     cancel: "إلغاء",
//     submit: "إرسال",
//     search: "بحث",
//     no_data: "لا توجد بيانات",
//     actions: "إجراءات",
//     national_id: "الرقم الوطني",
//     full_name: "الاسم الكامل",
//     email: "البريد الإلكتروني",
//     password: "كلمة المرور",
//     mother_name: "اسم الأم",
//     dob: "تاريخ الميلاد",
//     gender: "الجنس",
//     select_gender: "اختر الجنس",
//     male: "ذكر",
//     female: "أنثى",
//     other: "آخر",
//     nationality: "الجنسية",
//     country: "بلد الإقامة",
//     previous_address: "العنوان السابق",
//     current_address: "العنوان الحالي",
//     marital_status: "الحالة الزوجية",
//     select_marital: "اختر الحالة الزوجية",
//     single: "أعزب/عزباء",
//     married: "متزوج/متزوجة",
//     divorced: "مطلق/مطلقة",
//     widowed: "أرمل/أرملة",
//     family_members: "عدد أفراد الأسرة",
//     phone: "الهاتف",
//     mobile: "الجوال",
//     bio: "نبذة",
//     experiences: "الخبرات",
//     courses_list: "الدورات",
//     skills_list: "المهارات",
//     languages_list: "اللغات",
//     entries: "السجلات",
//     search_placeholder: "اكتب للبحث...",
//     add: "إضافة",
//     edit: "تعديل",
//     delete: "حذف",
//     restore: "استرجاع",
//     save: "حفظ",
//     update: "تحديث",
//     delete_soft: "حذف ناعم",
//     delete_hard: "حذف نهائي",
//     upload_file: "رفع ملف",
//     download_csv: "تحميل CSV",
//     preview_pdf: "معاينة PDF",
//     login_success: "✅ تم تسجيل الدخول بنجاح",
//     login_failed: "❌ فشل تسجيل الدخول",
//     save_success: "✅ تم الحفظ بنجاح",
//     save_failed: "❌ فشل الحفظ",
//     delete_success: "✅ تم الحذف بنجاح",
//     delete_failed: "❌ فشل الحذف",
//     upload_success: "✅ تم رفع الملف بنجاح",
//     upload_failed: "❌ فشل رفع الملف",
//     select_file: "اختر ملفاً أولاً",
//     confirm_soft_delete: "هل تريد حذف هذا السجل بشكل ناعم؟",
//     confirm_hard_delete: "هل تريد حذف هذا السجل نهائياً؟",
//     confirm_restore: "هل تريد استرجاع هذا السجل؟",
//     email_invalid: "صيغة البريد الإلكتروني غير صحيحة",
//     download: "تحميل",
//     back: "رجوع",
//     pdf_downloaded: "✅ تم تحميل الملف"

//   }
// };

// // ======================
// // Helper functions
// // ======================

// function getUserLang() {
//   let lang = localStorage.getItem("lang");
//   if (!lang) {
//     lang = navigator.language.startsWith("ar") ? "ar" : "en";
//     localStorage.setItem("lang", lang);
//   }
//   return lang;
// }

// function setUserLang(lang) {
//   localStorage.setItem("lang", lang);
// }

// function translateElement(el, lang) {
//   const key = el.getAttribute("data-translate");
//   const text = translations[lang]?.[key] || translations['en']?.[key] || key;

//   if (!text) return;

//   if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && el.placeholder !== undefined) {
//     el.placeholder = text;
//   } else if (el.tagName === "OPTION") {
//     el.textContent = text;
//   } else {
//     el.textContent = text;
//   }
// }

// // Apply translation to all elements with data-translate
// function applyTranslation(lang) {
//   document.documentElement.lang = lang;
//   document.body.classList.toggle('rtl', lang === 'ar');
//   document.body.classList.toggle('ltr', lang !== 'ar');

//   document.querySelectorAll("[data-translate]").forEach(el => translateElement(el, lang));
// }

// // Show message in current language
// function showMessage(key) {
//   const lang = getUserLang();
//   const msg = translations[lang]?.[key] || translations['en']?.[key] || key;
//   alert(msg);
// }

// // Automatically add missing keys to translations (future-proof)
// function addMissingKey(key) {
//   if (!translations.en[key]) translations.en[key] = key;
//   if (!translations.ar[key]) translations.ar[key] = key;
// }

// // ======================
// // Init
// // ======================

// document.addEventListener("DOMContentLoaded", () => {
//   const lang = getUserLang();
//   applyTranslation(lang);

//   const select = document.getElementById("language-select");
//   if (select) {
//     select.value = lang;
//     select.addEventListener("change", (e) => {
//       const newLang = e.target.value;
//       setUserLang(newLang);
//       applyTranslation(newLang);
//     });
//   }
// });
