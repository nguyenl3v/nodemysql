const express = require('express');
const getAll = require('../controller/posts').getAll;
const createPosts = require('../controller/posts').createPosts;
const router = express.Router();

router.get("/getAll", getAll);
router.post("/createPost", createPosts);

module.exports = router;