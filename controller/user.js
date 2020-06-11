
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.registerController = async function (req, res){
  const created = new Date().getTime();
  const {name,email,password,dob} =  req.body;
  const user = await User.findOne({where: {email:email}});
  if(user){
    res.status(405).json({msg:"email is already"})
  }else{
    bcrypt.hash(password, 10, (err, hash)=> {
     User.create({name,email,password:hash,dob,created}).then(user => {
       res.status(201).json(user);
     }).catch(err => console.log(err,"err"));
    })
  }
}

module.exports.getAllUser = async function (req, res) {
  const user = await User.findAll({});
  res.status(200).json(user);
}