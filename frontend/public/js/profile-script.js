// aqil-volunteering/frontend/public/js/profile-script.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const API_BASE = "http://localhost:5000/api";

  if (!token || !userId) {
    alert("⚠️ الرجاء تسجيل الدخول أولاً");
    window.location.href = "../login.html";
    return;
  }

  // -----------------------------
  // تحميل البيانات الشخصية
  // -----------------------------
  const loadInfoData = async () => {
    try {
      const res = await fetch(`${API_BASE}/info/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch personal info");
      const data = await res.json();

      document.getElementById("full_name").value = data.full_name || "";
      document.getElementById("email").value = data.email || "";
      document.getElementById("mother_name").value = data.mother_name || "";
      document.getElementById("dob").value = data.dob || "";
      document.getElementById("gender").value = data.gender || "";
      document.getElementById("nationality").value = data.nationality || "";
      document.getElementById("country").value = data.country || "";
      document.getElementById("previous_address").value = data.previous_address || "";
      document.getElementById("current_address").value = data.current_address || "";
      document.getElementById("marital_status").value = data.marital_status || "";
      document.getElementById("family_members").value = data.family_members || "";
      document.getElementById("phone").value = data.phone || "";
      document.getElementById("bio").value = data.bio || "";
      if (data.profile_image) document.getElementById("profileImage").src = data.profile_image;
      document.getElementById("full_name_display").innerText = data.full_name || "User Name";
    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء تحميل المعلومات الشخصية");
    }
  };

  document.getElementById("personalForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const infoData = {
      full_name: document.getElementById("full_name").value.trim(),
      mother_name: document.getElementById("mother_name").value.trim(),
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      nationality: document.getElementById("nationality").value.trim(),
      country: document.getElementById("country").value.trim(),
      previous_address: document.getElementById("previous_address").value.trim(),
      current_address: document.getElementById("current_address").value.trim(),
      marital_status: document.getElementById("marital_status").value,
      family_members: parseInt(document.getElementById("family_members").value) || 0,
      phone: document.getElementById("phone").value.trim(),
      bio: document.getElementById("bio").value.trim()
    };

    try {
      const res = await fetch(`${API_BASE}/info/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(infoData)
      });
      if (!res.ok) throw new Error("Failed to update info");
      const result = await res.json();
      alert(`✅ ${result.message}`);
      loadInfoData();
    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء حفظ المعلومات");
    }
  });

  // -----------------------------
  // التنقل بين الأقسام
  // -----------------------------
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      navButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".profile-section").forEach(sec => sec.classList.add("hidden"));
      document.getElementById(btn.dataset.target).classList.remove("hidden");
    });
  });

  // -----------------------------
  // Helper لعمل fetch مع headers
  // -----------------------------
  const fetchAPI = async (url, options = {}) => {
    options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  };

  // -----------------------------
  // ---------- EXPERIENCE --------
  // -----------------------------
  const loadExperience = async () => {
    try {
      const data = await fetchAPI(`${API_BASE}/experience/${userId}`);
      const container = document.getElementById("experience-list");
      container.innerHTML = "";
      data.forEach(exp => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <strong>${exp.company_name} (${exp.start_date} - ${exp.end_date || 'Present'})</strong>
          <p>${exp.role}</p>
          <p>${exp.description || ''}</p>
          <button class="edit-exp" data-id="${exp.id}"><i class="fa fa-edit"></i></button>
          <button class="delete-exp" data-id="${exp.id}"><i class="fa fa-trash"></i></button>
        `;
        container.appendChild(div);
      });

      // أزرار الحذف
      container.querySelectorAll(".delete-exp").forEach(btn => {
        btn.addEventListener("click", async () => {
          if (!confirm("هل تريد حذف الخبرة؟")) return;
          try {
            await fetchAPI(`${API_BASE}/experience/${btn.dataset.id}`, { method: "DELETE" });
            alert("✅ تم الحذف");
            loadExperience();
          } catch (err) {
            console.error(err);
            alert("❌ خطأ أثناء الحذف");
          }
        });
      });

      // أزرار التعديل (يمكن فتح نافذة منبثقة أو استخدام prompt)
      container.querySelectorAll(".edit-exp").forEach(btn => {
        btn.addEventListener("click", async () => {
          const expData = data.find(e => e.id == btn.dataset.id);
          const role = prompt("Role", expData.role) || expData.role;
          const company_name = prompt("Company Name", expData.company_name) || expData.company_name;
          const description = prompt("Description", expData.description) || expData.description;

          try {
            await fetchAPI(`${API_BASE}/experience/${btn.dataset.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ role, company_name, description })
            });
            alert("✅ تم التعديل");
            loadExperience();
          } catch (err) {
            console.error(err);
            alert("❌ خطأ أثناء التعديل");
          }
        });
      });

    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء تحميل الخبرات");
    }
  };

  document.getElementById("addExperience").addEventListener("click", async () => {
    const role = prompt("Role:");
    const company_name = prompt("Company Name:");
    const start_date = prompt("Start Date (YYYY-MM-DD):");
    const end_date = prompt("End Date (YYYY-MM-DD) or leave blank:");
    const description = prompt("Description:");

    try {
      await fetchAPI(`${API_BASE}/experience/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, company_name, start_date, end_date, description })
      });
      alert("✅ تم الإضافة");
      loadExperience();
    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء الإضافة");
    }
  });

  // -----------------------------
  // ---------- PROJECTS ----------
  // -----------------------------
  const loadProjects = async () => {
    try {
      const data = await fetchAPI(`${API_BASE}/project/${userId}`);
      const container = document.getElementById("projects-list");
      container.innerHTML = "";
      data.forEach(proj => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <strong>${proj.project_name} (${proj.start_date} - ${proj.end_date || 'Present'})</strong>
          <p>${proj.role}</p>
          <p>${proj.description || ''}</p>
          <button class="edit-proj" data-id="${proj.id}"><i class="fa fa-edit"></i></button>
          <button class="delete-proj" data-id="${proj.id}"><i class="fa fa-trash"></i></button>
        `;
        container.appendChild(div);
      });

      container.querySelectorAll(".delete-proj").forEach(btn => {
        btn.addEventListener("click", async () => {
          if (!confirm("هل تريد حذف المشروع؟")) return;
          try {
            await fetchAPI(`${API_BASE}/project/${btn.dataset.id}`, { method: "DELETE" });
            alert("✅ تم الحذف");
            loadProjects();
          } catch (err) { console.error(err); alert("❌ خطأ أثناء الحذف"); }
        });
      });

      container.querySelectorAll(".edit-proj").forEach(btn => {
        btn.addEventListener("click", async () => {
          const projData = data.find(p => p.id == btn.dataset.id);
          const project_name = prompt("Project Name", projData.project_name) || projData.project_name;
          const role = prompt("Role", projData.role) || projData.role;
          const description = prompt("Description", projData.description) || projData.description;

          try {
            await fetchAPI(`${API_BASE}/project/${btn.dataset.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ project_name, role, description })
            });
            alert("✅ تم التعديل");
            loadProjects();
          } catch (err) { console.error(err); alert("❌ خطأ أثناء التعديل"); }
        });
      });

    } catch (err) { console.error(err); alert("❌ خطأ أثناء تحميل المشاريع"); }
  };

  document.getElementById("addProject").addEventListener("click", async () => {
    const project_name = prompt("Project Name:");
    const role = prompt("Role:");
    const description = prompt("Description:");
    const start_date = prompt("Start Date (YYYY-MM-DD):");
    const end_date = prompt("End Date (YYYY-MM-DD) or leave blank:");

    try {
      await fetchAPI(`${API_BASE}/project/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_name, role, start_date, end_date, description })
      });
      alert("✅ تم الإضافة");
      loadProjects();
    } catch (err) { console.error(err); alert("❌ خطأ أثناء الإضافة"); }
  });

  // -----------------------------
  // ---------- TRAININGS ---------
  // -----------------------------
  const loadTrainings = async () => {
    try {
      const data = await fetchAPI(`${API_BASE}/training/${userId}`);
      const container = document.getElementById("courses-list");
      container.innerHTML = "";
      data.forEach(t => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <strong>${t.title} (${t.date})</strong>
          <p>${t.organization}</p>
          <p>${t.description || ''}</p>
          <button class="edit-training" data-id="${t.id}"><i class="fa fa-edit"></i></button>
          <button class="delete-training" data-id="${t.id}"><i class="fa fa-trash"></i></button>
        `;
        container.appendChild(div);
      });

      container.querySelectorAll(".delete-training").forEach(btn => {
        btn.addEventListener("click", async () => {
          if (!confirm("هل تريد حذف الدورة؟")) return;
          try { await fetchAPI(`${API_BASE}/training/${btn.dataset.id}`, { method: "DELETE" }); loadTrainings(); alert("✅ تم الحذف"); }
          catch (err) { console.error(err); alert("❌ خطأ أثناء الحذف"); }
        });
      });

      container.querySelectorAll(".edit-training").forEach(btn => {
        btn.addEventListener("click", async () => {
          const tData = data.find(t => t.id == btn.dataset.id);
          const title = prompt("Title", tData.title) || tData.title;
          const organization = prompt("Organization", tData.organization) || tData.organization;
          const description = prompt("Description", tData.description) || tData.description;
          try {
            await fetchAPI(`${API_BASE}/training/${btn.dataset.id}`, {
              method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, organization, description })
            });
            loadTrainings();
            alert("✅ تم التعديل");
          } catch (err) { console.error(err); alert("❌ خطأ أثناء التعديل"); }
        });
      });

    } catch (err) { console.error(err); alert("❌ خطأ أثناء تحميل الدورات"); }
  };

  document.getElementById("addCourse").addEventListener("click", async () => {
    const title = prompt("Title:");
    const organization = prompt("Organization:");
    const date = prompt("Date (YYYY-MM-DD):");
    const description = prompt("Description:");
    try {
      await fetchAPI(`${API_BASE}/training/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, organization, date, description })
      });
      loadTrainings();
      alert("✅ تم الإضافة");
    } catch (err) { console.error(err); alert("❌ خطأ أثناء الإضافة"); }
  });

  // -----------------------------
  // ---------- SKILLS -----------
  // -----------------------------
  const loadSkills = async () => {
    try {
      const data = await fetchAPI(`${API_BASE}/skill/${userId}`);
      const container = document.getElementById("skills-list");
      container.innerHTML = "";
      data.forEach(skill => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <strong>${skill.skill_name}</strong> (${skill.level}) - ${skill.type}
          <button class="edit-skill" data-id="${skill.id}"><i class="fa fa-edit"></i></button>
          <button class="delete-skill" data-id="${skill.id}"><i class="fa fa-trash"></i></button>
        `;
        container.appendChild(div);
      });

      container.querySelectorAll(".delete-skill").forEach(btn => {
        btn.addEventListener("click", async () => {
          if (!confirm("هل تريد حذف المهارة؟")) return;
          try { await fetchAPI(`${API_BASE}/skill/${btn.dataset.id}`, { method: "DELETE" }); loadSkills(); alert("✅ تم الحذف"); }
          catch (err) { console.error(err); alert("❌ خطأ أثناء الحذف"); }
        });
      });

      container.querySelectorAll(".edit-skill").forEach(btn => {
        btn.addEventListener("click", async () => {
          const sData = data.find(s => s.id == btn.dataset.id);
          const skill_name = prompt("Skill Name", sData.skill_name) || sData.skill_name;
          const level = prompt("Level", sData.level) || sData.level;
          const type = prompt("Type", sData.type) || sData.type;
          try {
            await fetchAPI(`${API_BASE}/skill/${btn.dataset.id}`, {
              method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ skill_name, level, type })
            });
            loadSkills();
            alert("✅ تم التعديل");
          } catch (err) { console.error(err); alert("❌ خطأ أثناء التعديل"); }
        });
      });

    } catch (err) { console.error(err); alert("❌ خطأ أثناء تحميل المهارات"); }
  };

  document.getElementById("addSkill").addEventListener("click", async () => {
    const skill_name = prompt("Skill Name:");
    const level = prompt("Level:");
    const type = prompt("Type:");
    try {
      await fetchAPI(`${API_BASE}/skill/${userId}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ skill_name, level, type })
      });
      loadSkills();
      alert("✅ تم الإضافة");
    } catch (err) { console.error(err); alert("❌ خطأ أثناء الإضافة"); }
  });

  // -----------------------------
  // ---------- LANGUAGES -------
  // -----------------------------
  const loadLanguages = async () => {
    try {
      const data = await fetchAPI(`${API_BASE}/language/${userId}`);
      const container = document.getElementById("languages-list");
      container.innerHTML = "";
      data.forEach(lang => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <strong>${lang.language}</strong> (${lang.proficiency})
          <button class="edit-lang" data-id="${lang.id}"><i class="fa fa-edit"></i></button>
          <button class="delete-lang" data-id="${lang.id}"><i class="fa fa-trash"></i></button>
        `;
        container.appendChild(div);
      });

      container.querySelectorAll(".delete-lang").forEach(btn => {
        btn.addEventListener("click", async () => {
          if (!confirm("هل تريد حذف اللغة؟")) return;
          try { await fetchAPI(`${API_BASE}/language/${btn.dataset.id}`, { method: "DELETE" }); loadLanguages(); alert("✅ تم الحذف"); }
          catch (err) { console.error(err); alert("❌ خطأ أثناء الحذف"); }
        });
      });

      container.querySelectorAll(".edit-lang").forEach(btn => {
        btn.addEventListener("click", async () => {
          const lData = data.find(l => l.id == btn.dataset.id);
          const language = prompt("Language", lData.language) || lData.language;
          const proficiency = prompt("Proficiency", lData.proficiency) || lData.proficiency;
          try {
            await fetchAPI(`${API_BASE}/language/${btn.dataset.id}`, {
              method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ language, proficiency })
            });
            loadLanguages();
            alert("✅ تم التعديل");
          } catch (err) { console.error(err); alert("❌ خطأ أثناء التعديل"); }
        });
      });

    } catch (err) { console.error(err); alert("❌ خطأ أثناء تحميل اللغات"); }
  };

  document.getElementById("addLanguage").addEventListener("click", async () => {
    const language = prompt("Language:");
    const proficiency = prompt("Proficiency:");
    try {
      await fetchAPI(`${API_BASE}/language/${userId}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ language, proficiency })
      });
      loadLanguages();
      alert("✅ تم الإضافة");
    } catch (err) { console.error(err); alert("❌ خطأ أثناء الإضافة"); }
  });

  // -----------------------------
  // ---------- PROFILE PHOTO -----
  // -----------------------------
  document.getElementById("savePhoto").addEventListener("click", async () => {
    const fileInput = document.getElementById("photoUpload");
    if (!fileInput.files.length) { alert("اختر صورة أولاً"); return; }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
      const res = await fetch(`${API_BASE}/file/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error("Failed to upload photo");
      const result = await res.json();
      document.getElementById("profileImage").src = result.file.file_path;
      alert("✅ تم تحديث الصورة");
    } catch (err) {
      console.error(err);
      alert("❌ خطأ أثناء رفع الصورة");
    }
  });

  // -----------------------------
  // Load all sections initially
  // -----------------------------
  loadInfoData();
  loadExperience();
  loadProjects();
  loadTrainings();
  loadSkills();
  loadLanguages();
});
