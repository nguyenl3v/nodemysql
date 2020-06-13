const Categorie = require("../models/category");
const Post = require("../models/post");
const db = require("../database/db");

module.exports.getAll = async function (req, res) {
  const categories = await Categorie.findAll({
    include:{
      model:Post,
      // where: {id: db.Sequelize.col("posts.id")}
    }
  });
  res.status(200).json(categories);
};

module.exports.createCategories = async function (req, res) {
  const { name } = req.body;
  const categorie = await Categorie.create({ name });
  res.status(201).json(categorie);
};
