// aqil-volunteering/backend/models/projectModel.js
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    user_id: { type: DataTypes.INTEGER, allowNull: false },

    project_name: DataTypes.STRING,
    role: DataTypes.STRING,
    description: DataTypes.TEXT,
    technologies: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    project_url: DataTypes.STRING,
    is_ongoing: { type: DataTypes.BOOLEAN, defaultValue: false },

    last_ip: DataTypes.STRING,
    deleted_at: DataTypes.DATE,
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'user_projects',
    timestamps: true,
    underscored: true
  });

  return Project;
};
