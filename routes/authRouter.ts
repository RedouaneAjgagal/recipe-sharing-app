import express from "express";
const router = express.Router();

import { login, logout, register, verifyEmail } from "../controllers/authController";

router.post('/login', login);

router.post('/register', register);

router.get('/logout', logout);

router.get('/verify-email', verifyEmail);


export default router;