import express from "express";
const router = express.Router();

import { login, logout, register } from "../controllers/authController";

router.post('/login', login);

router.post('/register', register);

router.get('/logout', logout);


export default router;