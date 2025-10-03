// aqil-volunteering/backend/models/userModel.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    last_ip: { type: DataTypes.STRING(45), allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'users',
    timestamps: false // منع Sequelize من إنشاء createdAt و updatedAt تلقائياً
  });

  return User;
};
