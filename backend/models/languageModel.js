// aqil-volunteering/backend/models/languageModel.js
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    language: DataTypes.STRING,
    proficiency: DataTypes.STRING,
    last_ip: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'user_languages',
    timestamps: true,
    underscored: true
  });

  return Language;
};
