// aqil-volunteering/backend/models/dataEntryModel.js
module.exports = (sequelize, DataTypes) => {
  const DataEntry = sequelize.define('DataEntry', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {  // مطابق للقاعدة
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'   // 🔑 يخلي Sequelize يستخدم نفس اسم العمود
    },
    full_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    national_id: { type: DataTypes.STRING },
    mother_name: { type: DataTypes.STRING },
    dob: { type: DataTypes.DATE },
    gender: { type: DataTypes.ENUM('Female', 'Male', 'Other') },
    nationality: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    previous_address: { type: DataTypes.STRING },
    current_address: { type: DataTypes.STRING },
    marital_status: { type: DataTypes.STRING },
    family_members: { type: DataTypes.INTEGER, defaultValue: 0 },
    mobile: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    experiences: { type: DataTypes.TEXT },
    courses: { type: DataTypes.TEXT },
    skills: { type: DataTypes.TEXT },
    languages: { type: DataTypes.TEXT },
    last_ip: { type: DataTypes.STRING },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    created_by_name: { type: DataTypes.STRING }, // اسم المستخدم الذي أنشأ السجل
  }, {
    tableName: 'user_data_entries',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true, // يدعم deleted_at
    deletedAt: 'deleted_at',
  });

  DataEntry.associate = (models) => {
    DataEntry.belongsTo(models.User, { 
      foreignKey: 'user_id',   // اسم العمود الصحيح
      targetKey: 'id',
      as: 'user'
    });
  };

  return DataEntry;
};
