// aqil-volunteering/backend/models/infoModel.js
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define('Info', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    national_id: DataTypes.STRING,
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
    profile_image: DataTypes.STRING
  }, {
    tableName: 'user_infos',
    timestamps: true,
    underscored: true
  });

  return Info;
};
