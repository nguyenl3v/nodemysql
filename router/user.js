const express = require('express');
const router = express.Router();
const register = require('../controller/user').register;

router.post("/register", register);

module.exports = router;