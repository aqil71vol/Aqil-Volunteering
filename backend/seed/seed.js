// aqil-volunteering/backend/seed/seed.js
const db = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// Seeder الخاص بالـ DataEntries مع Faker
const seedDataEntries = require('./dataEntry');

async function seed() {
  try {
    // إعادة إنشاء الجداول (للتطوير فقط)
    await db.sequelize.sync({ force: true });

    // إنشاء مستخدم تجريبي
    const passwordHash = await bcrypt.hash('12345678', 10);
    const user = await db.User.create({
      email: 'aqil@example.com',
      password: passwordHash,
      last_ip: '127.0.0.1',
    });

    // Info
    await db.Info.create({
      userId: user.id,
      national_id: '1',
      full_name: 'Aqil Tester',
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
      profile_image: 'a.jpg',
      last_ip: '127.0.0.1'
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
      type: 'Skill',
      last_ip: '127.0.0.1'
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
      userId: user.id,
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
      userId: user.id,
      course_name: 'Node.js Bootcamp',
      provider: 'Udemy',
      start_date: '2019-06-01',
      end_date: '2019-06-30',
      certificate_url: 'http://example.com/cert.pdf',
      description: 'Learned Node.js backend development',
      last_ip: '127.0.0.1'
    });

    // File (اختياري: يجب وجود مجلد uploads)
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
    fs.writeFileSync(path.join(uploadsDir, 'test.txt'), 'This is a test file.');

    await db.File.create({
      userId: user.id,
      file_name: 'test.txt',
      file_path: path.join('uploads', 'test.txt'),
      file_type: 'text/plain',
      last_ip: '127.0.0.1'
    });

    // Seeder للـ UserDataEntry + Archive مع Faker
    await seedDataEntries(user, 10); // ← يولد 10 سجلات لكل نوع

    console.log('🎉 All seed data created successfully');
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
