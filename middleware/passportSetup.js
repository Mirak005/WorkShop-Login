"use strict";
import passportJwt from "passport-jwt";
import { jwtSecret } from "../config/default.json";
import User from "../models/User.js";

const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

const getStrategy = passport =>
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const searchUser = await User.findById(jwt_payload.id);
        searchUser ? done(null, searchUser) : done(null, false);
      } catch (error) {
        console.log(error);
      }
    })
  );

export default getStrategy;
