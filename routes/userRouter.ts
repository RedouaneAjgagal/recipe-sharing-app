import express from "express";
const router = express.Router();

import { currentUser, userProfile, singleProfile, updateProfile, uploadPicture } from "../controllers/userController";
import authenticateUser from "../middlewares/authentication";

router.route('/')
    .get(authenticateUser, userProfile)
    .patch(authenticateUser, updateProfile)
    .post(authenticateUser, uploadPicture);


router.get('/current-user', authenticateUser, currentUser);

router.get("/:userId", singleProfile);



export default router;