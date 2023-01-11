const redis = require("../config/ioredis");
const axios = require("axios");
const baseURL = "http://localhost:4001";

class ControllerUser {
  static async getAllUser(req, res) {
    try {
      const users = await redis.get("mongoDB:users");
      if (users) {
        const data = JSON.parse(users);
        res.status(200).json(data);
      } else {
        const { data } = await axios({
          method: "get",
          url: `${baseURL}/users`,
        });
        await redis.set("mongoDB:users", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async postNewUser(req, res) {
    try {
      redis.del("mongoDB:users");
      const { username, email, password, phoneNumber, address, role } =
        req.body;
      const newUserForm = {
        username,
        email,
        password,
        phoneNumber,
        address,
        role,
      };
      await axios({
        method: "post",
        url: `${baseURL}/users`,
        data: newUserForm,
      });
      res.status(201).json({ message: "Add new user success" });
    } catch (error) {
      // console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: "get",
        url: `${baseURL}/users/${id}`,
      });
      res.status(200).json(data);
    } catch (error) {
      // console.log(error)
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async deleteOneUser(req, res) {
    try {
      redis.del("mongoDB:users");
      const { id } = req.params;
      const { data } = await axios({
        method: "delete",
        url: `${baseURL}/users/${id}`,
      });
      res.status(200).json({ message: "Delete user success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ControllerUser;
