const messages = require('../../response/message')
const statusCodes = require('../../response/statusCode')
const Like = require('./model')

const service = {}

service.addRemoveLike = async (req, res) => {
  try {
    const likeBy = req.user._id
    const documentId = req.params.documentId

    const isAlreadyLiked = await Like.findOne({ documentId, likeBy }).lean()
    if (isAlreadyLiked) {
      const result = await Like.deleteOne({ documentId, likeBy })
      return res.status(200).json({
        status: statusCodes.OK,
        message: messages.UnLiked,
        result: result,
      })
    } else {
      const newLike = new Like({ documentId, likeBy })
      const result = await newLike.save()
      return res.status(201).json({
        status: statusCodes.OK,
        message: messages.Liked,
        result: result,
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error.message,
    })
  }
}

service.getLikesByDocument = async (req, res) => {
  try {
    const id = req.params.documentId
    const likes = await Like.find({ documentId: id })
      .populate({
        path: 'likeBy',
        select: 'firstName lastName email',
      })
      .lean()
    if (!likes.length) {
      return res.status(204).json({
        status: statusCodes.NO_CONTENT,
        message: messages.resourceNotFound,
      })
    } else {
      return res.status(200).json({
        status: statusCodes.OK,
        message: messages.resourceRetrieveSuccessfully,
        result: likes,
        count: likes.length,
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.internalServerError,
      error: error.message,
    })
  }
}

module.exports = service
