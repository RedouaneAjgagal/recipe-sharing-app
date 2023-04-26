import express from "express";
const router = express.Router();

import { login, logout, register, verifyEmail, resetPassword, forgetPassword } from "../controllers/authController";

import authenticateUser from "../middlewares/authentication";

router.post('/login', login);

router.post('/register', register);

router.get('/logout', authenticateUser, logout);

router.get('/verify-email', verifyEmail);

router.post('/forget-password', forgetPassword);

router.post('/reset-password', resetPassword);



export default router;