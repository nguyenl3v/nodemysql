const Sequelize = require('sequelize');
const db = require('../database/db');

module.exports = db.sequelize.define('user',{
  id:{
    type: Sequelize.INTEGER(11),
    allowNull:false,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type:Sequelize.STRING
  },
  email:{
    type:Sequelize.STRING
  },
  password:{
    type:Sequelize.STRING
  },
  dob:{
    type:Sequelize.STRING,
    defaultValue: null
  },
  created:{
    type:Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},{
  timestamps:false
})