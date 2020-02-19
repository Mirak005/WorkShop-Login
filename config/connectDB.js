"use strict"
import mongoose from "mongoose";
import { mongouri } from "./default.json";

const connectDB = async () => {
  try {
  await  mongoose.connect(
      mongouri,
      { useUnifiedTopology: true, useNewUrlParser: true },
      err =>
        err ? console.log(err) : console.log("Data Base is Connecter ...")
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
