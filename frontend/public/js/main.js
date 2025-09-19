// Aqil-Volunteering/frontend/public/js/main.js
document.addEventListener("DOMContentLoaded", () => {

  /** ==========================
   * Toast Notifications
   * ========================== */
  const showToast = (msg, type = "info") => {
    // إزالة أي توست سابق
    document.querySelectorAll(".toast").forEach(t => t.remove());

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  };

  /** ==========================
   * Unified Fetch with Auth
   * ========================== */
  async function fetchWithAuth(url, { method = "GET", body = null } = {}) {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("⚠️ يجب تسجيل الدخول أولاً");

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "❌ خطأ في الاتصال بالخادم");
    return data;
  }

  /** ==========================
   * Collapsible Sections
   * ========================== */
  document.querySelectorAll('.collapsible').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const content = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', (!expanded).toString());
      content.style.maxHeight = !expanded ? content.scrollHeight + "px" : null;
      content.style.paddingTop = !expanded ? "15px" : null;
    });
  });

  /** ==========================
   * Login Form
   * ========================== */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async e => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      if (!email || !password) return showToast("يرجى ملء جميع الحقول", "error");

      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) return showToast(data.message || "فشل تسجيل الدخول", "error");

        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("userId", data.user?.id || "");
        localStorage.setItem("userEmail", email);

        showToast("✅ تم تسجيل الدخول بنجاح", "success");
        setTimeout(() => window.location.href = "dashboard.html", 500);

      } catch (err) {
        console.error(err);
        showToast("❌ حدث خطأ أثناء الاتصال بالخادم", "error");
      }
    });
  }

  /** ==========================
   * Logout
   * ========================== */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    showToast("✅ تم تسجيل الخروج", "success");
    setTimeout(() => window.location.href = "login.html", 300);
  });

  /** ==========================
   * Language Selector
   * ========================== */
  const langSelect = document.getElementById("language-select");
  if (langSelect) {
    const applyLanguage = (lang) => {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.body.style.textAlign = lang === "ar" ? "right" : "left";
      localStorage.setItem("siteLang", lang);

      document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang]?.[key]) {
          // تحديث النصوص أو placeholders
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.placeholder = translations[lang][key];
          } else {
            el.textContent = translations[lang][key];
          }
        }
      });
    };

    const savedLang = localStorage.getItem("siteLang") || (navigator.language.startsWith("ar") ? "ar" : "en");
    langSelect.value = savedLang;
    applyLanguage(savedLang);

    langSelect.addEventListener("change", () => applyLanguage(langSelect.value));
  }

  /** ==========================
   * Profile Page: Load User Data
   * ========================== */
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showToast("⚠️ الرجاء تسجيل الدخول أولاً", "error");
      setTimeout(() => window.location.href = "login.html", 500);
    } else {
      // تحميل بيانات المستخدم
      fetchWithAuth(`http://localhost:5000/api/users/${userId}`)
        .then(data => {
          for (const key in data) {
            if (profileForm[key]) profileForm[key].value = data[key];
          }
        })
        .catch(err => showToast(err.message, "error"));

      // Handle profile submit
      profileForm.addEventListener("submit", async e => {
        e.preventDefault();
        const payload = {};
        for (const input of profileForm.elements) {
          if (input.name) payload[input.name] = input.value;
        }

        try {
          await fetchWithAuth(`http://localhost:5000/api/users/${userId}`, { method: "PUT", body: payload });
          showToast(translations[getUserLang()].recordUpdated, "success");
        } catch (err) {
          showToast(err.message, "error");
        }
      });
    }
  }

});
