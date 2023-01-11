const express = require('express')
const ControllerMovies = require('../controllers/movie')

const router = express.Router()

router.get('/', ControllerMovies.fetchAllMovies)
router.post('/', ControllerMovies.postNewMovie)
router.get('/:id', ControllerMovies.fetchOneMovie)
router.delete('/:id', ControllerMovies.deleteMovie)
router.put('/:id', ControllerMovies.editMovie)

module.exports = router;
