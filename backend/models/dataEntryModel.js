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
exports.getAll = async () => {
  const [rows] = await db.execute("SELECT * FROM data_entries WHERE deleted = 0");
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
