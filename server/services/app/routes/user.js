const express = require('express')
const ControllerUser = require('../controllers/user')

const router = express.Router()

router.get("/", ControllerUser.readAllUsers);

router.post("/login", ControllerUser.loginUser);
module.exports = router;
