const express = require('express')
const ControllerGenres = require('../controllers/genre')

const router = express.Router()

router.get('/', ControllerGenres.fetchAllGenre)
router.post('/', ControllerGenres.postNewGenre)
router.delete('/:id', ControllerGenres.deleteGenre)
router.get('/:id', ControllerGenres.fetchOneGenre)
router.put('/:id', ControllerGenres.editGenre)

module.exports = router;
