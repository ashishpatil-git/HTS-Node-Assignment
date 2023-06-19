import express from "express";
import { signIn,signUp } from "../controllers/user.controller";
import { check } from 'express-validator';
const router = express.Router();

const signUpValidations = [
    check('first_name').trim().isLength({ min: 3 }).escape().withMessage('first_name required'),
    check('last_name').trim().isLength({ min: 3 }).escape().withMessage('last_name required'),
    check('email').trim().isEmail().normalizeEmail().withMessage('Enter valid email'),
    check('password').trim().isLength({ min: 8 }).escape().withMessage('password required')
];
const signInValidations = [
    check('email').trim().isEmail().normalizeEmail().withMessage('Enter valid email'),
    check('password').trim().isLength({ min: 8 }).escape().withMessage('password required')
];

router.post('/signup',signUpValidations, signUp);
  
router.post('/signin', signInValidations,signIn);
  
export default router;