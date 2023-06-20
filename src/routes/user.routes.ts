import express from "express";
import { signIn,signUp } from "../controllers/user.controller";
import { check } from 'express-validator';
const router = express.Router();

const signUpValidations = [
    check('first_name').trim().isLength({ min: 3 }).withMessage('first_name required').escape(),
    check('last_name').trim().isLength({ min: 3 }).withMessage('last_name required').escape(),
    check('email').trim().isEmail().normalizeEmail().withMessage('valid email is required'),
    check('password').trim().isLength({ min: 8 }).withMessage('password must be 8 characters or more').escape()
];
const signInValidations = [
    check('email').trim().isEmail().normalizeEmail().withMessage('valid email is required'),
    check('password').trim().isLength({ min: 8 }).withMessage('password must be 8 characters or more').escape()
];

router.post('/signup',signUpValidations, signUp);
  
router.post('/signin', signInValidations,signIn);
  
export default router;