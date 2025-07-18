// js/auth.js

// وظيفة للتحقق من وجود المستخدم (مثلاً وجود توكن أو إيميل محفوظ)
function checkAuth() {
  // ممكن تستبدل 'userEmail' بأي مفتاح تخزن فيه بيانات الجلسة
  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
    // لو ما في بيانات، يرجع لصفحة الدخول
    window.location.href = 'login.html';
  }
}

// استدعاء الوظيفة مباشرة
checkAuth();
