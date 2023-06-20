import { Request, Response } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { generateHash, verifyHash } from "../helper/authentication.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors : errors.array().map(error => error.msg),
        message: "Validation Error",
      });
    }
    const exist = await User.findOne({ email });
    if(exist){
      return res.status(409).json({ message: "User already exist" });
    }
    const hashedpass = await generateHash(password);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      first_name,
      last_name,
      email,
      password: hashedpass,
    });
    newUser
      .save()
      .then((result) => {
        return res.status(201).json({
          user: result,
          message: "User registered Successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "User Registration Failed",
          reason : err.message
        });
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors : errors.array().map(error => error.msg),
        message: "Validation errors",
      });
    }
    const dbuser = await User.findOne({ email });
    if (dbuser) {
      const isValid = await verifyHash(password, dbuser.password);
      if (isValid) {
        return res.status(200).json({ message: "Sign in successful" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
    else{
      return res.status(404).json({ message: "User Not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
