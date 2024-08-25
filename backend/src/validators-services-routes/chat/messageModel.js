const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = require('mongoose').Types.ObjectId

const messageSchema = new Schema(
  {
    sender: { type: ObjectId, ref: 'User' },
    senderName: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['private', 'group'], required: true },
    receivers: [{ type: ObjectId, ref: 'User' }],
    room: { type: ObjectId, ref: 'Room' },
  },
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
