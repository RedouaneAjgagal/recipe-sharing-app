import express from "express";
const router = express.Router();

import { currentUser } from "../controllers/userController";
import authenticateUser from "../middlewares/authentication";

router.get('/current-user', authenticateUser, currentUser);






export default router;