const express = require('express')
const ControllerApp = require('../controllers/controllerApp')
const router = express.Router()


router.get('/', ControllerApp.getAllMovies)
router.post('/', ControllerApp.postNewMovie)
router.get('/:id', ControllerApp.getMovieDetail)
router.delete('/:id', ControllerApp.deleteMovie)
router.put('/:id', ControllerApp.editMovie)


module.exports = router