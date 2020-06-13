const {DataTypes,Sequelize} = require("sequelize");
const db = require("../database/db");
const Categorie = require("./category");

const Post = db.sequelize.define("posts",{
  id:{
    type: DataTypes.UUID,
    primaryKey:true,
    defaultValue:DataTypes.UUIDV4,
  },
  title:{
    type:Sequelize.STRING,
  },
  description: {
    type:Sequelize.STRING,
  },
  categoryId:{
    type: DataTypes.UUID,
    referencesKey:"id",
    model:"categories",
    defaultValue:null
  }
},{
  timestamps:false
});


module.exports = Post;