const Router = require("express").Router;
const userController = require("../controllers/UserController");
const OpenAIController = require("../controllers/OpenAIController");
const router = new Router();
const { body, check } = require("express-validator");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const openAIController = new OpenAIController();

router.post(
  "/registration",
  [
    check("email").isEmail().withMessage("Please provide a valid email."),
    check("password")
      .isLength({ min: 3, max: 6 })
      .withMessage("Please provide a valid password."),
  ],

  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", AuthMiddleware, userController.getUsers);
router.get("/completion", openAIController.getAnswer.bind(openAIController));

module.exports = router;
