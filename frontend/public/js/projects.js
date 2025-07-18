async function loadProjects() {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    alert('Please login first.');
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch('/api/projects', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('jwtToken');
        window.location.href = 'login.html';
        return;
      }
      throw new Error('Failed to load projects');
    }

    const projects = await response.json();
    console.log('Projects:', projects);
    // هنا تكتب كود لعرض المشاريع في الصفحة حسب تصميمك

  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

window.addEventListener('DOMContentLoaded', loadProjects);
