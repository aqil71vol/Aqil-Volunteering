// aqil-volunteering/backend/utils/generate-jwt-secret.js
const crypto = require("crypto");

// ✅ توليد مفتاح JWT بطول 64 بايت (hex string)
const jwtSecret = crypto.randomBytes(64).toString("hex");

console.log("✅ JWT Secret Generated:");
console.log(jwtSecret);

// node utils/generate-jwt-secret.js
