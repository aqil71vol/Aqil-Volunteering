// aqil-volunteering/backend/models/userDataEntryModel.js
module.exports = (sequelize, DataTypes) => {
  const UserDataEntry = sequelize.define('UserDataEntry', {
    created_by_user_id: { type: DataTypes.INTEGER, allowNull: false },
    target_full_name: DataTypes.STRING,
    target_email: DataTypes.STRING,
    target_national_id: DataTypes.STRING,
    mother_name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    nationality: DataTypes.STRING,
    country: DataTypes.STRING,
    previous_address: DataTypes.STRING,
    current_address: DataTypes.STRING,
    marital_status: DataTypes.STRING,
    family_members: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    bio: DataTypes.TEXT,
    profile_image: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'user_data_entries',
    timestamps: true,
    underscored: true
  });

  return UserDataEntry;
};
