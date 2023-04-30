import { Router } from "express";
import { allRecipes, singleRecipe, createRecipe, updateRecipe, deleteRecipe, uploadRecipeImages, recipeComments } from "../controllers/recipeController";
import authenticateUser from "../middlewares/authentication";


const router = Router();


router.route('/')
    .get(allRecipes)
    .post(authenticateUser, createRecipe);

router.post('/upload-images', authenticateUser, uploadRecipeImages);

router.route('/:recipeId')
    .get(singleRecipe)
    .patch(authenticateUser, updateRecipe)
    .delete(authenticateUser, deleteRecipe);

router.get('/:recipeId/comments', recipeComments);

export default router;