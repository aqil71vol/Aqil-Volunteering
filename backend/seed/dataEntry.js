// aqil-volunteering/backend/seed/dataEntry.js
await db.UserDataEntry.create({
  created_by_user_id: user.id,
  target_full_name: 'Test Target',
  target_email: 'target@example.com',
  target_national_id: '123456789',
  mother_name: 'Sara',
  dob: '1995-05-05',
  gender: 'Female',
  nationality: 'Jordanian',
  country: 'Jordan',
  previous_address: 'Amman',
  current_address: 'Amman',
  marital_status: 'Single',
  family_members: 2,
  phone: '0791234567',
  bio: 'Test bio',
  profile_image: 'profile.jpg'
});

await db.UserDataEntryArchive.create({
  created_by_user_id: user.id,
  target_full_name: 'Archived Target',
  target_email: 'archive@example.com',
  target_national_id: '987654321',
  mother_name: 'Lina',
  dob: '1992-08-08',
  gender: 'Male',
  nationality: 'Jordanian',
  country: 'Jordan',
  previous_address: 'Zarqa',
  current_address: 'Amman',
  marital_status: 'Married',
  family_members: 4,
  phone: '0797654321',
  bio: 'Archived bio',
  profile_image: 'archive.jpg'
});
