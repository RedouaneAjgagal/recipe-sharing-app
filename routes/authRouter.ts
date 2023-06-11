import { Router } from "express";
import { login, logout, register, verifyEmail, resetPassword, forgetPassword } from "../controllers/authController";
import authenticateUser from "../middlewares/authentication";
import rateLimiter from "../utils/rateLimiter";

const authPostLimit = rateLimiter({ windowMs: 15 * 60 * 1000, max: 5 });
const authGetLimit = rateLimiter({ windowMs: 15 * 60 * 1000, max: 10 });


const router = Router();


router.post('/login', login);
router.post('/register', authPostLimit, register);
router.get('/logout', authenticateUser, logout);
router.get('/verify-email', authGetLimit, verifyEmail);
router.post('/forget-password', authPostLimit, forgetPassword);
router.post('/reset-password', authPostLimit, resetPassword);



export default router;