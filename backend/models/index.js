// aqil-volunteering/backend/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    define: { timestamps: true, underscored: true },
  }
);

const db = {};

// استيراد جميع الموديلات التي تنتهي بـ Model.js
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('Model.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// تعريف العلاقات بين الموديلات
const { User, Info, Experience, Skill, Language, Project, Training, File, UserDataEntryArchive } = db;

User.hasOne(Info, { foreignKey: 'userId', as: 'info', onDelete: 'CASCADE' });
Info.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Experience, { foreignKey: 'userId', as: 'experiences', onDelete: 'CASCADE' });
Experience.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Skill, { foreignKey: 'userId', as: 'skills', onDelete: 'CASCADE' });
Skill.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Language, { foreignKey: 'userId', as: 'languages', onDelete: 'CASCADE' });
Language.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Project, { foreignKey: 'user_id', as: 'projects', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Training, { foreignKey: 'user_id', as: 'trainings', onDelete: 'CASCADE' });
Training.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(File, { foreignKey: 'user_id', as: 'files', onDelete: 'CASCADE' });
File.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// إضافة أرشيف البيانات
User.hasMany(UserDataEntryArchive, { foreignKey: 'created_by_user_id', as: 'archivedEntries', onDelete: 'CASCADE' });
UserDataEntryArchive.belongsTo(User, { foreignKey: 'created_by_user_id', as: 'user' });

// تصدير Sequelize والموديلات
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
