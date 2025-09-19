// Aqil-Volunteering/frontend/public/js/dashboard.js
document.addEventListener("DOMContentLoaded", () => {
  const welcomeMsg = document.getElementById("welcome-msg");
  const projectsContainer = document.querySelector(".projects-list");
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    window.location.href = "login.html";
    return;
  }

  let payload;
  try {
    payload = jwt_decode(token);
  } catch {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    window.location.href = "login.html";
    return;
  }

  welcomeMsg.textContent = `مرحباً، ${payload.name || payload.email || "User"} 👋`;

  // ===== Projects =====
  const loadProjects = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/projects/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("فشل تحميل المشاريع");

      const projects = await res.json();
      projectsContainer.innerHTML = projects.length
        ? projects.map(p => `
          <div class="project-card">
            <h4>${p.name}</h4>
            <p>${p.description || ""}</p>
            <small>Created at: ${new Date(p.created_at).toLocaleString()}</small>
          </div>`).join("")
        : "<p>لا توجد مشاريع.</p>";
    } catch (err) {
      projectsContainer.innerHTML = "<p>❌ خطأ أثناء تحميل المشاريع.</p>";
    }
  };

  loadProjects(); // استدعاء تحميل المشاريع

  // ===== Logout =====
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    });
  }

  // ===== Language =====
  const langSelect = document.getElementById("language-select");
  if (langSelect) {
    const savedLang = localStorage.getItem("siteLang") || "en";
    langSelect.value = savedLang;
    langSelect.addEventListener("change", () => {
      localStorage.setItem("siteLang", langSelect.value);
      applyTranslation(langSelect.value); // من translation.js
    });
    applyTranslation(savedLang);
  }
});
