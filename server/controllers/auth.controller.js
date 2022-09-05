const secret_key = "test";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../database/models/user");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


exports.signup = (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    pass: bcrypt.hashSync(req.body.password, 8),
    img_url: `${process.env.AWS_URL}/${req.img_key}`,
    created_at: new Date(),
    role: 1,
  };

  User.query().insert(user).then(user => {
    res.send({ message: "User was registered successfully!" });
  })
};

exports.signin = async (req, res) => {
  let myquery = { username: req.body.username };

  User.query().findOne(myquery)
  .then(user => {
    if (!user) return res.status(404).send({ message: "User Not found." });
    if (user.role == "0") return res.status(403).send({ message: "User blocked." });
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.pass);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign({ id: user.id }, secret_key, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  })
};
