const config = require('../config/development')
const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization']
    const token = bearerHeader && bearerHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        // Handle error here (e.g., send status 403 with error message)
        return res.status(403).json({ message: 'Forbidden', error: err })
      }

      req.user = user.user
      next()
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error', error })
  }
}

module.exports = isAuth
