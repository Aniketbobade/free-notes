const UserModel = require("./model");
const Token = require("./tokenModel");
config = require("../../config/development");
const services = {};
const mailService = require("../../helper/emailService");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const registrationMail = require("../../mail-template/registrationMail");
const jwt = require("jsonwebtoken");
services.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const isAlreadyExist = await UserModel.findOne({ email });
    if (isAlreadyExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const user = await UserModel.create(req.body);
    const token = crypto.randomBytes(32).toString("hex");
    const inviteLink = `${config.FRONTEND_URL}/auth/register?inviteCode=${token}&id=${user._id}`;
    await Token.create({ userId: user._id, token });
    mailService.sendInviteMail(
      email,
      "Registration Mail from FreeNote",
      registrationMail(req.body.firstName, req.body.lastName, inviteLink)
    );
    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

services.setPassword = async (req, res) => {
  try {
    const { password, userId, token } = req.body;
    const checkToken = await Token.findOne({ userId, token });
    if (!checkToken) return res.status(400).json({ message: "Invalid token" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword, status: "ACTIVE" },
      { new: true }
    ).lean();
    await Token.deleteOne({ userId, token });
    return res
      .status(200)
      .json({ message: "Password updated successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};
services.login = async (req, res) => {
  try {
    const isExist = await UserModel.findOne({
      email: req.body.email,
      status: "ACTIVE",
    });
    if (!isExist) {
      return res.status(400).json({ message: "User not exist" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      isExist.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    isExist.password = undefined;
    const token = jwt.sign({ user: isExist }, config.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({ success:true,message: "User login successfully", token:token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

services.userProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).lean();
    user.password = undefined;
    return res.status(200).json({ message: "User profile", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

module.exports = services;
