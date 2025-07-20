
const db = require('../config/db');

// ✅ إنشاء سجل جديد
exports.create = async (data) => {
  const { full_name, id_number, gender, nationality, email, phone, address } = data;
  const sql = `
    INSERT INTO data_entries 
    (full_name, id_number, gender, nationality, email, phone, address, deleted) 
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)
  `;
  await db.execute(sql, [full_name, id_number, gender, nationality, email, phone, address]);
};

// ✅ جلب كل البيانات (غير المحذوفة)
// exports.getAll = async () => {
//   const [rows] = await db.execute("SELECT * FROM data_entries WHERE deleted = 0");
//   return rows;
// };

exports.getAll = async (filters = {}, sort = {}) => {
  let sql = "SELECT * FROM data_entries WHERE deleted = 0";
  const params = [];

  // الفلترة
  if (filters.gender) {
    sql += " AND gender = ?";
    params.push(filters.gender);
  }
  if (filters.nationality) {
    sql += " AND nationality = ?";
    params.push(filters.nationality);
  }
  if (filters.q) {
    sql += ` AND (full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR id_number LIKE ?)`;
    const term = `%${filters.q}%`;
    params.push(term, term, term, term);
  }

  // الفرز
  if (sort.key && ['full_name', 'created_at'].includes(sort.key)) {
    sql += ` ORDER BY ${sort.key} ${sort.order === 'desc' ? 'DESC' : 'ASC'}`;
  } else {
    sql += " ORDER BY created_at DESC";
  }

  const [rows] = await db.execute(sql, params);
  return rows;
};


// ✅ جلب سجل واحد حسب ID
exports.getById = async (id) => {
  const [row] = await db.execute("SELECT * FROM data_entries WHERE id = ? AND deleted = 0", [id]);
  return row;
};

// ✅ تحديث سجل
exports.update = async (id, data) => {
  const { full_name, id_number, gender, nationality, email, phone, address } = data;
  const sql = `
    UPDATE data_entries 
    SET full_name = ?, id_number = ?, gender = ?, nationality = ?, email = ?, phone = ?, address = ?
    WHERE id = ? AND deleted = 0
  `;
  await db.execute(sql, [full_name, id_number, gender, nationality, email, phone, address, id]);
};

// ✅ حذف مؤقت
exports.softDelete = async (id) => {
  await db.execute("UPDATE data_entries SET deleted = 1 WHERE id = ?", [id]);
};

// ✅ استرجاع سجل محذوف
exports.restore = async (id) => {
  await db.execute("UPDATE data_entries SET deleted = 0 WHERE id = ?", [id]);
};

// ✅ حذف نهائي
exports.deletePermanently = async (id) => {
  await db.execute("DELETE FROM data_entries WHERE id = ?", [id]);
};

// ✅ البحث
exports.search = async (term) => {
  const sql = `
    SELECT * FROM data_entries 
    WHERE deleted = 0 AND (
      full_name LIKE ? OR
      email LIKE ? OR
      phone LIKE ? OR
      id_number LIKE ?
    )
  `;
  const searchTerm = `%${term}%`;
  const [results] = await db.execute(sql, [searchTerm, searchTerm, searchTerm, searchTerm]);
  return results;
};
