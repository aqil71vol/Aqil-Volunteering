// aqil-volunteering/backend/models/fileModel.js
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    file_name: { type: DataTypes.STRING, allowNull: false },
    file_type: DataTypes.STRING,
    file_size: DataTypes.INTEGER,
    file_path: { type: DataTypes.STRING, allowNull: false },
    category: DataTypes.STRING,
    last_ip: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'user_files',
    timestamps: true,
    underscored: true
  });

  return File;
};
