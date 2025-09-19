// aqil-voluntering/frontend/public/js/auth.js
// ================= Register User =================
async function registerUser(e) {
  e.preventDefault();
  const full_name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "❌ فشل التسجيل");
      return;
    }

    // ✅ حفظ التوكن و full_name
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("full_name", data.user.full_name);

    // تحويل للداشبورد
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("❌ خطأ بالسيرفر أثناء التسجيل");
  }
}

// ================= Login User =================
async function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "❌ فشل تسجيل الدخول");
      return;
    }

    // ✅ حفظ التوكن و full_name
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("full_name", data.user.full_name);

    // تحويل للداشبورد
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("❌ خطأ بالسيرفر أثناء تسجيل الدخول");
  }
}

// ================= Logout =================
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("full_name");
  window.location.href = "login.html";
});
