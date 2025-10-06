// aqil-volunteering/backend/server.js

const fetch = require('node-fetch'); 
global.fetch = fetch; // تعريف fetch كـ global

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// ==============================
// ضبط البيئة تلقائيًا
// ==============================
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

if (!process.env.ENV_PATH) {
  process.env.ENV_PATH = process.env.NODE_ENV === 'production' ? '.env.online' : '.env.local';
}

const envPath = path.resolve(__dirname, process.env.ENV_PATH);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`🔹 Loaded environment variables from ${process.env.ENV_PATH}`);
} else {
  console.warn(`⚠️ ${process.env.ENV_PATH} not found!`);
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models'); // index.js يحتوي على جميع الموديلات والعلاقات

// استدعاء الراوترات
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

// ملفات ثابتة
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://${getLocalIP()}:${PORT}`);
    });
  })
  .catch(err => console.error('Unable to connect to database:', err));

// دالة للحصول على IP المحلي
function getLocalIP() {
  const os = require('os');
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}




// // aqil-volunteering/backend/server.js

// // require('dotenv').config();
// const fetch = require('node-fetch'); 
// global.fetch = fetch; // تعريفها كـ global حتى أي كود يستخدم fetch

// const dotenv = require('dotenv');
// dotenv.config({ path: process.env.ENV_PATH || '.env.local' });


// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const db = require('./models'); // index.js يحتوي على جميع الموديلات والعلاقات


// // استدعاء جميع الراوترات
// const authRoute = require('./routes/authRoute');
// const userRoute = require('./routes/userRoute');
// const infoRoute = require('./routes/infoRoute');
// const experienceRoute = require('./routes/experienceRoute');
// const skillRoute = require('./routes/skillRoute');
// const languageRoute = require('./routes/languageRoute');
// const projectRoute = require('./routes/projectRoute');
// const trainingRoute = require('./routes/trainingRoute');
// const fileRoute = require('./routes/fileRoute');
// const exportRoute = require('./routes/exportRoute');
// const dataEntryRoute = require('./routes/dataEntryRoute');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

// // Static files
// const path = require('path');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/auth', authRoute);
// app.use('/api/user', userRoute);
// app.use('/api/info', infoRoute);
// app.use('/api/experience', experienceRoute);
// app.use('/api/skill', skillRoute);
// app.use('/api/language', languageRoute);
// app.use('/api/project', projectRoute);
// app.use('/api/training', trainingRoute);
// app.use('/api/file', fileRoute);
// app.use('/api/export', exportRoute);
// app.use('/api/data_entries', dataEntryRoute);

// // Health check
// app.get('/', (req, res) => res.send('Aqil-Volunteering Backend is running ✅'));

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error('Global Error:', err);
//   res.status(500).json({ message: 'Internal server error', error: err.message });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// db.sequelize.authenticate()
//   .then(() => {
//     console.log('Database connected ✅');
//     // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
//   app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

//   })
//   .catch(err => console.error('Unable to connect to database:', err));
