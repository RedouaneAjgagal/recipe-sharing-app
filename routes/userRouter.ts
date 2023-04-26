import express from "express";
const router = express.Router();

import { currentUser, userProfile, singleProfile, updateProfile } from "../controllers/userController";
import authenticateUser from "../middlewares/authentication";

router.route('/')
    .get(authenticateUser, userProfile)
    .patch(authenticateUser, updateProfile);

    
router.get('/current-user', authenticateUser, currentUser);

router.get("/:userId", singleProfile);



export default router;