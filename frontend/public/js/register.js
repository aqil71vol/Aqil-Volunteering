// Aqil-Volunteering/frontend/public/js/register.js
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  // ===== Toast Function =====
  const showToast = (msg, type = "info") => {
    document.querySelectorAll(".toast").forEach(t => t.remove());
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  if (!registerForm) return;

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ===== Collect Form Values =====
    const email = registerForm.email.value.trim();
    const password = registerForm.password.value;
    const confirmPassword = registerForm.confirmPassword.value;

    // ===== Validation =====
    if (!email || !password || !confirmPassword) {
      return showToast("⚠️ Please fill all required fields", "error");
    }

    if (password !== confirmPassword) {
      return showToast("⚠️ Passwords do not match", "error");
    }

    // ===== Send to API =====
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return showToast(data.message || "❌ Registration failed", "error");
      }

      // ===== Update localStorage for new user =====
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userEmail", data.user.email);

      showToast("✅ Registration successful! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);

    } catch (err) {
      console.error(err);
      showToast("❌ Error connecting to server", "error");
    }
  });
});
