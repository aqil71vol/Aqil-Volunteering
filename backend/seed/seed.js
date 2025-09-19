// aqil-volunteering/backend/seed/seed.js
const db = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

async function seed() {
  try {
    // إعادة إنشاء الجداول (تطوير فقط!)
    await db.sequelize.sync({ force: true });

    // إنشاء مستخدم تجريبي
    const passwordHash = await bcrypt.hash('12345678', 10);
    const user = await db.User.create({
      full_name: 'Aqil Tester',
      email: 'aqil@example.com',
      password: passwordHash,
      last_ip: '127.0.0.1',
    });

    // Info
    await db.Info.create({
      userId: user.id,
      mother_name: 'Fatima',
      dob: '1990-01-01',
      gender: 'Male',
      nationality: 'Jordanian',
      country: 'Jordan',
      previous_address: 'Amman',
      current_address: 'Amman',
      marital_status: 'Single',
      family_members: 3,
      bio: 'This is a test bio',
    });

    // Experience
    await db.Experience.create({
      userId: user.id,
      job_title: 'Software Developer',
      company_name: 'Tech Co',
      location: 'Amman',
      start_date: '2018-01-01',
      end_date: '2020-01-01',
      is_current: false,
      description: 'Worked on backend APIs',
      last_ip: '127.0.0.1'
    });

    // Skill
    await db.Skill.create({
      userId: user.id,
      skill_name: 'JavaScript',
      level: 'Advanced',
      type: 'Programming'
    });

    // Language
    await db.Language.create({
      userId: user.id,
      language: 'English',
      proficiency: 'Fluent',
      last_ip: '127.0.0.1'
    });

    // Project
    await db.Project.create({
      user_id: user.id,
      project_name: 'Volunteer App',
      role: 'Developer',
      description: 'A volunteering management app',
      technologies: 'Node.js, React',
      start_date: '2021-01-01',
      end_date: '2022-01-01',
      project_url: 'http://example.com',
      is_ongoing: false,
      last_ip: '127.0.0.1'
    });

    // Training
    await db.Training.create({
      user_id: user.id,
      title: 'Node.js Bootcamp',
      organization: 'Udemy',
      date: '2019-06-01',
      certificate_url: 'http://example.com/cert.pdf',
      description: 'Learned Node.js backend development',
      last_ip: '127.0.0.1'
    });

    // File (اختياري: يجب وجود مجلد uploads)
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
    fs.writeFileSync(path.join(uploadsDir, 'test.txt'), 'This is a test file.');

    await db.File.create({
      user_id: user.id,
      file_name: 'test.txt',
      file_path: path.join('uploads', 'test.txt'),
      file_type: 'text/plain',
      last_ip: '127.0.0.1'
    });

    console.log('✅ Seed data created successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
