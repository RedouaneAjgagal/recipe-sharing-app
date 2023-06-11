import { Router } from "express";
import { favouriteRecipes, favouriteToggle } from "../controllers/favouriteController";
import authenticateUser from "../middlewares/authentication";


const router = Router();

router.route("/")
    .get(authenticateUser, favouriteRecipes)
    .post(authenticateUser, favouriteToggle);

export default router;