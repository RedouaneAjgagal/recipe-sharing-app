import express from "express";
const router = express.Router();

import { login, logout, register, verifyEmail, resetPassword, forgetPassword } from "../controllers/authController";

router.post('/login', login);

router.post('/register', register);

router.get('/logout', logout);

router.get('/verify-email', verifyEmail);

router.post('/forget-password', forgetPassword);

router.post('/reset-password', resetPassword);



export default router;