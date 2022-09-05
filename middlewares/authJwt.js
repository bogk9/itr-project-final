const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const secret_key = "test";
const User = require("../database/models/user");

// Checks if user exists & is not banned.
// shouldn't it be a separate middleware func?
checkUserDBEntry = (id, req) => {
  return User.query()
  .findById(id)
  .then(result => {
    if(result && result.role !== "0") {
      req.userRole = result.role;
      return true;
    }
    return false;
  })
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "No token provided!" });
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
    checkUserDBEntry(decoded.id, req).then((result) => {
      if (result) {
        req.userId = decoded.id;
        next();
      } else return res.status(401).send({ message: "Unauthorized!" });
    });
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
