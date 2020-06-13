const { Sequelize, DataTypes,Model } = require("sequelize");
const db = require("../database/db");
const Post = require("./post");

const Categorie = db.sequelize.define("categories",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    postId: {
      type: DataTypes.UUID,
      referencesKey:"id",
      model:"posts",
      defaultValue: null,
    },
  },
  {
   timestamps:false,
  }
);

Categorie.hasMany(Post, {foreignKey: "id",sourceKey:"postId" });
Post.belongsTo(Categorie,{through:"id",sourceKey:"categoryId"});
module.exports = Categorie;
