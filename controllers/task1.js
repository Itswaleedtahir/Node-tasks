const config = require("../config");
const { Users } = require("../models");
const { generateErrorInstance } = require("../utils");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {

    try {
      const { email, password , rememberMe } = req.body;

      if (!email || !password) {
        throw generateErrorInstance({
          status: 400,
          message: "Required fields can't be empty",
        });
      }

      let user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw generateErrorInstance({
          status: 404,
          message: "User not found",
        });
      }

      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        throw generateErrorInstance({
          status: 401,
          message: "Invalid Password",
        });
      }

      user = user.toJSON();
      delete user.password;

      const token = jwt.sign(user, config.get("jwt_secret"), {
        expiresIn: rememberMe ? '7d' : '1d',
      });

         // Store the token in the session or send it in the response
         if (rememberMe) {
          req.session = token;
      } else {
          res.setHeader('Authorization', token);
      }

      return res.status(200).send({ user, token , message:"Login Successful" });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
  Logout: async (req,res)=>{
    try {
        req.session.destroy();
        res.clearCookie('connect.sid');
        res.clearCookie('Authorization');

        res.json({ message: 'Logout successful' });
    } catch (err) {
        console.log(err);
         return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong...");
    }
}
};