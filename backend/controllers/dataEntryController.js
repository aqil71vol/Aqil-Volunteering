const DataEntry = require("../models/dataEntryModel");

exports.create = async (req, res) => {
  try {
    await DataEntry.create(req.body);
    res.status(201).json({ message: "تم حفظ البيانات بنجاح" });
  } catch (err) {
    res.status(500).json({ message: "خطأ في الإدخال", error: err });
  }
};

exports.getAll = async (req, res) => {
  try {
    const rows = await DataEntry.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const row = await DataEntry.getById(req.params.id);
    if (!row || row.length === 0) {
      return res.status(404).json({ message: "لا يوجد سجل" });
    }
    res.json(row[0]);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.update = async (req, res) => {
  try {
    await DataEntry.update(req.params.id, req.body);
    res.json({ message: "تم التحديث" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.softDelete = async (req, res) => {
  try {
    await DataEntry.softDelete(req.params.id);
    res.json({ message: "تم الحذف المؤقت" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.restore = async (req, res) => {
  try {
    await DataEntry.restore(req.params.id);
    res.json({ message: "تم الاسترجاع" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deletePermanently = async (req, res) => {
  try {
    await DataEntry.deletePermanently(req.params.id);
    res.json({ message: "تم الحذف النهائي" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.search = async (req, res) => {
  try {
    const results = await DataEntry.search(req.query.q);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
