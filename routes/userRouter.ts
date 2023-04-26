import express from "express";
const router = express.Router();

import { currentUser, userProfile } from "../controllers/userController";
import authenticateUser from "../middlewares/authentication";

router.get('/current-user', authenticateUser, currentUser);
router.get('/settings', authenticateUser, userProfile);






export default router;