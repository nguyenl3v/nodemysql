const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

module.exports.registerController = async function (req, res) {
  const created = new Date().getTime();
  const { name, email, password, dob } = req.body;
  const user = await User.findAll({
    where: { [Op.or]: [{ email }, { name }] },
  });
  if (user.length > 0) {
    res.status(405).json({ msg: "email or name is already" });
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      User.create({ name, email, password: hash, dob, created })
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => console.log(err, "err"));
    });
  }
};

module.exports.login = async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    const payload = {
      id: user.id,
      email: user.email,
      dob: user.dob,
      created: user.created,
    };
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          data: payload,
        },
        process.env.secret,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user: payload, token });
    } else {
      res.status(403).json({ msg: "email or password do not match" });
    }
  } else {
    res.status(404).json({ msg: "User not found" });
  }
};

module.exports.getAllUser = async function (req, res) {
  const user = await User.findAll({});
  res.status(200).json(user);
};

module.exports.updateUser = async function (req, res) {
  const { name, password, dob } = req.body;
  const id = req.params.id;
  const user = await User.findOne({ where: { id } });
  if (user) {
    const n = !!name ? name : user.name;
    const pw = !!password ? await bcrypt.hash(password, 10) : user.password;
    const d = !!dob ? dob : user.dob;
    const u = await User.update(
      { name: n, password: pw, dob: d },
      {
        where: {
          id,
        },
      }
    );
    res.status(202).json({ msg: "updated user successfully" });
  } else {
    res.status(404).json({ msg: "updated not found" });
  }
};

module.exports.deleteUser = async function (req, res) {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });
  if (user) {
    const u = await User.update(
      { isDeleted: true },
      {
        where: {
          id,
        },
      }
    );
    res.status(203).json({ msg: "delete user successfully" });
  } else {
    res.status(404).json({ msg: "user not found" });
  }
};

module.exports.getProfile = async function (req, res) {
  const user = await User.findOne({ where: { id: req.user.data.id } });
  const payload = {
    id: user.id,
    email: user.email,
    dob: user.dob,
    created: user.created,
    isDeleted: user.isDeleted,
    created:user.created,
  }
  res.status(200).json({user:payload});
};
