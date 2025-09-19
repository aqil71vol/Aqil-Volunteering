// aqil-volunteering/backend/models/skillModel.js
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    skill_name: DataTypes.STRING,
    level: DataTypes.STRING,
    type: DataTypes.STRING,
    last_ip: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'user_skills',
    timestamps: true,
    underscored: true
  });

  return Skill;
};
