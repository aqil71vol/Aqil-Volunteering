// aqil-volunteering/backend/seed/dataEntry.js
const db = require('../models');
const { faker } = require('@faker-js/faker');

async function seedDataEntries(user, count = 5) {
  try {
    for (let i = 0; i < count; i++) {
      // 🟢 UserDataEntry عادي
      const entry = await db.UserDataEntry.create({
        created_by_user_id: user.id,
        target_full_name: faker.person.fullName(),
        target_email: faker.internet.email(),
        target_national_id: faker.string.numeric(9),
        mother_name: faker.person.firstName(),
        dob: faker.date.birthdate({ min: 1980, max: 2005, mode: 'year' }),
        gender: faker.helpers.arrayElement(['Female', 'Male', 'Other']),
        nationality: 'Jordanian',
        country: 'Jordan',
        previous_address: faker.location.city(),
        current_address: faker.location.city(),
        marital_status: faker.helpers.arrayElement(['Single', 'Married']),
        family_members: faker.number.int({ min: 1, max: 7 }),
        phone: faker.phone.number(),
        bio: faker.lorem.sentence(),
        profile_image: `${faker.word.sample()}.jpg`,
        last_ip: faker.internet.ip()
      });

      console.log(`✅ UserDataEntry created with ID: ${entry.id}`);

      // 📦 UserDataEntryArchive
      const archive = await db.UserDataEntryArchive.create({
        created_by_user_id: user.id,
        target_full_name: faker.person.fullName(),
        target_email: faker.internet.email(),
        target_national_id: faker.string.numeric(9),
        mother_name: faker.person.firstName(),
        dob: faker.date.birthdate({ min: 1975, max: 2000, mode: 'year' }),
        gender: faker.helpers.arrayElement(['Female', 'Male', 'Other']),
        nationality: 'Jordanian',
        country: 'Jordan',
        previous_address: faker.location.city(),
        current_address: faker.location.city(),
        marital_status: faker.helpers.arrayElement(['Single', 'Married']),
        family_members: faker.number.int({ min: 1, max: 7 }),
        phone: faker.phone.number(),
        bio: faker.lorem.sentence(),
        profile_image: `${faker.word.sample()}_archive.jpg`,
        last_ip: faker.internet.ip()
      });

      console.log(`📦 UserDataEntryArchive created with ID: ${archive.id}`);
    }

    console.log(`🎉 Successfully seeded ${count} entries for user ID: ${user.id}`);

  } catch (err) {
    console.error('❌ Error while seeding UserDataEntries:', err);
  }
}

module.exports = seedDataEntries;
