const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const upload = require('../libs/upload.js')
const multer = require('multer');
const { checkSchema } = require('express-validator');
const { collectionSchema, itemSchema, commentSchema, likeSchema } = require("../middlewares/validation/schemas");
const checkCollOwnership = require("../middlewares/permissions/checkCollOwnership");
const checkItemOwnership = require("../middlewares/permissions/checkItemOwnership");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/post/addCollection", [authJwt.verifyToken, multer().any(), checkSchema(collectionSchema), upload], controller.addCollection);
  app.post("/api/post/addItem", [authJwt.verifyToken, multer().any(), checkSchema(itemSchema), upload], controller.addItem);
  app.post("/api/post/addComment", [authJwt.verifyToken, checkSchema(commentSchema)], controller.addComment);
  app.post("/api/post/addLike", [authJwt.verifyToken, checkSchema(likeSchema)], controller.addLike);
  app.post("/api/post/editItem", [authJwt.verifyToken, multer().any(), checkSchema(itemSchema), upload], controller.editItem);
  app.get("/api/get/userList", [authJwt.verifyToken], controller.getUserList);
  app.get("/api/get/userCollections", [authJwt.verifyToken], controller.getUserCollections);
  app.get("/api/get/collectionItems", controller.getCollectionItems);
  app.get("/api/get/availableFields", controller.getAvailableFields);
  app.get("/api/get/topics", controller.getTopics);
  app.get("/api/get/tags", controller.getTags);
  app.get("/api/get/tagsChart", controller.getTagsChart);
  app.get("/api/get/comments", controller.getComments);
  app.get("/api/get/search", controller.search);
  app.get("/api/get/itemData", controller.getItemData);
  app.put("/api/get/changeUserStatus", [authJwt.verifyToken], controller.changeUserStatus)
  app.put("/api/get/deleteUser", [authJwt.verifyToken], controller.deleteUser)
  app.put("/api/put/deleteCollection", [authJwt.verifyToken, checkCollOwnership], controller.deleteCollection);
  app.put("/api/put/deleteItem", [authJwt.verifyToken, checkItemOwnership], controller.deleteItem);

};
