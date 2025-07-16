const express = require("express");
const router = express.Router();
const controller = require("../controllers/dataEntryController");

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/search", controller.search);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.patch("/restore/:id", controller.restore);
router.delete("/trash/:id", controller.softDelete);
router.delete("/:id", controller.deletePermanently);

module.exports = router;
