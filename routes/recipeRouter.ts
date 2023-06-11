import { Router } from "express";
import { allRecipes, singleRecipe, createRecipe, updateRecipe, deleteRecipe, uploadRecipeImages, recipeComments, userRecipes } from "../controllers/recipeController";
import authenticateUser from "../middlewares/authentication";


const router = Router();


router.route('/')
    .get(allRecipes)
    .post(authenticateUser, createRecipe);

router.get("/current-user", authenticateUser, userRecipes);

router.post('/upload-images', authenticateUser, uploadRecipeImages);

router.route('/:recipeId')
    .get(singleRecipe)
    .put(authenticateUser, updateRecipe)
    .delete(authenticateUser, deleteRecipe);

router.get('/:recipeId/comments', recipeComments);

export default router;