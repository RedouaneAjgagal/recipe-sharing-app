import { Router } from "express";
import { currentUser, userProfile, singleProfile, updateProfile, uploadPicture } from "../controllers/userController";
import authenticateUser from "../middlewares/authentication";
import rateLimiter from "../utils/rateLimiter";


const router = Router();

const apiLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 });


router.route('/')
    .get(authenticateUser, userProfile)
    .patch(apiLimiter, authenticateUser, updateProfile)
    .post(apiLimiter, authenticateUser, uploadPicture);

router.get('/current-user', apiLimiter, authenticateUser, currentUser);
router.get("/:userId", apiLimiter, singleProfile);



export default router;