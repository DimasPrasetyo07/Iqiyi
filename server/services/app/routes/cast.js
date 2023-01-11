const express = require('express')
const ControllerCasts = require('../controllers/cast')

const router = express.Router()

router.get('/', ControllerCasts.fetchAllCasts)
router.post('/', ControllerCasts.postNewCast)
router.get('/:id', ControllerCasts.fetchMovieCast)
router.put('/:id', ControllerCasts.editCast)

module.exports = router;
