// aqil-volunteering/backend/models/infoModel.js
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define('Info', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },

    national_id: { type: DataTypes.STRING, allowNull: true },
    full_name: { type: DataTypes.STRING, allowNull: true },
    mother_name: { type: DataTypes.STRING, allowNull: true },
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    gender: { type: DataTypes.STRING, allowNull: true },
    nationality: { type: DataTypes.STRING, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    previous_address: { type: DataTypes.STRING, allowNull: true },
    current_address: { type: DataTypes.STRING, allowNull: true },
    marital_status: { type: DataTypes.STRING, allowNull: true },
    family_members: { type: DataTypes.INTEGER, defaultValue: 0 },
    phone: { type: DataTypes.STRING, allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    profile_image: { type: DataTypes.STRING, allowNull: true },

    last_ip: { type: DataTypes.STRING, allowNull: true },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'user_infos',
    timestamps: true,
    underscored: true
  });

  return Info;
};
