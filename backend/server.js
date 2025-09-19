// aqil-volunteering/backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models'); // index.js يحتوي على جميع الموديلات والعلاقات

// استدعاء جميع الراوترات (تأكد أن أسماء الملفات مفردة ومتطابقة)
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const infoRoute = require('./routes/infoRoute');
const experienceRoute = require('./routes/experienceRoute'); // مفرد
const skillRoute = require('./routes/skillRoute');           // مفرد
const languageRoute = require('./routes/languageRoute');     // مفرد
const projectRoute = require('./routes/projectRoute');       // مفرد
const trainingRoute = require('./routes/trainingRoute');     // مفرد
const fileRoute = require('./routes/fileRoute');             // مفرد
const archiveRoute = require('./routes/userDataEntryArchiveRoute'); // مفرد

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/info', infoRoute);
app.use('/api/experience', experienceRoute);
app.use('/api/skill', skillRoute);
app.use('/api/language', languageRoute);
app.use('/api/project', projectRoute);
app.use('/api/training', trainingRoute);
app.use('/api/file', fileRoute);
app.use('/api/archive', archiveRoute);

// Health check
app.get('/', (req, res) => res.send('Aqil-Volunteering Backend is running ✅'));

// Start server
const PORT = process.env.PORT || 5000;

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected ✅');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Unable to connect to database:', err));
