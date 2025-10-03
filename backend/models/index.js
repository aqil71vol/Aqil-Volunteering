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

// ربط الموديلات
const { User, DataEntry, Info, Experience, Skill, Language, Project, Training, File } = db;

// ربط DataEntry بالمستخدم
User.hasMany(DataEntry, { foreignKey: 'userId', as: 'dataEntries', onDelete: 'CASCADE' });
DataEntry.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// باقي العلاقات كما كانت
User.hasOne(Info, { foreignKey: 'userId', as: 'infos', onDelete: 'CASCADE' });
Info.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Experience, { foreignKey: 'userId', as: 'experiences', onDelete: 'CASCADE' });
Experience.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Skill, { foreignKey: 'userId', as: 'skills', onDelete: 'CASCADE' });
Skill.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Language, { foreignKey: 'userId', as: 'languages', onDelete: 'CASCADE' });
Language.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Project, { foreignKey: 'userId', as: 'projects', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Training, { foreignKey: 'userId', as: 'trainings', onDelete: 'CASCADE' });
Training.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(File, { foreignKey: 'userId', as: 'files', onDelete: 'CASCADE' });
File.belongsTo(User, { foreignKey: 'userId', as: 'user' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
