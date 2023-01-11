const { getDB } = require('../config/mongo-connection')
const {ObjectId} = require('mongodb')
const User = require('../models/modelUser')
const { hashPassword } = require('../helpers/bcrypt')

class ControllerUser {
    static async getAllUser(req, res) {
        try {
            const data = await User.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async getOneUserById(req, res) {
        try {
            const {id} = req.params
            const data = await User.findById(id)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async postNewUser(req, res) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body
            const data = await User.createUser({
                username,
                email,
                password: hashPassword(password),
                role,
                phoneNumber,
                address
            })
            res.status(201).json({message: 'Add new user success'})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }
    static async deleteUserById(req, res) {
        try {
            const {id} = req.params
            const data = await User.deleteUser(id)
            res.status(200).json({message: 'Delete user success'})
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    
}

module.exports = ControllerUser