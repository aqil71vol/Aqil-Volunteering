document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (form.password.value !== form.confirmPassword.value) {
      alert('Passwords do not match');
      return;
    }

    const payload = {
      full_name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        return;
      }

      // Success: save user email
      localStorage.setItem('userEmail', payload.email);

      alert('Registration successful');
      window.location.href = 'dashboard.html'; // redirect to dashboard
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  });
});

///////////////////////////////////////////////////////////////


  // <script>
  //   translatePage();

  //   // Zoom in/out with ctrl + mouse wheel
  //   window.addEventListener(
  //     "wheel",
  //     (e) => {
  //       if (e.ctrlKey) {
  //         e.preventDefault();
  //         let scale = Number(document.body.style.zoom) || 1;
  //         if (e.deltaY < 0) scale += 0.1;
  //         else scale -= 0.1;
  //         scale = Math.min(Math.max(0.5, scale), 2);
  //         document.body.style.zoom = scale;
  //       }
  //     },
  //     { passive: false }
  //   );

  //   const form = document.getElementById("registerForm");
  //   const nameInput = form.name;
  //   const emailInput = form.email;
  //   const passwordInput = form.password;
  //   const confirmPasswordInput = form.confirmPassword;

  //   // Load saved data if موجودة
  //   window.addEventListener("load", () => {
  //     if (localStorage.getItem("name")) nameInput.value = localStorage.getItem("name");
  //     if (localStorage.getItem("email")) emailInput.value = localStorage.getItem("email");
  //   });

  // form.addEventListener("submit", async (e) => {
  // e.preventDefault();

  // if (passwordInput.value !== confirmPasswordInput.value) {
  //   alert("Passwords do not match!");
  //   return;
  // }

  // try {
  //   const response = await fetch('/api/auth/register', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       name: nameInput.value.trim(),
  //       email: emailInput.value.trim(),
  //       password: passwordInput.value
  //     })
  //   });

  //   const data = await response.json();

  //   if (!response.ok) {
  //     alert(data.message || "Registration failed");
  //     return;
  //   }

  //   alert("Registration successful! Please log in.");

  //   localStorage.setItem("userEmail", emailInput.value.trim());
  //   localStorage.setItem("name", nameInput.value.trim());

  //   window.location.href = "dashboard.html";


  //   // // حفظ الاسم والايميل (اختياري)
  //   // localStorage.setItem("name", nameInput.value.trim());
  //   // localStorage.setItem("email", emailInput.value.trim());

  //   // // إعادة التوجيه إلى صفحة تسجيل الدخول
  //   // window.location.href = "login.html";

  // } catch (error) {
  //   console.error("Error:", error);
  //   alert("Error connecting to server");
  // }

  //     // if (passwordInput.value !== confirmPasswordInput.value) {
  //     //   alert("Passwords do not match!");
  //     //   return;
  //     // }

  //     // // حفظ الاسم والايميل فقط (لعدم حفظ الباسورد للأمان)
  //     // localStorage.setItem("name", nameInput.value);
  //     // localStorage.setItem("email", emailInput.value);

  //     // // منطق التسجيل عبر API ممكن يضاف هنا
  //     // alert("تم حفظ البيانات! (محاكاة التسجيل)");
  //   });

  //   // ضبط لغة السليكت مع ترجمة الصفحة بعد تحميل كامل الـ DOM
  //   document.addEventListener("DOMContentLoaded", () => {
  //     const select = document.getElementById("language-select");
  //     if (select) {
  //       select.value = localStorage.getItem("lang") || (navigator.language.startsWith("ar") ? "ar" : "en");
  //       select.addEventListener("change", (e) => {
  //         localStorage.setItem("lang", e.target.value);
  //         translatePage();
  //         // تحديث اتجاه الصفحة تلقائياً
  //         document.documentElement.dir = e.target.value === "ar" ? "rtl" : "ltr";
  //         document.body.style.textAlign = e.target.value === "ar" ? "right" : "left";
  //       });
  //     }
  //   });
  // </script>
///////////////////////////////////////////////////////////////