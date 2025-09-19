// aqil-volunteering/backend/models/userModel
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    full_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    last_ip: { type: DataTypes.STRING, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, { tableName: 'users' }); // الجدول في DB يبقى بالجمع

  return User;
};
