import { Router } from "express";
import { currentUser, userProfile, singleProfile, updateProfile, uploadPicture } from "../controllers/userController";
import authenticateUser from "../middlewares/authentication";


const router = Router();


router.route('/')
    .get(authenticateUser, userProfile)
    .patch(authenticateUser, updateProfile)
    .post(authenticateUser, uploadPicture);
    
router.get('/current-user', authenticateUser, currentUser);
router.get("/:userId", singleProfile);



export default router;