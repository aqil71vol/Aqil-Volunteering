// aqil-volunteering/backend/server.js

// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config({ path: process.env.ENV_PATH || '.env.local' });


const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models'); // index.js يحتوي على جميع الموديلات والعلاقات


// استدعاء جميع الراوترات
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const infoRoute = require('./routes/infoRoute');
const experienceRoute = require('./routes/experienceRoute');
const skillRoute = require('./routes/skillRoute');
const languageRoute = require('./routes/languageRoute');
const projectRoute = require('./routes/projectRoute');
const trainingRoute = require('./routes/trainingRoute');
const fileRoute = require('./routes/fileRoute');
const exportRoute = require('./routes/exportRoute');
const dataEntryRoute = require('./routes/dataEntryRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/uploads', express.static('uploads'));

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
app.use('/api/export', exportRoute);
app.use('/api/data_entries', dataEntryRoute);

// Health check
app.get('/', (req, res) => res.send('Aqil-Volunteering Backend is running ✅'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected ✅');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Unable to connect to database:', err));
