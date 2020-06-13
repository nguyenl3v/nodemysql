const Posts = require("../models/post");
const Categorie = require("../models/category");

module.exports.getAll = async function (req, res) {
  try {
    const posts = await Posts.findAll({
      include:{
        model:Categorie
      }
    },);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error,"err")
  }
}

module.exports.createPosts = async function (req, res) {
  const {title,description,categoryId} = req.body;

  const posts = await Posts.create({title,description,categoryId});

  res.status(201).json(posts);
}