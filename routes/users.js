"use strict";
import express from "express";
import passport from "passport";

import { registerRules, loginRules, validator } from "../middleware/validator";
import registerController from "../controllers/registerController";

const Router = express.Router();

//@route POST /register
//@desc Register User
//@acess Public
Router.post(
  "/register",
  registerRules(),
  validator,
  registerController.register
);

//@route POST /login
//@desc login User
//@acess Public
Router.post("/login", loginRules(), validator, registerController.login);

//@route Get /current
//@desc get current user
//@acess Private
Router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  registerController.current
);

export default Router;
