import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../errors";
import Recipe, { Recipe as URecipe } from "../models/recipe";
import { RequestHandler } from "express";
import { validIngredients, validMethods } from "../helpers/recipeValidation";
import { CustomRequest } from "./userController";




const createRecipe: RequestHandler = async (req: CustomRequest, res) => {
    const { title, description, note, preparationTime, cookTime, ingredients, methods }: URecipe = req.body;

    // additional validation
    const isValidIngredients = validIngredients(ingredients);
    const isValidMethods = validMethods(methods);
    if (!title || !preparationTime || !cookTime || !isValidIngredients || !isValidMethods) {
        throw new BadRequestError('Must provide all the required values');
    }

    // create the recipe
    const recipeDetails: URecipe = {
        title,
        preparationTime,
        cookTime,
        ingredients,
        methods,
        user: Object(req.user!.id)
    }
    if (description && description.trim().length > 0) {
        recipeDetails.description = description;
    }
    if (note && note.trim().length > 0) {
        recipeDetails.note = note;
    }
    await Recipe.create(recipeDetails);


    res.status(StatusCodes.OK).json({msg: "You have created the recipe successfully"});
}



const allRecipes: RequestHandler = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "all recipes" });
}

const singleRecipe: RequestHandler = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "single recipe" });
}
const updateRecipe: RequestHandler = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "update recipe" });
}
const deleteRecipe: RequestHandler = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "delete recipe" });
}


export {
    allRecipes,
    singleRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}