const userService = require("../service/userService");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/ApiError");

const MAX_AGE = 864000000; // 10 days
const COOKIE_CONFIG = {
  maxAge: MAX_AGE,
  httpOnly: true,
};

class UserController {
  async registration(req, res, next) {
    try {
      const result = validationResult(req);
      console.log("errors", result.array());
      if (!result.isEmpty()) {
        return next(
          ApiError.BadRequest("Validation errors occurred!", result.array())
        );
      }
      const { email, password, fio } = req.body;
      const userData = await userService.registration(email, password, fio);
      res.cookie("refreshToken", userData.refreshToken, COOKIE_CONFIG);

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      console.log(userData.refreshToken);
      res.cookie("refreshToken", userData.refreshToken, COOKIE_CONFIG);
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(req.cookies);
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, COOKIE_CONFIG);
      console.log(req.cookies);
      return res.json(userData);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
