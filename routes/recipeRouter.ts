import { Router } from "express";
import { allRecipes, singleRecipe, createRecipe, updateRecipe, deleteRecipe } from "../controllers/recipeController";
import authenticateUser from "../middlewares/authentication";


const router = Router();


router.route('/')
    .get(allRecipes)
    .post(authenticateUser, createRecipe);

router.route('/:recipeId')
    .get(singleRecipe)
    .patch(authenticateUser, updateRecipe)
    .delete(authenticateUser, deleteRecipe);

export default router;