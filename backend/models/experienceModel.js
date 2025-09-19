// aqil-volunteering/backend/models/experienceModel.js
module.exports = (sequelize, DataTypes) => {
  const Experience = sequelize.define('Experience', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    job_title: DataTypes.STRING,
    company_name: DataTypes.STRING,
    location: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    is_current: { type: DataTypes.BOOLEAN, defaultValue: false },
    description: DataTypes.TEXT,
    last_ip: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'user_experiences',
    timestamps: true,
    underscored: true
  });

  return Experience;
};

exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.Experience.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Experience.destroy({ where: { id } });
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
