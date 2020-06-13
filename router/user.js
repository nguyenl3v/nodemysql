const express = require('express');
const router = express.Router();
const register = require('../controller/user').registerController;
const getAllUser = require('../controller/user').getAllUser;
const login = require('../controller/user').login;
const auth = require('../middleware/auth').auth;
const updateUser = require("../controller/user").updateUser;
const deleteUser = require("../controller/user").deleteUser;
const getProfile = require("../controller/user").getProfile;

router.post("/register", register);
router.get("/getalluser", getAllUser);
router.post("/login", login);
router.put("/update-user/:id",auth, updateUser);
router.put("/delete-user/:id",auth, deleteUser);
router.get("/profile",auth, getProfile);

module.exports = router;