// عرض رسالة تسجيل الخروج إن وجدت
document.addEventListener('DOMContentLoaded', () => {
  const message = localStorage.getItem('logoutMessage');
  if (message) {
    alert(message); // أو استخدم div أنيق إن أردت
    localStorage.removeItem('logoutMessage');
  }
});

const msg = localStorage.getItem('logoutMessage');
if (msg) {
  const msgBox = document.getElementById('logout-message');
  msgBox.textContent = msg;
  msgBox.style.display = 'block';
  localStorage.removeItem('logoutMessage');
}



document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Login failed');
      return;
    }

    // حفظ التوكن في localStorage
    localStorage.setItem('jwtToken', data.token);

    alert('Login successful');
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert('Error connecting to server');
    console.error(error);
  }
});
