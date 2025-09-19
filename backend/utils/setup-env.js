// aqil-volunteering/backend/utils/setup-env.js
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ============================
// توليد JWT_SECRET وكلمة مرور قوية
// ============================
const jwtSecret = crypto.randomBytes(64).toString("hex");

// كلمة مرور عشوائية قوية بطول 16 حرف
function generatePassword(length = 16) {
  return crypto.randomBytes(length)
               .toString("base64")
               .slice(0, length)
               .replace(/\+/g, "A")
               .replace(/\//g, "B");
}
const strongPassword = generatePassword();

// ============================
// تحديث ملف .env
// ============================
const envPath = path.join(__dirname, "..", ".env");

if (!fs.existsSync(envPath)) {
  console.error("❌ .env file not found at:", envPath);
  process.exit(1);
}

// قراءة محتوى .env الحالي
let envContent = fs.readFileSync(envPath, "utf-8");

// استبدال أو إضافة القيم
envContent = envContent.replace(/^DB_PASSWORD=.*$/m, `DB_PASSWORD=${strongPassword}`);
if (/^JWT_SECRET=.*$/m.test(envContent)) {
  envContent = envContent.replace(/^JWT_SECRET=.*$/m, `JWT_SECRET=${jwtSecret}`);
} else {
  envContent += `\nJWT_SECRET=${jwtSecret}`;
}

// كتابة الملف
fs.writeFileSync(envPath, envContent, "utf-8");

console.log("✅ .env updated successfully!");
console.log("Generated DB_PASSWORD:", strongPassword);
console.log("Generated JWT_SECRET:", jwtSecret);

// node utils/setup-env.js
