const messages = require('../../response/message')
const statusCodes = require('../../response/statusCode')
const Review = require('./model')

const service = {}

service.addReview = async (req, res) => {
  try {
    const review = {}
    review.userId = req.user._id
    review.documentId = req.body.documentId
    review.content = req.body.content
    const result = await Review.create(review)
    return res.status(201).json({
      status: statusCodes.CREATED,
      message: messages.resourceCreatedSuccessfully,
      result: result,
    })
  } catch (error) {
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error.message,
    })
  }
}

service.getReviewByDocument = async (req, res) => {
  try {
    const id = req.params.documentId
    const reviews = await Review.find({ documentId: id })
      .populate({
        path: 'userId',
        select: 'firstName lastName email',
      })
      .lean()
    if (!reviews.length) {
      return res.status(204).json({
        status: statusCodes.NO_CONTENT,
        message: messages.resourceNotFound,
      })
    }
    return res.status(200).json({
      status: statusCodes.OK,
      message: messages.resourceRetrieveSuccessfully,
      result: reviews,
    })
  } catch (error) {
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error.message,
    })
  }
}

module.exports = service
