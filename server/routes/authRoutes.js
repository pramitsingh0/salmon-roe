const { createAccount } = require("../controllers/auth");

const router = require("express").Router();

router.post("/signup", createAccount);

module.exports = router;
