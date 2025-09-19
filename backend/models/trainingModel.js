// aqil-volunteering/backend/models/trainingModel.js
module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define('Training', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    course_name: DataTypes.STRING,
    provider: DataTypes.STRING,
    certificate_url: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    description: DataTypes.TEXT,
    last_ip: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'user_trainings',
    timestamps: true,
    underscored: true
  });

  return Training;
};
