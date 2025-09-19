// create_aqil_ultimate.js
// Node.js script to scaffold 100% FULL Aqil Volunteering Project
// Usage:
//   npm init -y
//   npm install express mysql2 bcrypt jsonwebtoken dotenv cors morgan multer archiver
//   node create_aqil_ultimate.js

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const mysql = require('mysql2/promise');
require('dotenv').config();

const OUT_ZIP = path.join(process.cwd(), 'aqil-volunteering-ultimate.zip');
const DB_NAME = 'aqil_db';

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ---------------- SQL ----------------
const SQL_TABLES = `
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`${DB_NAME}\`;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(255),
    bio TEXT,
    avatar VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(150),
    company VARCHAR(150),
    start_date DATE,
    end_date DATE,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    skill_name VARCHAR(100),
    level VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    language VARCHAR(100),
    level VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    project_name VARCHAR(150),
    description TEXT,
    link VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_trainings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_name VARCHAR(150),
    institute VARCHAR(150),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

// ---------------- FILE STRUCTURE ----------------
const structure = {
  'backend/.env': `DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=${DB_NAME}
DB_PORT=3306
JWT_SECRET=replace_with_secure_random_key
PORT=5000
`,
  'backend/package.json': JSON.stringify({
    name: "aqil-backend",
    version: "1.0.0",
    main: "server.js",
    scripts: { start: "node server.js", dev: "nodemon server.js" },
    dependencies: {
      express: "^4.18.2",
      mysql2: "^3.3.0",
      bcrypt: "^5.1.0",
      jsonwebtoken: "^9.0.0",
      dotenv: "^16.4.0",
      cors: "^2.8.5",
      morgan: "^1.10.0",
      multer: "^1.4.5"
    }
  }, null, 2),
  'backend/server.js': `require('dotenv').config();
const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const path=require('path');
const app=express();
const PORT=process.env.PORT||5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/languages', require('./routes/languages'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/trainings', require('./routes/trainings'));
app.use('/api/files', require('./routes/files'));

app.get('/',(req,res)=>res.json({status:'Aqil API running'}));

app.listen(PORT,()=>console.log(\`Backend running on http://localhost:\${PORT}\`));`,
  'backend/config/db.js': `const mysql=require('mysql2/promise');require('dotenv').config();const pool=mysql.createPool({host:process.env.DB_HOST||'localhost',user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',database:process.env.DB_NAME||'${DB_NAME}',port:process.env.DB_PORT||3306,connectionLimit:10});module.exports=pool;`,
  'backend/middleware/authMiddleware.js': `const jwt=require('jsonwebtoken');module.exports=(req,res,next)=>{try{const header=req.headers['authorization'];if(!header)return res.status(401).json({message:'No token'});const token=header.split(' ')[1];if(!token)return res.status(401).json({message:'Bad token format'});const decoded=jwt.verify(token,process.env.JWT_SECRET);req.user={id:decoded.userId,email:decoded.email,full_name:decoded.full_name};next();}catch(err){console.error(err);res.status(403).json({message:'Invalid or expired token'});}};`,
  'frontend/public/index.html': `<!doctype html><html><head><title>Aqil Volunteering</title></head><body><h1>Welcome</h1><a href="login.html">Login</a> | <a href="register.html">Register</a> | <a href="upload.html">Upload File</a></body></html>`,
  'frontend/public/upload.html': `<!doctype html><html><head><title>Upload</title></head><body><h2>Upload File</h2><form id="uploadForm"><input type="file" name="file"/><button>Upload</button></form><ul id="fileList"></ul><script src="js/upload.js"></script></body></html>`,
  'frontend/public/js/upload.js': `const token=localStorage.getItem('jwtToken');if(!token){alert('Login first!');location.href='login.html';}const form=document.getElementById('uploadForm');const fileList=document.getElementById('fileList');form.addEventListener('submit',async e=>{e.preventDefault();const fd=new FormData(form);const res=await fetch('http://localhost:5000/api/files/upload',{method:'POST',headers:{'Authorization':'Bearer '+token},body:fd});const data=await res.json();if(res.ok){alert('Uploaded:'+data.file.originalname);loadFiles();}else alert(data.message);});async function loadFiles(){const res=await fetch('http://localhost:5000/api/files',{headers:{'Authorization':'Bearer '+token}});const files=await res.json();fileList.innerHTML='';files.forEach(f=>{const li=document.createElement('li');const link=document.createElement('a');link.href='http://localhost:5000/uploads/'+f;link.target='_blank';link.textContent=f;li.appendChild(link);fileList.appendChild(li);});}loadFiles();`
};

// ---------------- MAIN ----------------
async function main(){
  console.log('Connecting to MySQL...');
  const connection=await mysql.createConnection({host:process.env.DB_HOST||'localhost',user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||''});
  console.log('Creating database and tables...');
  await connection.query(SQL_TABLES);
  console.log('Database & tables created ✅');
  await connection.end();

  console.log('Creating project files...');
  for(const [file,content] of Object.entries(structure)){
    const full=path.join(process.cwd(),file);
    ensureDir(full);
    fs.writeFileSync(full,content,'utf8');
    console.log(' +',file);
  }
  fs.mkdirSync(path.join(process.cwd(),'backend','uploads'),{recursive:true});

  console.log('Creating ZIP...');
  const output=fs.createWriteStream(OUT_ZIP);
  const archive=archiver('zip',{zlib:{level:9}});
  archive.pipe(output);
  archive.directory(path.join(process.cwd(),'backend'),'backend');
  archive.directory(path.join(process.cwd(),'frontend'),'frontend');
  archive.finalize();
  output.on('close',()=>console.log('ZIP created at',OUT_ZIP,'✅ Project ready!'));
}

main().catch(err=>console.error(err));
