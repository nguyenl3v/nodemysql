const express = require("express");
const getAll  = require("../controller/categories").getAll
const createCategories  = require("../controller/categories").createCategories
const router = express.Router();

router.get("/getAll",getAll);
router.post("/createCategori", createCategories);

module.exports = router;