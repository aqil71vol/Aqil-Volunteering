document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  // زر مسح كل الحقول
  const clearBtn = document.querySelector(".btn-clear");
  clearBtn.addEventListener("click", () => {
    form.reset();
  });

  // أزرار Edit: تركز على الحقل المجاور
  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      // الحصول على الحقل بجانب الزر
      const input = e.target.closest(".form-row").querySelector("input, select");
      if (input) input.focus();
    });
  });

  // أزرار Restore: يمكنك إضافة وظيفة خاصة لاستعادة القيم القديمة (هنا مجرد تنبيه)
  document.querySelectorAll(".btn-restore").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Restore functionality not implemented yet.");
    });
  });

  // أزرار Delete: تمسح محتوى الحقل المجاور
  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const input = e.target.closest(".form-row").querySelector("input, select");
      if (input) input.value = "";
    });
  });
});
