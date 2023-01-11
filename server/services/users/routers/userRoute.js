const express = require('express')
const ControllerUser = require('../controllers/controllerUser')
const router = express.Router()



router.get('/', ControllerUser.getAllUser)
router.post('/', ControllerUser.postNewUser)
router.get('/:id', ControllerUser.getOneUserById)
router.delete('/:id', ControllerUser.deleteUserById)


module.exports = router