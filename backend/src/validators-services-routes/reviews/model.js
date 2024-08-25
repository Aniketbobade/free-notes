const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = require('mongoose').Types.ObjectId

const reviewsSchema = new Schema(
  {
    userId: { type: ObjectId, ref: 'User', required: true },
    documentId: { type: ObjectId, ref: 'Document', required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

const Review = mongoose.model('Review', reviewsSchema)

module.exports = Review
