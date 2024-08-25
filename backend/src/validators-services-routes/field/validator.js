const messages = require('../../response/message')
const statusCodes = require('../../response/statusCode')

const validator = {}

validator.createField = async (req, res, next) => {
  if (req.body.name == undefined || req.body.name == null) {
    res.status(400).json({
      status: statusCodes.BAD_REQUEST,
      message: messages.fieldRequired.replace('###', 'name'),
    })
  }
  next()
}

module.exports = validator
