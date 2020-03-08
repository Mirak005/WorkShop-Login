"use strict";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";
import { jwtSecret } from "../config/default.json";

const registerController = {
  //Register

  register: async (req, res) => {
    const { login, email, password } = req.body;
    try {
      //check if user already exists
      const serachResult = await User.findOne({ email });
      if (serachResult)
        return res
          .status(500)
          .json({ errors: [{ msg: "User already exists" }] });
      // create new user
      const newUser = new User({ login, password, email });

      // hash password
      bcrypt.genSalt(10, (err, salt) => {
        err
          ? console.log(err)
          : bcrypt.hash(password, salt, async (err, hash) => {
              if (err) throw err;
              //assign hashed password
              newUser.password = hash;
              try {
                //save password
                newUser.save();
                res.json(newUser);
              } catch (error) {
                res
                  .status(500)
                  .json({
                    errors: [{ msg: "Server Error , Register Failed" }]
                  });
              }
            });
      });
    } catch (error) {
      console.log(error);
    }
  },

  //Login

  login: async (req, res) => {
    const { password, email } = req.body;
    try {
      const searchUser = await User.findOne({ email });
      if (!searchUser)
        return res.status(400).json({ errors: [{ msg: "User dosent exist" }] });

      const isMatch = await bcrypt.compare(password, searchUser.password);
      if (!isMatch)
        return res
          .status(400)
          .json([{ errors: [{ msg: "Bad Credentials " }] }]);

      const payload = {
        id: searchUser._id,
        email: searchUser.email
      };

      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) throw err;
        res.json({ token: "Bearer " + token });
      });
    } catch (error) {
      console.log(error);
    }
  },

  //Current
  current: (req, res) => res.send(req.user)
};

export default registerController;
