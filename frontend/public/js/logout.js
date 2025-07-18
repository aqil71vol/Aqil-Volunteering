document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('jwtToken');
  window.location.href = 'login.html';
});
