const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/UserDto");
const { Error } = require("mongoose");
const ApiError = require("../exceptions/ApiError");

class UserService {
  async registration(email, password, fio) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        "User has already registered with such an email"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      fio,
      email,
      password: hashedPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const { refreshToken, accessToken } = tokenService.generateTokens({
      ...userDto,
    });
    await tokenService.saveToken(userDto.id, refreshToken);

    return { refreshToken, accessToken, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("user is not found");
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw ApiError.BadRequest("Unknown user");
    }
    const passwordsAreEqual = await bcrypt.compare(
      password,
      candidate.password
    );
    if (!passwordsAreEqual) {
      throw ApiError.BadRequest("password is incorrect");
    }

    if (!candidate.isActivated) {
      throw ApiError.BadRequest("Please, confirm your account");
    }

    const userDto = new UserDto(candidate);
    const { refreshToken, accessToken } = tokenService.generateTokens({
      ...userDto,
    });
    await tokenService.saveToken(userDto.id, refreshToken);

    return { refreshToken, accessToken, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshTokenArg) {
    if (!refreshTokenArg) {
      console.log("no refreshTokenArg: ", refreshTokenArg);
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshTokenArg);
    const foundToken = await tokenService.findToken(refreshTokenArg);
    if (!userData || !foundToken) {
      console.log(
        "couldnt find userData: " + userData + "or token: " + foundToken
      );
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);

    const { refreshToken, accessToken } = tokenService.generateTokens({
      ...userDto,
    });
    await tokenService.saveToken(userDto.id, refreshToken);

    return { refreshToken, accessToken, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}
module.exports = new UserService();
