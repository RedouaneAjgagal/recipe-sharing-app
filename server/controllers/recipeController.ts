import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../errors";
import Recipe, { Recipe as URecipe, PartialRecipe } from "../models/recipe";
import { RequestHandler } from "express";
import { validIngredients, validMethods, validImages, validNumber } from "../helpers/recipeValidation";
import { CustomRequest } from "./userController";
import Profile from "../models/profile";
import checkPermission from "../utils/permissionChecker";
import { UploadedFile } from "express-fileupload";
import { uploadImage, uploadImages } from "../utils/uploadImg";
import Comment from "../models/comment";


const createRecipe: RequestHandler = async (req: CustomRequest, res) => {
    const { title, description, note, preparationTime, cookTime, ingredients, methods, images }: URecipe = req.body;

    // additional validation
    const isValidIngredients = validIngredients(ingredients);
    const isValidMethods = validMethods(methods);
    const isValidImages = validImages(images);

    const isValidPreparationTime = validNumber(preparationTime);
    const isValidCookTime = validNumber(cookTime);
    if ((!title || title.trim().length < 1) || !isValidPreparationTime || !isValidCookTime || !isValidIngredients || !isValidMethods || !isValidImages) {
        throw new BadRequestError('Must provide all the required values');
    }

    // create the recipe
    const recipeDetails: URecipe = {
        title,
        images,
        preparationTime,
        cookTime,
        ingredients,
        methods,
        user: Object(req.user!.id)
    }
    if (description && description.trim() !== "") {
        recipeDetails.description = description;
    }
    if (note && note.trim() !== "") {
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
    if (Number(pages) < 1) {
        throw new BadRequestError('Invalid page number');
    }
    const limits = 3;
    const skip = (pages - 1) * limits;

    // calc amount of pages
    const totalRecipes = await Recipe.countDocuments();
    const numOfPages = Math.ceil(totalRecipes / limits);

    // find recipes
    const recipes = await Recipe.find({}).select('title avgRating totalTime images').populate({ path: "user", select: 'name -_id' }).limit(limits).skip(skip).sort(sortRecipes);


    if (recipes.length < 1) {
        throw new NotFoundError('Found no recipe');
    }

    res.status(StatusCodes.OK).json({ recipes, numOfPages });
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
    const { title, description, images, note, preparationTime, cookTime, ingredients, methods }: URecipe = req.body;
    const { recipeId } = req.params;

    // find recipe
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new NotFoundError(`Found no recipe with id ${recipeId}`);
    }

    // check if it the recipe belongs to the user
    checkPermission(recipe.user.toString(), req.user!.id);

    // insert valid values to new obj
    const updatedRecipe: PartialRecipe = {}
    const isValidImages = validImages(images);
    const isValidIngredients = validIngredients(ingredients);
    const isValidMethods = validMethods(methods);
    const isValidPreparationTime = validNumber(preparationTime);
    const isValidCookTime = validNumber(cookTime);
    if (isValidImages) {
        updatedRecipe.images = images;
    }
    if (isValidIngredients) {
        updatedRecipe.ingredients = ingredients;
    }
    if (isValidMethods) {
        updatedRecipe.methods = methods;
    }
    if (title && title.trim() !== "") {
        updatedRecipe.title = title;
    }
    if (description && description.trim() !== "") {
        updatedRecipe.description = description;
    }
    if (note && note.trim() !== "") {
        updatedRecipe.note = note;
    }
    if (isValidPreparationTime) {
        updatedRecipe.preparationTime = preparationTime;
    }
    if (isValidCookTime) {
        updatedRecipe.cookTime = cookTime;
    }

    // update the recipe
    await recipe.updateOne(updatedRecipe, { runValidators: true });

    res.status(StatusCodes.OK).json({ msg: "You have updated the recipe successfully" });
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

const uploadRecipeImages: RequestHandler = async (req, res) => {
    const images = req.files?.images as UploadedFile;

    if (Array.isArray(images)) {
        // has multiple images
        const url = await uploadImages(images);
        return res.status(StatusCodes.OK).json({ src: url });
    } else {
        // has one image
        const url = await uploadImage(images);
        return res.status(StatusCodes.OK).json({ src: [url] });
    }
}

const recipeComments: RequestHandler = async (req, res) => {
    const { recipeId } = req.params;
    const { newest } = req.query;

    // find recipe
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new NotFoundError(`Found no recipe with id ${recipeId}`);
    }

    // sort TOP by default else by NEW
    const sorting = newest === "true" ? "-createdAt" : "-likes -createdAt";

    // find comments
    const comments = await Comment.find({ recipe: recipe._id }).populate({ path: "user profile", select: "name role picture" }).select('-recipe -updatedAt').sort(sorting);

    res.status(StatusCodes.OK).json(comments);
}

export {
    allRecipes,
    singleRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    uploadRecipeImages,
    recipeComments
}