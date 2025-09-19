//aqil-volunteering/frontend/puplic/js/logout.js
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("full_name");
    localStorage.setItem("logoutMessage", "✅ Successfully logged out");
    window.location.href = "login.html";
  });
});
