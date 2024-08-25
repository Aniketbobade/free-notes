const Queue = require('bull')
const fileUploader = require('./fileUploader')
const fs = require('fs')
const path = require('path')
const config = require('../config/development')
const Document = require('../../src/validators-services-routes/documents/model')
const redisOptions = {
  redis: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    user: config.REDIS_USER,
    password: config.REDIS_PASSWORD,
    maxRetriesPerRequest: null, // Disable the max retries per request limit
    retryStrategy: function (times) {
      // Retry strategy with exponential backoff
      return Math.min(times * 50, 2000)
    },
    connectTimeout: 10000, // Increase connection timeout
    tls: {}, // Use TLS if required by the Redis server
  },
}

// Create a Bull queue
const uploadQueue = new Queue('file-upload', redisOptions)
//console.log(uploadQueue)

// Handle Redis connection errors
uploadQueue.on('error', (error) => {
  console.error('Queue Error:', error)
})
// Process the queue
uploadQueue.process(async (job, done) => {
  const { filePath } = job.data

  try {
    // Upload the file to Cloudinary
    const result = await fileUploader.uploadDocument(filePath, config.FOLDER)

    // Delete the file from the server
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error while deleting the file:', err)
      }
    })
    if (!result) {
      done(new Error('Failed to upload to Cloudinary'))
      await Document.findByIdAndUpdate(job.data.documentId, {
        uploadStatus: 'REJECTED',
      })
    }
    await Document.findByIdAndUpdate(job.data.documentId, {
      file_url: result.secure_url,
      public_Id: result.public_id,
      resource_type: result.resource_type,
      uploadStatus: 'UPLOADED',
    })
    done()
  } catch (err) {
    console.error('Error while uploading to Cloudinary:', err)
    done(new Error('Failed to upload to Cloudinary'))
  }
})

module.exports = uploadQueue
