/* aqil-volunteering/frontend/public/js/toast.js */

/**
 * Show a toast notification
 * @param {string} key - مفتاح الرسالة من translation.js
 * @param {string} type - نوع الرسالة: 'success' | 'error'
 * @param {number} duration - مدة العرض بالمللي ثانية (افتراضي: 3000)
 */
function showToast(key, type = 'success', duration = 3000) {
  // جلب لغة المستخدم الحالية
  const lang = getUserLang(); // من translation.js
  const msg = translations[lang]?.[key] || translations['en']?.[key] || key;

  // إنشاء عنصر التنبيه
  let toast = document.createElement('div');
  toast.className = `notification ${type} show`;
  toast.textContent = msg;

  document.body.appendChild(toast);

  // إزالة التنبيه بعد المدة المحددة
  setTimeout(() => {
    toast.classList.remove('show');
    toast.style.opacity = 0;
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => document.body.removeChild(toast), 400);
  }, duration);
}
