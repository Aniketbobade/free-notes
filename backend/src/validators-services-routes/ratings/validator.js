const messages = require("../../response/message");
const statusCodes = require("../../response/statusCode");

const validator = {};

validator.addRating = async (req, res, next) => {
  try {
    const { rating, documentId } = req.body;
    if (!rating || !documentId) {
      return res.status(400).json({
        status: statusCodes.BAD_REQUEST,
        message: messages.allFieldsRequired,
      });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({
          status: statusCodes.BAD_REQUEST,
          message: messages.ratingLimit,
        });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error.message,
    });
  }
};

module.exports = validator;