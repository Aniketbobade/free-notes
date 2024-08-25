const router = require('express').Router()
const isAuth = require('../../middlewares/isAuth')
const service = require('./service')
const validator = require('./validator')
router.post('/user/add-rating', isAuth, validator.addRating, service.addRating)
router.get('/get-ratings/:documentId', service.getRatings)
module.exports = router
