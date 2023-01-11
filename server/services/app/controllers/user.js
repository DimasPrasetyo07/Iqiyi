const { compareHashWithPW, createHashPW } = require("../helpers/bcrypts");
const { signPayLoad, verifyToken } = require("../helpers/jwt");
const {User} = require ('../models')

class ControllerUser {
    static async readAllUsers(req, res, next) {
        try {
          let data = await User.findAll();
          if (!data) {
            throw { name: "Not_Found" };
          }
          res.status(200).json(data);
        } catch (err) {
          next(err);
        }
      }
      static async createNewUser(req, res, next) {
        try {
          let { username, email, password, phoneNumber, address } = req.body;
          let data = await User.create({
            username,
            email,
            password,
            phoneNumber,
            address,    
          });
          res.status(201).json({ id: data.id, email: data.email });
        } catch (err) {
            // console.log(err)
          next(err);
        }
      }
      static async loginUser(req, res, next) {
        try {
          let { email, password } = req.body;
          if(!email) {
            throw {name : 'Invalid_Email'}
          }
          if (!password) {
            throw {name : 'Invalid_Password'}
          }
          let data = await User.findOne({
            where: { email },
          });
          if (!data) {
            throw { name: "Email/Password_Incorrect" };
          }
          let comparePW = compareHashWithPW(password, data.password);
          if (!comparePW) {
            throw { name: "Email/Password_Incorrect" };
          }
          let access_token = signPayLoad({
            id: data.id,
            username: data.username,
            email: data.email,
          });
          let id = data.id;
          let username = data.username;
          let role = data.role;
          res.status(200).json({ access_token, id, role, username });
        } catch (err) {
          next(err);
        }
      }

}

module.exports = ControllerUser
