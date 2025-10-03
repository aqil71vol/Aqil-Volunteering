// aqil-volunteering/backend/seed/seedFullFaker.js
const db = require('../models');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

const seedDataEntries = require('./dataEntry');

async function seedFullFaker() {
  try {
    // إعادة إنشاء الجداول (للتطوير فقط)
    await db.sequelize.sync({ force: true });

    // إنشاء مجلد uploads إذا لم يكن موجود
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

    // عدد المستخدمين المراد توليدهم
    const USERS_COUNT = 5;

    for (let i = 0; i < USERS_COUNT; i++) {
      const passwordHash = await bcrypt.hash('12345678', 10);

      // إنشاء مستخدم
      const user = await db.User.create({
        email: faker.internet.email(),
        password: passwordHash,
        last_ip: faker.internet.ip(),
      });

      // Info
      await db.Info.create({
        userId: user.id,
        national_id: faker.string.numeric(10),
        full_name: faker.person.fullName(),
        mother_name: faker.person.firstName(),
        dob: faker.date.birthdate({ min: 1970, max: 2005, mode: 'year' }),
        gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
        nationality: 'Jordanian',
        country: 'Jordan',
        previous_address: faker.location.city(),
        current_address: faker.location.city(),
        marital_status: faker.helpers.arrayElement(['Single', 'Married']),
        family_members: faker.number.int({ min: 1, max: 7 }),
        phone: faker.phone.number(),
        bio: faker.lorem.sentences(2),
        profile_image: `${faker.word.sample()}.jpg`,
        last_ip: faker.internet.ip(),
      });

      // إنشاء Experiences متعددة
      const expCount = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < expCount; j++) {
        await db.Experience.create({
          userId: user.id,
          job_title: faker.person.jobTitle(),
          company_name: faker.company.name(),
          location: faker.location.city(),
          start_date: faker.date.past({ years: 5 }),
          end_date: faker.date.recent({ days: 30 }),
          is_current: faker.datatype.boolean(),
          description: faker.lorem.sentences(2),
          last_ip: faker.internet.ip(),
        });
      }

      // إنشاء Skills متعددة
      const skillCount = faker.number.int({ min: 2, max: 5 });
      for (let j = 0; j < skillCount; j++) {
        await db.Skill.create({
          userId: user.id,
          skill_name: faker.hacker.verb(),
          level: faker.helpers.arrayElement(['Beginner','Intermediate','Advanced','Expert']),
          type: 'Skill',
          last_ip: faker.internet.ip(),
        });
      }

      // Languages
      const langCount = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < langCount; j++) {
        await db.Language.create({
          userId: user.id,
          language: faker.helpers.arrayElement(['English','Arabic','French','Spanish']),
          proficiency: faker.helpers.arrayElement(['Basic','Intermediate','Fluent','Native']),
          last_ip: faker.internet.ip(),
        });
      }

      // Projects
      const projCount = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < projCount; j++) {
        await db.Project.create({
          userId: user.id,
          project_name: faker.commerce.productName(),
          role: 'Developer',
          description: faker.lorem.sentences(2),
          technologies: 'Node.js, React',
          start_date: faker.date.past({ years: 3 }),
          end_date: faker.date.recent({ days: 30 }),
          project_url: faker.internet.url(),
          is_ongoing: faker.datatype.boolean(),
          last_ip: faker.internet.ip(),
        });
      }

      // Trainings
      const trainingCount = faker.number.int({ min: 1, max: 2 });
      for (let j = 0; j < trainingCount; j++) {
        await db.Training.create({
          userId: user.id,
          course_name: faker.company.catchPhrase(),
          provider: faker.company.name(),
          start_date: faker.date.past({ years: 2 }),
          end_date: faker.date.recent({ days: 30 }),
          certificate_url: faker.internet.url(),
          description: faker.lorem.sentence(),
          last_ip: faker.internet.ip(),
        });
      }

      // Files
      const fileCount = faker.number.int({ min: 1, max: 2 });
      for (let j = 0; j < fileCount; j++) {
        const fileName = `test_${i}_${j}.txt`;
        fs.writeFileSync(path.join(uploadsDir, fileName), faker.lorem.sentence());
        await db.File.create({
          userId: user.id,
          file_name: fileName,
          file_path: path.join('uploads', fileName),
          file_type: 'text/plain',
          last_ip: faker.internet.ip(),
        });
      }

      // UserDataEntry + Archive
      await seedDataEntries(user, 5); // ← تولد 5 سجلات لكل نوع لكل مستخدم

      console.log(`🎉 Seed completed for user ${i+1}/${USERS_COUNT}`);
    }

    console.log('✅ All users and related data seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error while seeding full data:', err);
    process.exit(1);
  }
}

seedFullFaker();
