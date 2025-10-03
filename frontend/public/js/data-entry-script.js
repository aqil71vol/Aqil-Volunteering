// aqil-volunteering/frontend/public/js/data-entry-script.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    showToast('login_failed', 'error');
    window.location.href = "../login.html";
    return;
  }

  const API_BASE = "http://localhost:5000/api";
  const tableBody = document.getElementById("tableBody");
  const searchInput = document.getElementById("searchInput");
  let entries = [];

  const fetchAPI = async (url, options = {}) => {
    options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Load user info
  const loadUser = async () => {
    try {
      const data = await fetchAPI(`${API_BASE}/info/me`);
      document.getElementById("full_name_display").innerText = data.full_name || "User Name";
      const profileImg = document.getElementById("profileImage");
      profileImg.src = data.profile_image ? `http://localhost:5000${data.profile_image}` : "/uploads/default.png";
    } catch (err) {
      console.error(err);
    }
  };

  // Load all entries
  const loadEntries = async () => {
    try {
      entries = await fetchAPI(`${API_BASE}/data_entries`);
      renderTable(entries);
    } catch (err) {
      console.error(err);
    }
  };

  // Render table
  const renderTable = (data) => {
    tableBody.innerHTML = "";
    data.forEach(e => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${e.full_name || ""}</td>
        <td>${e.email || ""}</td>
        <td>${e.national_id || ""}</td>
        <td>${e.dob || ""}</td>
        <td>${e.gender || ""}</td>
        <td>${e.nationality || ""}</td>
        <td>${e.country || ""}</td>
        <td>${e.previous_address || ""}</td>
        <td>${e.current_address || ""}</td>
        <td>${e.mobile || ""}</td>
        <td>${e.phone || ""}</td>
        <td>
          <button class="edit-btn" data-id="${e.id}" data-translate="edit">Edit</button>
          <button class="delete-btn" data-id="${e.id}" data-type="soft" data-translate="delete_soft">Soft Delete</button>
          <button class="delete-btn" data-id="${e.id}" data-type="hard" data-translate="delete_hard">Hard Delete</button>
          <button class="restore-btn" data-id="${e.id}" data-translate="restore">Restore</button>
        </td>`;
      tableBody.appendChild(tr);
    });
  };

  // Search filter
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    renderTable(entries.filter(e => Object.values(e).some(val => (val || "").toString().toLowerCase().includes(q))));
  });

  // Submit form
  document.getElementById("entryForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fields = ["full_name","email","national_id","mother_name","dob","gender","nationality","country","previous_address","current_address","marital_status","family_members","mobile","phone","bio","experiences","courses","skills","languages"];
    
    // Validate required fields
    for (let f of fields) {
      const el = document.getElementById(f);
      if (!el || el.value.trim() === "") {
        showToast(`Field "${f}" is required!`, 'error');
        el && el.focus();
        return;
      }
    }

    // Email validation
    const email = document.getElementById("email").value;
    if (!validateEmail(email)) {
      showToast('save_failed', 'error');
      document.getElementById("email").focus();
      return;
    }

    const payload = {};
    fields.forEach(f => { payload[f] = document.getElementById(f).value; });

    const entry_id = document.getElementById("entry_id").value;
    try {
      const url = entry_id ? `${API_BASE}/data_entries/${entry_id}` : `${API_BASE}/data_entries`;
      const method = entry_id ? "PUT" : "POST";
      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      document.getElementById("entryForm").reset();
      document.getElementById("entry_id").value = "";
      await loadEntries();
      showToast('save_success', 'success');
    } catch (err) {
      console.error(err);
      showToast('save_failed', 'error');
    }
  });

  // Table buttons (Edit, Delete, Restore)
  tableBody.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    const type = btn.dataset.type;

    // Edit
    if (btn.classList.contains("edit-btn")) {
      const entry = entries.find(x => x.id == id);
      if (entry) {
        Object.keys(entry).forEach(k => {
          const el = document.getElementById(k);
          if (el && entry[k] !== undefined && entry[k] !== null) el.value = entry[k];
        });
      }
      document.getElementById("entry_id").value = id;
    }

    // Delete
    if (btn.classList.contains("delete-btn")) {
      if (!confirm("Do you want to delete this entry?")) return;

      try {
        if (type === "hard") {
          await fetch(`${API_BASE}/data_entries/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
          entries = entries.filter(e => e.id != id);
          renderTable(entries);
          showToast('delete_success', 'success');
        } else if (type === "soft") {
          await fetch(`${API_BASE}/data_entries/${id}/soft_delete`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
          await loadEntries();
          showToast('delete_success', 'success');
        }
      } catch (err) {
        console.error(err);
        showToast('delete_failed', 'error');
      }
    }

    // Restore
    if (btn.classList.contains("restore-btn")) {
      if (!confirm("Do you want to restore this entry?")) return;
      try {
        await fetch(`${API_BASE}/data_entries/${id}/restore`, { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
        await loadEntries();
        showToast('save_success', 'success');
      } catch (err) {
        console.error(err);
        showToast('save_failed', 'error');
      }
    }
  });

  // CSV download
  document.getElementById("downloadCSV").addEventListener("click", () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Full Name,Email,National ID,Mother Name,DOB,Gender,Nationality,Country,Previous Address,Current Address,Marital Status,Family Members,Mobile,Phone,Bio,Experiences,Courses,Skills,Languages\r\n";
    entries.forEach(e => {
      csvContent += `${e.full_name || ""},${e.email || ""},${e.national_id || ""},${e.mother_name || ""},${e.dob || ""},${e.gender || ""},${e.nationality || ""},${e.country || ""},${e.previous_address || ""},${e.current_address || ""},${e.marital_status || ""},${e.family_members || ""},${e.mobile || ""},${e.phone || ""},${e.bio || ""},${e.experiences || ""},${e.courses || ""},${e.skills || ""},${e.languages || ""}\r\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_entries.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('save_success', 'success');
  });

  // PDF preview
  document.getElementById("previewPDF").addEventListener("click", async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Data Entries", 20, 20);
    let y = 30;
    entries.forEach(e => {
      doc.text(`Name: ${e.full_name || ""}`, 20, y); y += 10;
      doc.text(`Email: ${e.email || ""}`, 20, y); y += 10;
      doc.text(`National ID: ${e.national_id || ""}`, 20, y); y += 10;
      doc.text(`Mother Name: ${e.mother_name || ""}`, 20, y); y += 10;
      doc.text(`DOB: ${e.dob || ""}`, 20, y); y += 10;
      doc.text(`Gender: ${e.gender || ""}`, 20, y); y += 10;
      doc.text(`Nationality: ${e.nationality || ""}`, 20, y); y += 10;
      doc.text(`Country: ${e.country || ""}`, 20, y); y += 10;
      doc.text(`Previous Address: ${e.previous_address || ""}`, 20, y); y += 10;
      doc.text(`Current Address: ${e.current_address || ""}`, 20, y); y += 10;
      doc.text(`Marital Status: ${e.marital_status || ""}`, 20, y); y += 10;
      doc.text(`Family Members: ${e.family_members || ""}`, 20, y); y += 10;
      doc.text(`Mobile: ${e.mobile || ""}`, 20, y); y += 10;
      doc.text(`Phone: ${e.phone || ""}`, 20, y); y += 10;
      doc.text(`Bio: ${e.bio || ""}`, 20, y); y += 10;
      doc.text(`Experiences: ${e.experiences || ""}`, 20, y); y += 10;
      doc.text(`Courses: ${e.courses || ""}`, 20, y); y += 10;
      doc.text(`Skills: ${e.skills || ""}`, 20, y); y += 10;
      doc.text(`Languages: ${e.languages || ""}`, 20, y); y += 10;
      y += 10;
    });
    doc.save("data_entries.pdf");
    showToast('save_success', 'success');
  });

  loadUser();
  loadEntries();
});
