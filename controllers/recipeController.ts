import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../errors";
import Recipe, { Recipe as URecipe, PartialRecipe } from "../models/recipe";
import { RequestHandler } from "express";
import { validIngredients, validMethods, validImages } from "../helpers/recipeValidation";
import { CustomRequest } from "./userController";
import Profile from "../models/profile";
import checkPermission from "../utils/permissionChecker";



const createRecipe: RequestHandler = async (req: CustomRequest, res) => {
    const { title, description, note, preparationTime, cookTime, ingredients, methods, image }: URecipe = req.body;

    // additional validation
    const isValidIngredients = validIngredients(ingredients);
    const isValidMethods = validMethods(methods);
    const isValidImages = validImages(image);
    if ((!title || title.trim().length < 1) || !preparationTime || !cookTime || !isValidIngredients || !isValidMethods || !isValidImages) {
        throw new BadRequestError('Must provide all the required values');
    }

    // create the recipe
    const recipeDetails: URecipe = {
        title,
        image,
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


    res.status(StatusCodes.CREATED).json({ msg: "You have created the recipe successfully" });
}



const allRecipes: RequestHandler = async (req, res) => {
    const { page, sort } = req.query;

    // sorting based on new or popular
    const sortRecipes = sort === "newest" ? "-createdAt" : "-avgRating";

    // display 12 recipes per page
    const pages = Number(page) || 1;
    const limits = 12;
    const skip = (pages - 1) * limits;

    // find recipes
    const recipes = await Recipe.find({}).select('title avgRating totalTime image.main').populate({ path: "user", select: 'name -_id' }).limit(limits).skip(skip).sort(sortRecipes);

    if (recipes.length < 1) {
        throw new NotFoundError('Found no recipe');
    }

    res.status(StatusCodes.OK).json(recipes);
}



const singleRecipe: RequestHandler = async (req, res) => {
    const { recipeId } = req.params;

    // find recipe
    const recipe = await Recipe.findById(recipeId).select('-_id');
    if (!recipe) {
        throw new NotFoundError(`Found no recipe with id ${recipeId}`);
    }

    // find user profile picture
    const profile = await Profile.findOne({ user: recipe.user }, { picture: true }).populate({ path: "user", select: "name -_id" });

    const recipeDetail = { user: { name: profile!.user.name, picture: profile!.picture }, recipe }

    res.status(StatusCodes.OK).json(recipeDetail);
}



const updateRecipe: RequestHandler = async (req: CustomRequest, res) => {
    const { title, description, image, note, preparationTime, cookTime, ingredients, methods }: URecipe = req.body;
    const { recipeId } = req.params;

    // find recipe
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new NotFoundError(`Found no recipe with id ${recipeId}`);
    }

    // check if it the recipe belongs to the user
    checkPermission(recipe.user.toString(), req.user!.id);


    // update valid properties
    const isValidImages = validImages(image);
    const isValidIngredients = validIngredients(ingredients);
    const isValidMethods = validMethods(methods);
    if (isValidImages) {
        recipe.image = image;
    }
    if (isValidIngredients) {
        recipe.ingredients = ingredients;
    }
    if (isValidMethods) {
        recipe.methods = methods;
    }
    if (title && title.trim() !== "") {
        recipe.title = title;
    }
    if (description && description.trim() !== "") {
        recipe.description = description;
    }
    if (note && note.trim() !== "") {
        recipe.note = note;
    }
    if (preparationTime) {
        recipe.preparationTime = preparationTime;
    }
    if (cookTime) {
        recipe.cookTime = cookTime;
    }

    await recipe.save();

    res.status(StatusCodes.OK).json({msg: "You have updated the recipe successfully"});
}



const deleteRecipe: RequestHandler = async (req: CustomRequest, res) => {
    const { recipeId } = req.params;

    // find recipe
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new NotFoundError(`Faound no recipe with id ${recipeId}`);
    }

    // check if it the recipe belongs to the user
    checkPermission(recipe.user.toString(), req.user!.id);

    await recipe.deleteOne();

    res.status(StatusCodes.OK).json({ msg: "You have deleted the recipe successfully" });
}


export {
    allRecipes,
    singleRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
}