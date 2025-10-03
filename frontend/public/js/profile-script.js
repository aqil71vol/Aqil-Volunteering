// aqil-volunteering/frontend/public/js/profile-script.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const API_BASE = "http://localhost:5000/api";

  if (!token) {
    alert("⚠️ الرجاء تسجيل الدخول أولاً");
    window.location.href = "../login.html";
    return;
  }

  // -----------------------------
  // Helper function for API calls
  // -----------------------------
  const fetchAPI = async (url, options = {}) => {
    options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  };
 // -----------------------------
  // PDF Export (Preview)
  // -----------------------------
  async function previewPDF(lang) {
    const token = localStorage.getItem("jwtToken"); // أو المكان اللي بتخزن فيه التوكن

    const res = await fetch(`${API_BASE}/export/cv/${lang}/preview`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert("❌ خطأ في تحميل الملف");
      return;
    }

    // حول الاستجابة إلى Blob وافتحها
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  document.getElementById("previewPdfAr").addEventListener("click", () => {
    previewPDF("ar");
  });

  document.getElementById("previewPdfEn").addEventListener("click", () => {
    previewPDF("en");
  });

  // -----------------------------
  // Load Personal Info
  // -----------------------------
  const loadInfoData = async () => {
    try {
      const data = await fetchAPI(`${API_BASE}/info/me`);
      const fields = [
        "national_id","full_name","mother_name","dob","gender","nationality",
        "country","previous_address","current_address","marital_status","family_members",
        "phone","bio"
      ];
      fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = data[f] || "";
      });

      // Profile Image
      // عند تحميل بيانات المستخدم
      const profileImgEl = document.getElementById("profileImage");
      if (data.profile_image) {
        profileImgEl.src = `http://localhost:5000${data.profile_image}`;
      } else {
        // صورة افتراضية لو ما في صورة
        profileImgEl.src = "/uploads/profile_image/default.png";
      }

      document.getElementById("full_name_display").innerText = data.full_name || "اسم المستخدم";
    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء تحميل المعلومات الشخصية");
    }
  };

  // -----------------------------
  // Save Personal Info & Profile Image
  // -----------------------------
  document.getElementById("personalForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("national_id", national_id.value.trim());
    formData.append("full_name", full_name.value.trim());
    formData.append("mother_name", mother_name.value.trim());
    formData.append("dob", dob.value);
    formData.append("gender", gender.value);
    formData.append("nationality", nationality.value.trim());
    formData.append("country", country.value.trim());
    formData.append("previous_address", previous_address.value.trim());
    formData.append("current_address", current_address.value.trim());
    formData.append("marital_status", marital_status.value);
    formData.append("family_members", parseInt(family_members.value) || 0);
    formData.append("phone", phone.value.trim());
    formData.append("bio", bio.value.trim());
    if (profile_image.files[0]) formData.append("profile_image", profile_image.files[0]);

    try {
  const res = await fetch(`${API_BASE}/info/me`, {
  method: "PUT",
  headers: { Authorization: `Bearer ${token}` },
  body: formData
});
const result = await res.json();
alert(`✅ ${result.message}`);

// تحديث الصورة فورياً بعد رفعها
if (profile_image.files[0]) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const imgEl = document.getElementById("profileImage");
    imgEl.src = e.target.result;
  };
  reader.readAsDataURL(profile_image.files[0]);
}

