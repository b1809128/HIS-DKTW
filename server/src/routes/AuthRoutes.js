const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/AuthControllers");
const auththorize = require("../middlewares/Authentication");

router.get("/", AuthControllers.getAuthController);
router.get("/:codeAuth", AuthControllers.getAuthControllerById);
router.post("/post", AuthControllers.createAuthController);
router.post(
  "/login",
  auththorize.basicAuthorization,
  AuthControllers.loginAuthController
);
router.patch("/:codeAuth", AuthControllers.updateAuthControllerById);

module.exports = router;
