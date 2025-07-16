// backend/models/data_entry.js

module.exports = (sequelize, DataTypes) => {
  const DataEntry = sequelize.define('data_entry', {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true  // ✅ يضيف createdAt و updatedAt تلقائيًا
  });

  return DataEntry;
};
