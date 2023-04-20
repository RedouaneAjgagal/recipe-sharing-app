import express from "express";
const router = express.Router();

import { login, logout, register } from "../controllers/authController";

router.get('/login', login);

router.get('/register', register);

router.get('/logout', logout);


export default router;