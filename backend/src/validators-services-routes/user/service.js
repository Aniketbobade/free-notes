const UserModel = require('./model')
const Token = require('./tokenModel')
const fileUploader = require('../../helper/fileUploader')
config = require('../../config/development')
const services = {}
const mailService = require('../../helper/emailService')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const registrationMail = require('../../mail-template/registrationMail')
const jwt = require('jsonwebtoken')
const statusCodes = require('../../response/statusCode')
const messages = require('../../response/message')
const errorLog = require('../../helper/errorLog')
const Message = require('../chat/messageModel')
services.createUser = async (req, res) => {
  try {
    const { email } = req.body
    console.log(req.body)
    const profileImage = req.files.profilePhoto
    const isAlreadyExist = await UserModel.findOne({ email })
    if (isAlreadyExist) {
      return res.status(400).json({
        status: statusCodes.BAD_REQUEST,
        message: messages.isAlreadyExist,
      })
    }
    const fileUpload = await fileUploader.uploadDocument(
      profileImage,
      config.PROFILE_PHOTOS
    )
    req.body.profileImage = fileUpload.secure_url
    const user = await UserModel.create(req.body)
    const token = crypto.randomBytes(32).toString('hex')
    const inviteLink = `${config.FRONTEND_URL}/auth/register?inviteCode=${token}&id=${user._id}`
    await Token.create({ userId: user._id, token })
    await mailService.sendInviteMail(
      email,
      'Registration Mail from FreeNote',
      registrationMail(req.body.firstName, req.body.lastName, inviteLink)
    )
    return res.status(201).json({
      status: statusCodes.CREATED,
      message: messages.resourceCreatedSuccessfully,
      result: user,
    })
  } catch (error) {
    errorLog(req, error)
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error.message,
    })
  }
}

services.setPassword = async (req, res) => {
  try {
    const { password, userId, token } = req.body
    const checkToken = await Token.findOne({ userId, token })
    if (!checkToken) return res.status(400).json({ message: 'Invalid token' })
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword, status: 'ACTIVE' },
      { new: true }
    )
      .select('-password')
      .lean()
    await Token.deleteOne({ userId, token })
    return res.status(200).json({
      status: statusCodes.OK,
      message: messages.passwordUpdate,
      result: user,
    })
  } catch (error) {
    errorLog(req, error)
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error.message,
    })
  }
}
services.login = async (req, res) => {
  try {
    const isExist = await UserModel.findOne({
      email: req.body.email,
      status: 'ACTIVE',
    })
    if (!isExist) {
      return res.status(204).json({
        status: statusCodes.NO_CONTENT,
        message: messages.userNotFound,
      })
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      isExist.password
    )
    if (!isPasswordMatch) {
      return res.status(400).json({
        status: statusCodes.BAD_REQUEST,
        message: messages.invalidPassword,
      })
    }
    isExist.password = undefined
    const token = jwt.sign({ user: isExist }, config.JWT_SECRET_KEY, {
      expiresIn: '1d',
    })
    res.setHeader('Authorization', `Bearer ${token}`)
    return res.status(200).json({
      status: statusCodes.OK,
      message: messages.loginSuccess,
      token: token,
      user: isExist,
    })
  } catch (error) {
    errorLog(req, error)
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error,
    })
  }
}

services.userProfile = async (req, res) => {
  try {
    let id = req.user._id
    if (req.query.userId) {
      id = req.query.userId
    }
    const user = await UserModel.findById(id).lean()
    user.password = undefined
    if (user)
      return res.status(200).json({
        status: statusCodes.OK,
        message: messages.resourceRetrieveSuccessfully,
        user,
      })
    else
      return res.status(204).json({
        status: statusCodes.NO_CONTENT,
        message: messages.userNotFound,
      })
  } catch (error) {
    errorLog(req, error)
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error,
    })
  }
}
services.getUsers = async (req, res) => {
  try {
    console.log(req.user)
    const list = await UserModel.find({
      _id: { $nin: [req.user._id] },
    }).lean()
    return res.status(200).json({
      status: statusCodes.OK,
      message: messages.resourceRetrieveSuccessfully,
      result: list,
    })
  } catch (error) {
    errorLog(req, error)
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error,
    })
  }
}
services.getMessages = async (req, res) => {
  try {
    const userId = req.params.userId
    const chatMessages = await Message.find(
      { receivers: userId },
      { sender: 1, senderName: 1, content: 1, receivers: 1 }
    ).exec()
    if (chatMessages.length) {
      return res.status(200).json({
        status: statusCodes.OK,
        message: messages.resourceRetrieveSuccessfully,
        result: chatMessages,
      })
    } else {
      return res.status(200).json({
        status: statusCodes.NOT_FOUND,
        message: messages.resourceNotFound,
      })
    }
  } catch (error) {
    errorLog(req, error)
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error,
    })
  }
}

services.getUsersById = async (req, res) => {
  try {
    const result = await UserModel.findById(req.params.id, {
      password: 0,
    }).lean()
    if (result) {
      return res.status(200).json({
        status: statusCodes.OK,
        message: messages.resourceRetrieveSuccessfully,
        result: result,
      })
    } else {
      return res.status(200).json({
        status: statusCodes.NOT_FOUND,
        message: messages.resourceNotFound,
      })
    }
  } catch (error) {
    errorLog(req, error)
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error,
    })
  }
}

module.exports = services
