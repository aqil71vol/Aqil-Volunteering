// aqil-volunteering/backend/utils/generate-password.js
const crypto = require("crypto");

// ✅ توليد كلمة مرور قوية عشوائية بطول 16 حرف
function generatePassword(length = 16) {
  return crypto.randomBytes(length)
               .toString("base64")
               .slice(0, length)
               .replace(/\+/g, "A") // استبدال بعض الرموز لتكون صالحة
               .replace(/\//g, "B");
}

const password = generatePassword();
console.log("✅ Strong Password Generated:");
console.log(password);

// node utils/generate-password.js
