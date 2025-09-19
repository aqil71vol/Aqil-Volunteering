// Aqil-Volunteering/frontend/public/js/login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  const showToast = (msg, type = "info") => {
    document.querySelectorAll(".toast").forEach(t => t.remove());
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) return showToast("⚠️ Please fill all fields", "error");

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) return showToast(data.message || '❌ Login failed', "error");

      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('userId', data.user?.id || "");
      localStorage.setItem('userEmail', email);
      localStorage.setItem('full_name', data.user?.full_name || "");

      showToast("✅ Logged in successfully!", "success");
      setTimeout(() => window.location.href = 'dashboard.html', 1000);

    } catch (err) {
      console.error(err);
      showToast("❌ Error connecting to server", "error");
    }
  });

  // رسالة تسجيل الخروج إذا موجودة
  const logoutMsg = localStorage.getItem('logoutMessage');
  if (logoutMsg) {
    showToast(logoutMsg, "success");
    localStorage.removeItem('logoutMessage');
  }
});

