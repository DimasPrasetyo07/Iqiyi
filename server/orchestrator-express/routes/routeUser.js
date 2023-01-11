const express = require('express')
const ControllerUser = require('../controllers/controllerUser')
const router = express.Router()


router.get('/', ControllerUser.getAllUser)
router.post('/', ControllerUser.postNewUser)
router.get('/:id', ControllerUser.getOneUser)
router.delete('/:id', ControllerUser.deleteOneUser)

module.exports = router
