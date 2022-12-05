const router = require('express').Router()

const { postCoords, getCoords } = require('../controllers/coords.controllers')

router.post('/coords', postCoords)
router.get('/coords', getCoords)
module.exports = router