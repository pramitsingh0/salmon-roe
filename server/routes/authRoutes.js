const { createAccount } = require("../controllers/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = require("express").Router();

router.post("/signup", upload.single("avatar"), createAccount);

module.exports = router;
