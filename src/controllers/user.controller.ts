import { Request, Response } from "express";
import User from "../models/user.model";
import mongoose from "mongoose";
import { validationResult } from "express-validator";
import { generateHash, verifyHash } from "../helper/authentication.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      res.status(500).json({
        message: errors,
      });
    }
    const { first_name, last_name, email, password } = req.body;
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
        res.status(201).json({
          user: result,
          message: "User registered Successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "User Registration Failed",
          reason : err
        });
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        message: errors,
      });
    }
    const { email, password } = req.body;
    const dbuser = await User.findOne({ email });
    if (dbuser) {
      const isValid = await verifyHash(password, dbuser.password);
      if (isValid) {
        res.status(200).json({ message: "Sign in successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
    else{
      res.status(404).json({ message: "User Not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
