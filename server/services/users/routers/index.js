const express = require('express')
const router = express.Router()
const userRoute = require('../routers/userRoute')


router.get('/', (req, res) => {
    res.send('Uji Coba MongoDB')
})
router.use('/users', userRoute)


module.exports = router