loadInfoData();

    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء حفظ المعلومات الشخصية");
    }
  });
  
  // -----------------------------
  // Upload & List User Files
  // -----------------------------
  const loadMyFiles = async () => {
    try {
      const files = await fetchAPI(`${API_BASE}/file`);
      const container = document.getElementById("documents-list");
      container.innerHTML = "";

      files.forEach(f => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${f.file_name}</td>
          <td>${f.file_type}</td>
          <td>${Math.round(f.size/1024)}</td>
          <td>${f.category || "-"}</td>
          <td>${new Date(f.created_at).toLocaleString()}</td>
          <td>
            <button class="delete-soft" data-id="${f.id}">Soft Delete</button>
            <button class="delete-hard" data-id="${f.id}">Hard Delete</button>
          </td>
        `;

        container.appendChild(tr);

        // Soft Delete
        tr.querySelector(".delete-soft").addEventListener("click", async () => {
          if (!confirm("Do you want to temporarily delete the file?")) return;
          await fetchAPI(`${API_BASE}/file/${f.id}?mode=soft`, { method: "DELETE" });
          tr.remove();
        });

        // Hard Delete
        tr.querySelector(".delete-hard").addEventListener("click", async () => {
          if (!confirm("Do you want to delete the file permanently?")) return;
          await fetchAPI(`${API_BASE}/file/${f.id}?mode=hard`, { method: "DELETE" });
          tr.remove();
        });
      });
    } catch (err) {
      console.error("Error loading files:", err);
      alert("❌ Error loading files");
    }
  };

  document.getElementById("saveDoc").addEventListener("click", async () => {
    const fileInput = document.getElementById("docUpload");
    if (!fileInput.files.length) { alert("الرجاء اختيار ملف واحد على الأقل"); return; }

    const formData = new FormData();
    Array.from(fileInput.files).forEach(file => formData.append("file", file));

    try {
      const res = await fetch(`${API_BASE}/file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error("فشل رفع الملف");
      const result = await res.json();
      alert("✅ تم رفع الملف بنجاح");
      loadMyFiles();
    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء رفع الملف");
    }
  });

  // -----------------------------
  // Navigation
  // -----------------------------
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".profile-section").forEach(sec => sec.classList.add("hidden"));
      document.getElementById(btn.dataset.target).classList.remove("hidden");
    });
  });

  // -----------------------------
  // Generic section loader (Experience, Projects, Skills...)
  // -----------------------------
  const createCard = (titleHTML, actionsHTML) => {
    const div = document.createElement("div");
    div.classList.add("card-item");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.alignItems = "center";
    div.style.marginBottom = "8px";
    div.style.direction = "rtl";
    div.innerHTML = titleHTML + actionsHTML;
    return div;
  };

  const handleListSection = (containerId, apiEndpoint, fields, itemLabels) => {
    const container = document.getElementById(containerId);
    const load = async () => {
      try {
        const data = await fetchAPI(`${API_BASE}/${apiEndpoint}/${userId}`);
        container.innerHTML = "";
        data.forEach(item => {
          const titleHTML = `<strong>${itemLabels.map(f => item[f]).join(" - ")}</strong>`;
          const actionsHTML = `
            <button class="edit-item" data-id="${item.id}"><i class="fa fa-edit"></i></button>
            <button class="delete-item" data-id="${item.id}"><i class="fa fa-trash"></i></button>
          `;
          container.appendChild(createCard(titleHTML, actionsHTML));
        });

        // Delete
        container.querySelectorAll(".delete-item").forEach(btn => {
          btn.addEventListener("click", async () => {
            if (!confirm("هل تريد الحذف؟")) return;
            try {
              await fetchAPI(`${API_BASE}/${apiEndpoint}/${btn.dataset.id}`, { method: "DELETE" });
              btn.closest(".card-item").remove();
              alert("✅ تم الحذف");
            } catch (err) { console.error(err); alert("❌ خطأ أثناء الحذف"); }
          });
        });

        // Edit
        container.querySelectorAll(".edit-item").forEach(btn => {
          btn.addEventListener("click", async () => {
            const itemData = data.find(d => d.id == btn.dataset.id);
            const updatedData = {};

            for (const f of fields) {
              let value;

              if (f === "start_date" || f === "end_date") {
                value = prompt(`أدخل ${f} (YYYY-MM-DD)`, itemData[f] || new Date().toISOString().slice(0,10));
              } else if (f === "is_current" || f === "is_ongoing") {
                const options = ["true","false"];
                value = prompt(`أدخل ${f} (${options.join("/")})`, itemData[f] ? "true" : "false");
                value = (value.toLowerCase() === "true");
              } else if (f === "level") {
                const options = ["Beginner","Intermediate","Advanced","Expert"];
                value = prompt(`أدخل ${f} (${options.join("/")})`, itemData[f] || options[0]);
              } else if (f === "type") {
                const options = ["Skill","Hobby"];
                value = prompt(`أدخل ${f} (${options.join("/")})`, itemData[f] || options[0]);
              } else if (f === "proficiency") {
                const options = ["Basic","Intermediate","Fluent","Native"];
                value = prompt(`أدخل ${f} (${options.join("/")})`, itemData[f] || options[0]);
              } else if (f === "category") {
                const options = ["Profile","Document","Project","Other"];
                value = prompt(`أدخل ${f} (${options.join("/")})`, itemData[f] || options[0]);
              } else if (f === "certificate_url") {
                value = prompt(`أدخل ${f}`, itemData[f] || "https://");
              } else if (f === "project_url") {
                value = prompt(`أدخل ${f}`, itemData[f] || "https://");
              } else {
                value = prompt(`أدخل ${f}`, itemData[f] || "");
              }

              if (value === null) return;
              updatedData[f] = value;
            }

            try {
              await fetchAPI(`${API_BASE}/${apiEndpoint}/${btn.dataset.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
              });
              load();
              alert("✅ تم التعديل");
            } catch (err) { console.error(err); alert("❌ خطأ أثناء التعديل"); }
          });
        });
      } catch (err) { console.error(err); alert(`❌ خطأ أثناء تحميل ${containerId}`); }
    };
    return load;
  };

  // -----------------------------
  // Section loaders
  // -----------------------------
  const loadExperience = handleListSection("experience-list", "experience", ["job_title","company_name","location","start_date","end_date","description","is_current"], ["job_title","company_name","start_date","end_date"]);
  const loadProjects = handleListSection("projects-list", "project", ["project_name","role","description","technologies","start_date","end_date","project_url","is_ongoing"], ["project_name","role","start_date","end_date"]);
  const loadTrainings = handleListSection("courses-list", "training", ["course_name","provider","certificate_url","start_date","end_date","description"], ["course_name","provider","start_date","end_date"]);
  const loadSkills = handleListSection("skills-list", "skill", ["skill_name","level","type"], ["skill_name","level","type"]);
  const loadLanguages = handleListSection("languages-list", "language", ["language","proficiency"], ["language","proficiency"]);

  // -----------------------------
  // Add buttons
  // -----------------------------
  const attachAddButton = (btnId, fields, apiEndpoint, reloadFunc) => {
    document.getElementById(btnId).addEventListener("click", async () => {
      const newData = {};
      for (const f of fields) {
        let value;

        if (f === "start_date" || f === "end_date") {
          value = prompt(`أدخل ${f} (YYYY-MM-DD)`, new Date().toISOString().slice(0,10));
        } else if (f === "is_current" || f === "is_ongoing") {
          const options = ["true","false"];
          value = prompt(`أدخل ${f} (${options.join("/")})`, options[0]);
          value = (value.toLowerCase() === "true");
        } else if (f === "level") {
          const options = ["Beginner","Intermediate","Advanced","Expert"];
          value = prompt(`أدخل ${f} (${options.join("/")})`, options[0]);
        } else if (f === "type") {
          const options = ["Skill","Hobby"];
          value = prompt(`أدخل ${f} (${options.join("/")})`, options[0]);
        } else if (f === "proficiency") {
          const options = ["Basic","Intermediate","Fluent","Native"];
          value = prompt(`أدخل ${f} (${options.join("/")})`, options[0]);
        } else if (f === "category") {
          const options = ["Profile","Document","Project","Other"];
          value = prompt(`أدخل ${f} (${options.join("/")})`, options[0]);
        } else if (f === "certificate_url" || f === "project_url") {
          value = prompt(`أدخل ${f}`, "https://");
        } else {
          value = prompt(`أدخل ${f}`, "");
        }

        if (value === null) return;
        newData[f] = value;
      }

      newData.user_id = userId;
      try {
        await fetchAPI(`${API_BASE}/${apiEndpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newData)
        });
        reloadFunc();
        alert("✅ تمت الإضافة");
      } catch (err) {
        console.error(err);
        alert("❌ خطأ أثناء الإضافة");
      }
    });
  };

  attachAddButton("addExperience", ["job_title","company_name","location","start_date","end_date","description","is_current"], "experience", loadExperience);
  attachAddButton("addProject", ["project_name","role","description","technologies","start_date","end_date","project_url","is_ongoing"], "project", loadProjects);
  attachAddButton("addCourse", ["course_name","provider","certificate_url","start_date","end_date","description"], "training", loadTrainings);
  attachAddButton("addSkill", ["skill_name","level","type"], "skill", loadSkills);
  attachAddButton("addLanguage", ["language","proficiency"], "language", loadLanguages);

  // -----------------------------
  // Initialize all
  // -----------------------------
  loadInfoData();
  loadExperience();
  loadProjects();
  loadTrainings();
  loadSkills();
  loadLanguages();
  loadMyFiles();
});
