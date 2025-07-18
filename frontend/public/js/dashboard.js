// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  const welcomeMsg = document.getElementById('welcome-msg');
  const projectsContainer = document.querySelector('.projects-list'); // تحتاج تضيف هذا في HTML
  const token = localStorage.getItem('token');

  // ✅ إذا لا يوجد توكن → ارجع لتسجيل الدخول
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // ✅ استخراج بيانات المستخدم من التوكن (اختياري فقط للعرض)
  const payload = JSON.parse(atob(token.split('.')[1]));
  welcomeMsg.textContent = `Welcome, ${payload.full_name || payload.email || 'User'}!`;

  // ✅ جلب المشاريع
  fetch('http://localhost:3000/api/projects', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(projects => {
      if (Array.isArray(projects) && projects.length > 0) {
        projects.forEach(project => {
          const div = document.createElement('div');
          div.className = 'project-card';
          div.innerHTML = `
            <h4>${project.name}</h4>
            <p>${project.description}</p>
            <small>Created at: ${new Date(project.created_at).toLocaleString()}</small>
          `;
          projectsContainer.appendChild(div);
        });
      } else {
        projectsContainer.innerHTML = '<p>No projects found.</p>';
      }
    })
    .catch(err => {
      console.error('Failed to load projects:', err);
      projectsContainer.innerHTML = '<p>Error loading projects.</p>';
    });
});

// زر تسجيل الخروج

// const logoutBtn = document.getElementById('logoutBtn');
// logoutBtn.addEventListener('click', () => {
//   localStorage.removeItem('token');
//   window.location.href = 'login.html'; // إعادة توجيه لتسجيل الدخول
// });

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.setItem('logoutMessage', '🟢 تم تسجيل الخروج بنجاح');
  window.location.href = 'login.html';
});

