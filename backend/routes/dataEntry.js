const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataEntryController");
const authMiddleware = require("../middlewares/authMiddleware"); // 🔐 استدعاء الميدل وير

// ✅ تطبيق authMiddleware على جميع الراوتات
router.use(authMiddleware);

// 🔽 نقاط النهاية
router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/search", controller.search);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.patch("/restore/:id", controller.restore);
router.delete("/trash/:id", controller.softDelete);
router.delete("/:id", controller.deletePermanently);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/dataEntryController");

// router.post("/", controller.create);
// router.get("/", controller.getAll);
// router.get("/search", controller.search);
// router.get("/:id", controller.getById);
// router.put("/:id", controller.update);
// router.patch("/restore/:id", controller.restore);
// router.delete("/trash/:id", controller.softDelete);
// router.delete("/:id", controller.deletePermanently);

// module.exports = router;
