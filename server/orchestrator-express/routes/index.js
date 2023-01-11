const express = require('express')
const router = express.Router()
const userRoute = require('./routeUser')
const appRoute = require('./routeApp')

router.get('/', async(req, res) => {
    res.send('Uji Coba Redis')
})
router.use('/users', userRoute)
router.use('/movies', appRoute)

module.exports = router