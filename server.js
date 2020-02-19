"use strict";
import express from "express";
import passport from "passport";

import connectDB from "./config/connectDB";
import users from "./routes/users";
import getStrategy from "./middleware/passportSetup";

const app = express();

//Parser middleware
app.use(express.json());

//Passport Init
passport.initialize();
getStrategy(passport);

//Connect the DB
connectDB();

//Routes
app.use("/", users);

//start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server is Running on PORT ${PORT}...`);
});
