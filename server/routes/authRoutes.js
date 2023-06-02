const { createAccount, login, logout } = require("../controllers/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
global.XMLHttpRequest = require("xhr2");

const router = require("express").Router();

router.post("/signup", upload.single("avatar"), createAccount);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
