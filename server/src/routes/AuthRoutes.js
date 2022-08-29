const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/AuthControllers");
const auththorize = require("../middlewares/Authentication");

router.get("/", AuthControllers.getAuthController);
router.post("/post", AuthControllers.createAuthController);
router.post(
  "/login",
  auththorize.basicAuthorization,
  AuthControllers.loginAuthController
);
module.exports = router;
