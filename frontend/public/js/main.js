// main.js

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.collapsible').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const content = button.nextElementSibling;

      button.setAttribute('aria-expanded', (!expanded).toString());

      if (!expanded) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.paddingTop = "15px";
      } else {
        content.style.maxHeight = null;
        content.style.paddingTop = null;
      }
    });
  });
});

// ✅ أولاً: ربط زر Submit بعملية الإرسال إلى الـ API

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    full_name: form.name.value,
    id_number: form.idNumber.value,
    gender: form.gender.value,
    nationality: form.nationality.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/data-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("✅ تم حفظ البيانات بنجاح!");
      form.reset();
    } else {
      alert("❌ فشل الحفظ.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ خطأ أثناء الاتصال بالخادم.");
  }
});

// 📥 ثانياً: زر البحث Search

document.getElementById("search").addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  if (!query) return;

  try {
    const res = await fetch(`http://localhost:5000/api/data-entry/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.length > 0) {
      const user = data[0];
      form.idNumber.value = user.id_number;
      form.name.value = user.full_name;
      form.gender.value = user.gender;
      form.nationality.value = user.nationality;
      form.email.value = user.email;
      form.phone.value = user.phone;
      form.address.value = user.address;
      form.dataset.id = user.id;
    } else {
      alert("لا توجد نتائج");
    }
  } catch (err) {
    console.error(err);
  }
});

// ✏️ ثالثاً: زر Edit (تعديل)

document.querySelector(".btn-edit").addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return alert("🔍 ابحث عن سجل أولاً!");

  const payload = {
    full_name: form.name.value,
    id_number: form.idNumber.value,
    gender: form.gender.value,
    nationality: form.nationality.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value,
  };

  try {
    const response = await fetch(`http://localhost:5000/api/data-entry/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("✅ تم التعديل بنجاح");
    } else {
      alert("❌ فشل التعديل");
    }
  } catch (err) {
    console.error(err);
  }
});

// 🗑️ رابعاً: زر Trash (حذف مؤقت)

document.querySelector(".btn-delete").addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return alert("❗ ابحث عن سجل أولاً!");

  if (!confirm("هل أنت متأكد أنك تريد حذف هذا السجل مؤقتًا؟")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/data-entry/trash/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("🗑️ تم الحذف إلى سلة المهملات.");
      form.reset();
    } else {
      alert("❌ فشل الحذف المؤقت.");
    }
  } catch (err) {
    console.error(err);
  }
});

// ♻️ خامساً: زر Restore (استرجاع)

document.querySelector(".btn-restore").addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return alert("❗ ابحث عن سجل أولاً!");

  try {
    const res = await fetch(`http://localhost:5000/api/data-entry/restore/${id}`, {
      method: "PATCH",
    });

    if (res.ok) {
      alert("✅ تم استرجاع السجل");
    } else {
      alert("❌ فشل الاسترجاع");
    }
  } catch (err) {
    console.error(err);
  }
});

// ☠️ سادساً: حذف نهائي

document.querySelector(".btn-delete-final").addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return alert("❗ ابحث عن سجل أولاً!");

  if (!confirm("⚠️ سيتم حذف السجل نهائيًا. هل أنت متأكد؟")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/data-entry/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("❌ تم الحذف النهائي.");
      form.reset();
    } else {
      alert("❌ فشل الحذف النهائي.");
    }
  } catch (err) {
    console.error(err);
  }
});

///////////////////// آخر إضافة للـ Login ////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('loginForm');
  if (!form) return; // يتأكد إن الصفحة فيها هذا الفورم قبل تشغيل الكود

  const emailInput = form.email;
  const passwordInput = form.password;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.value.trim(),
          password: passwordInput.value
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      // ✅ حفظ الجلسة في localStorage
      localStorage.setItem('userEmail', emailInput.value.trim());

      alert('✅ Login successful!');
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error connecting to server');
    }
  });
});
