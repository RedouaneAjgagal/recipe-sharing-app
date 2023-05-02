import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../errors";
import Favourite from "../models/favourite";
import Recipe from "../models/recipe";
import { RequestHandler } from "express";
import { CustomRequest } from "./userController";
import Profile from "../models/profile";

const favouriteRecipes: RequestHandler = async (req: CustomRequest, res) => {
    // find all favourited recipes related to this user
    const favourites = await Favourite.find({ user: req.user!.id }).populate(
        {
            path: "recipe",
            select: "title avgRating totalTime images user",
            populate: {
                path: "user",
                select: "name"
            }
        }
    );

    res.status(StatusCodes.OK).json(favourites);
}


const favouriteToggle: RequestHandler = async (req: CustomRequest, res) => {
    const { recipe: recipeId } = req.body;

    // check if valid recipe
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new NotFoundError(`Found no recipe with id ${recipeId}`);
    }

    // if already favourited this recipe then unfavourite it
    const isFavourite = await Favourite.findOne({ recipe: recipe._id, user: req.user!.id });
    if (isFavourite) {
        await isFavourite.deleteOne();
        return res.status(StatusCodes.OK).json({ msg: "Removed from favourite recipes" });
    }

    // if its not favourited
    await Favourite.create({ recipe: recipe._id, user: req.user!.id });
    res.status(StatusCodes.CREATED).json({ msg: "Added to favourite recipes" });
}


export {
    favouriteRecipes,
    favouriteToggle
}
