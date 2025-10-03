/* aqil-volunteering/frontend/public/js/profile-toast.js */
// ======================
// Profile Toast Notification Module
// ======================

/**
 * Usage:
 * profileToast('save_success', 'success');
 * profileToast('save_failed', 'error');
 */

function profileToast(key, type = "info") {
  const lang = localStorage.getItem("lang") || "en";
  const msg = translations[lang]?.[key] || translations['en']?.[key] || key;

  // Create toast container if it doesn't exist
  let container = document.getElementById("profile-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "profile-toast-container";
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "6px";
  toast.style.minWidth = "200px";
  toast.style.color = "#fff";
  toast.style.fontWeight = "500";
  toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  toast.style.opacity = "0";
  toast.style.transform = "translateX(100%)";
  toast.style.transition = "all 0.4s ease";

  // Type-based colors
  switch (type) {
    case "success":
      toast.style.backgroundColor = "#4CAF50";
      break;
    case "error":
      toast.style.backgroundColor = "#F44336";
      break;
    case "warning":
      toast.style.backgroundColor = "#FF9800";
      break;
    case "info":
    default:
      toast.style.backgroundColor = "#2196F3";
      break;
  }

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(0)";
  }, 10);

  // Auto remove
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => container.removeChild(toast), 400);
  }, 3000);
}

// Optional: shortcut for English messages
function profileToastEn(msg, type = "info") {
  const key = Object.keys(translations.en).find(k => translations.en[k] === msg) || msg;
  profileToast(key, type);
}
