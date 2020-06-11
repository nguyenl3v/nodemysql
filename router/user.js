const express = require('express');
const router = express.Router();
const register = require('../controller/user').registerController;
const getAllUser = require('../controller/user').getAllUser;

router.post("/register", register);
router.get("/getalluser", getAllUser);

module.exports = router;