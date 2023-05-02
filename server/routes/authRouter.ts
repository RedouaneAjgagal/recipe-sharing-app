import { Router } from "express";
import { login, logout, register, verifyEmail, resetPassword, forgetPassword } from "../controllers/authController";
import authenticateUser from "../middlewares/authentication";


const router = Router();


router.post('/login', login);
router.post('/register', register);
router.get('/logout', authenticateUser, logout);
router.get('/verify-email', verifyEmail);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);



export default router;