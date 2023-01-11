const express = require('express')
const router = express.Router()
const usersRoute = require('./user')
const moviesRoute = require('./movie')
const genresRoute = require('./genre')
const castsRoute = require('./cast')
const authentication = require('../middlewares/authentication')
const ControllerUser = require('../controllers/user')




router.get('/', (req, res) => {
    res.send('UJI COBA GRADED 1 FASE 3')
  })
router.use('/users', usersRoute)
router.post("/users", ControllerUser.createNewUser);
router.use('/movies', moviesRoute)
// router.use(authentication)
router.use('/genres', genresRoute)
router.use('/casts', castsRoute)




module.exports = router