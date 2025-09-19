// aqil-volunteering/backend/seed/fullSeed.js
const db = require('../models');
const bcrypt = require('bcrypt');
const path = require('path');

async function seed() {
  try {
    // إعادة إنشاء الجداول (احذر، يحذف كل البيانات السابقة)
    await db.sequelize.sync({ force: true });

    // إنشاء مستخدم
    const passwordHash = await bcrypt.hash('12345678', 10);
    const user = await db.User.create({
      full_name: 'Aqil Tester',
      email: 'aqil@example.com',
      password: passwordHash,
      last_ip: '127.0.0.1',
    });

    // بيانات Info
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
    });

    // الخبرات
    await db.Experience.bulkCreate([
      {
        userId: user.id,
        company_name: 'Company A',
        role: 'Developer',
        start_date: '2015-01-01',
        end_date: '2017-01-01',
        description: 'Worked on backend APIs',
      },
      {
        userId: user.id,
        company_name: 'Company B',
        role: 'Senior Developer',
        start_date: '2017-02-01',
        end_date: '2020-01-01',
        description: 'Fullstack development',
      },
    ]);

    // المهارات
    await db.Skill.bulkCreate([
      { userId: user.id, skill_name: 'JavaScript', level: 'Advanced', type: 'Technical' },
      { userId: user.id, skill_name: 'Node.js', level: 'Advanced', type: 'Technical' },
    ]);

    // اللغات
    await db.Language.bulkCreate([
      { userId: user.id, language: 'English', proficiency: 'Fluent' },
      { userId: user.id, language: 'Arabic', proficiency: 'Native' },
    ]);

    // المشاريع
    await db.Project.bulkCreate([
      {
        user_id: user.id,
        project_name: 'Project Alpha',
        role: 'Lead Developer',
        description: 'A web application project',
        technologies: 'Node.js, React',
        start_date: '2019-01-01',
        end_date: '2019-06-01',
        project_url: 'http://example.com/alpha',
        is_ongoing: false,
      },
      {
        user_id: user.id,
        project_name: 'Project Beta',
        role: 'Developer',
        description: 'Mobile app project',
        technologies: 'React Native',
        start_date: '2020-01-01',
        end_date: null,
        project_url: 'http://example.com/beta',
        is_ongoing: true,
      },
    ]);

    // التدريبات
    await db.Training.bulkCreate([
      {
        user_id: user.id,
        course_name: 'Node.js Bootcamp',
        provider: 'Udemy',
        certificate_url: 'http://example.com/cert1',
        start_date: '2018-01-01',
        end_date: '2018-02-01',
        description: 'Intensive Node.js course',
      },
      {
        user_id: user.id,
        course_name: 'React Advanced',
        provider: 'Coursera',
        certificate_url: 'http://example.com/cert2',
        start_date: '2019-03-01',
        end_date: '2019-04-01',
        description: 'Advanced React topics',
      },
    ]);

    // الملفات (افتراضية)
    await db.File.create({
      user_id: user.id,
      file_name: 'profile.jpg',
      file_path: path.join(__dirname, 'dummy-profile.jpg'),
      file_type: 'image/jpeg',
    });

    console.log('✅ Full seed data created successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
