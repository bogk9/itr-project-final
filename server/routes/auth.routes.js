const controller = require("../controllers/auth.controller");
const upload = require('../libs/upload.js')
const multer = require('multer');
const { checkSchema } = require('express-validator');
const { registrationSchema, loginSchema } = require("../middlewares/validation/schemas");

//UPLOAD IS A MULTER(...) 

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // todo: verify signup first!
  app.post("/api/auth/signup", [multer().any(), checkSchema(registrationSchema), upload], controller.signup);
  app.post("/api/auth/signin", [checkSchema(loginSchema)], controller.signin);

};
