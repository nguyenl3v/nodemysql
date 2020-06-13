const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database/db");
const PORT = process.env.PORT || 4000;
require("dotenv").config();

db.sequelize.sync();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const user = require("./router/user");

app.use("/api", user);

app.listen(PORT, () => console.log(`started on port ${PORT}`));
