import express from "express";
const router = express.Router();

import { currentUser, userProfile, singleProfile, updateProfile } from "../controllers/userController";
import authenticateUser from "../middlewares/authentication";

router.get('/current-user', authenticateUser, currentUser);
router.get('/settings', authenticateUser, userProfile);

router.route("/:userId")
    .get(singleProfile)
    .patch(authenticateUser, updateProfile);






export default router;