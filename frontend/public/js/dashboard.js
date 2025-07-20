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

/////////////////////////اضافات لسجل المتطوعين

document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#dataTable tbody");

  try {
    const token = localStorage.getItem("token"); // توكن المستخدم
    const response = await fetch("http://localhost:5000/api/data-entry", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("فشل في جلب البيانات");
    }

    const data = await response.json();
    data.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.id}</td>
        <td>${entry.full_name}</td>
        <td>${entry.id_number}</td>
        <td>${entry.gender}</td>
        <td>${entry.nationality}</td>
        <td>${entry.email}</td>
        <td>${entry.phone}</td>
        <td>${entry.address}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="8">⚠️ فشل تحميل البيانات</td></tr>`;
  }
});

/////////////////////////اضافات 2 لسجل المتطوعين

  async function loadData(search = "") {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // تفريغ الجدول
    const token = localStorage.getItem("token");

    const url = search 
      ? `http://localhost:5000/api/data-entry/search?q=${encodeURIComponent(search)}`
      : `http://localhost:5000/api/data-entry`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        data.forEach((entry) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td>${entry.id}</td>
            <td>${entry.full_name}</td>
            <td>${entry.id_number}</td>
            <td>${entry.gender}</td>
            <td>${entry.nationality}</td>
            <td>${entry.email}</td>
            <td>${entry.phone}</td>
            <td>${entry.address}</td>
            <td>
              <button onclick="softDelete(${entry.id})">🗑️ حذف</button>
              <button onclick="restore(${entry.id})">♻️ استرجاع</button>
              <button onclick="deletePermanently(${entry.id})">❌ حذف نهائي</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = `<tr><td colspan="9">❌ لا توجد بيانات</td></tr>`;
      }
    } catch (err) {
      console.error(err);
      tableBody.innerHTML = `<tr><td colspan="9">❌ خطأ في تحميل البيانات</td></tr>`;
    }
  }

  async function softDelete(id) {
    if (!confirm("هل أنت متأكد من الحذف المؤقت؟")) return;
    await fetch(`http://localhost:5000/api/data-entry/trash/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    loadData();
  }

  async function restore(id) {
    await fetch(`http://localhost:5000/api/data-entry/restore/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    loadData();
  }

  async function deletePermanently(id) {
    if (!confirm("⚠️ حذف نهائي لا يمكن التراجع عنه. هل أنت متأكد؟")) return;
    await fetch(`http://localhost:5000/api/data-entry/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    loadData();
  }

  
  // البحث التلقائي
  document.getElementById("searchBox").addEventListener("input", (e) => {
    loadData(e.target.value.trim());
  });

  document.addEventListener("DOMContentLoaded", () => {
    loadData();
  });


  /////////////////////////اضافات 3 لسجل المتطوعين

  async function loadData(search = "") {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // تفريغ الجدول
    const token = localStorage.getItem("token");

    const url = search 
      ? `http://localhost:5000/api/data-entry/search?q=${encodeURIComponent(search)}`
      : `http://localhost:5000/api/data-entry`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        data.forEach((entry) => {
          const row = document.createElement("tr");

          row.innerHTML = `
            <td>${entry.id}</td>
            <td>${entry.full_name}</td>
            <td>${entry.id_number}</td>
            <td>${entry.gender}</td>
            <td>${entry.nationality}</td>
            <td>${entry.email}</td>
            <td>${entry.phone}</td>
            <td>${entry.address}</td>
            <td>
              <button onclick="softDelete(${entry.id})">🗑️ حذف</button>
              <button onclick="restore(${entry.id})">♻️ استرجاع</button>
              <button onclick="deletePermanently(${entry.id})">❌ حذف نهائي</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = `<tr><td colspan="9">❌ لا توجد بيانات</td></tr>`;
      }
    } catch (err) {
      console.error(err);
      tableBody.innerHTML = `<tr><td colspan="9">❌ خطأ في تحميل البيانات</td></tr>`;
    }
  }

  async function softDelete(id) {
    if (!confirm("هل أنت متأكد من الحذف المؤقت؟")) return;
    await fetch(`http://localhost:5000/api/data-entry/trash/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    loadData();
  }

  async function restore(id) {
    await fetch(`http://localhost:5000/api/data-entry/restore/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    loadData();
  }

  async function deletePermanently(id) {
    if (!confirm("⚠️ حذف نهائي لا يمكن التراجع عنه. هل أنت متأكد؟")) return;
    await fetch(`http://localhost:5000/api/data-entry/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    loadData();
  }

  // البحث التلقائي
  document.getElementById("searchBox").addEventListener("input", (e) => {
    loadData(e.target.value.trim());
  });

  document.addEventListener("DOMContentLoaded", () => {
    loadData();
  });


  /////////////////////////اضافات 4 لسجل المتطوعي

  async function submitNew() {
  const token = localStorage.getItem("token");

  const newData = {
    full_name: document.getElementById("newFullName").value,
    id_number: document.getElementById("newIdNumber").value,
    gender: document.getElementById("newGender").value,
    nationality: document.getElementById("newNationality").value,
    email: document.getElementById("newEmail").value,
    phone: document.getElementById("newPhone").value,
    address: document.getElementById("newAddress").value,
  };

  await fetch("http://localhost:5000/api/data-entry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });

  // إعادة تحميل البيانات بعد الإضافة
  loadData();

  // تفريغ الحقول
  document.getElementById("newFullName").value = "";
  document.getElementById("newIdNumber").value = "";
  document.getElementById("newGender").value = "";
  document.getElementById("newNationality").value = "";
  document.getElementById("newEmail").value = "";
  document.getElementById("newPhone").value = "";
  document.getElementById("newAddress").value = "";
}


  /////////////////////////اضافات 5 لسجل المتطوعي

let searchTimeout;

function debounce(func, delay) {
  return function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(func, delay);
  };
}

const debouncedSearch = debounce(async () => {
  const token = localStorage.getItem("token");
  const query = document.getElementById("searchInput").value.trim();

  const url = query
    ? `http://localhost:5000/api/data-entry/search?q=${encodeURIComponent(query)}`
    : "http://localhost:5000/api/data-entry";

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  renderTable(data);
}, 500); // 500ms تأخير

// renderTable() ترسم جدول النتائج - تحتاج تكون موجودة

  /////////////////////////اضافات 6 لسجل المتطوعي


async function applyFilters() {
  const token = localStorage.getItem("token");
  const gender = document.getElementById("filterGender").value;
  const nationality = document.getElementById("filterNationality").value;
  const search = document.getElementById("searchInput").value.trim();

  // بناء الاستعلام للبحث والفلترة مع بعض
  let url = "http://localhost:5000/api/data-entry";
  const params = new URLSearchParams();

  if (search) params.append("q", search);
  if (gender) params.append("gender", gender);
  if (nationality) params.append("nationality", nationality);

  if ([...params].length > 0) {
    url += "/search?" + params.toString();
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  renderTable(data);
}


  /////////////////////////اضافات 7 لسجل المتطوعي

  async function applyFilters() {
  const token = localStorage.getItem("token");
  const gender = document.getElementById("filterGender").value;
  const nationality = document.getElementById("filterNationality").value;
  const search = document.getElementById("searchInput").value.trim();

  // بناء الاستعلام للبحث والفلترة مع بعض
  let url = "http://localhost:5000/api/data-entry";
  const params = new URLSearchParams();

  if (search) params.append("q", search);
  if (gender) params.append("gender", gender);
  if (nationality) params.append("nationality", nationality);

  if ([...params].length > 0) {
    url += "/search?" + params.toString();
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  renderTable(data);
}


  /////////////////////////اضافات 8 لسجل المت

let currentSortKey = '';
let currentSortAsc = true;

async function sortTable(key) {
  if (currentSortKey === key) {
    currentSortAsc = !currentSortAsc; // قلب الترتيب لو نفس المفتاح
  } else {
    currentSortKey = key;
    currentSortAsc = true;
  }

  const token = localStorage.getItem("token");
  const url = `http://localhost:5000/api/data-entry?sort=${currentSortKey}&order=${currentSortAsc ? 'asc' : 'desc'}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  renderTable(data);
}

  /////////////////////////اضافات 9 لسجل المت


function renderTable(data) {
  const tbody = document.getElementById("dataTableBody"); // افترض عندك tbody لهذي ID
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.full_name}</td>
      <td>${row.id_number}</td>
      <td>${row.gender}</td>
      <td>${row.nationality}</td>
      <td>${row.email}</td>
      <td>${row.phone}</td>
      <td>${row.address}</td>
      <td>
        <button onclick="editRow(${row.id})">تعديل</button>
        <button onclick="deleteRow(${row.id})">حذف</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}
