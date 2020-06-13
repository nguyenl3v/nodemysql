const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database/db");
const PORT = process.env.PORT || 4000;
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const user = require("./router/user");
const categories = require("./router/categories");
const posts = require("./router/posts");

app.use("/api", user);
app.use("/categories", categories);
app.use("/post", posts);

db.sequelize
  .sync()
  .then(() => app.listen(PORT, () => console.log(`started on port ${PORT}`)));
