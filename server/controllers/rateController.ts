import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../errors";
import Rate from "../models/rate";
import { RequestHandler } from "express";
import { CustomRequest } from "./userController";
import Recipe from "../models/recipe";
import User from "../models/user";


const rateRecipe: RequestHandler = async (req: CustomRequest, res) => {
    const { recipe: recipeId, rate } = req.body;

    // additional checks
    if (!recipeId || !rate) {
        throw new BadRequestError('Must provide all values');
    }

    // check if recipe exist
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new NotFoundError(`Found no recipe with id ${recipeId}`);
    }

    // unable to rate recipe if belong to this user
    if (recipe.user.toString() === req.user!.id) {
        throw new BadRequestError("Can not rate your own recipe");
    }

    // check if valid rate
    if (rate < 1 || rate > 5) {
        throw new BadRequestError('Rating must be between 1 and 5');
    }

    // check if its a verified user
    const isVerified = await User.findOne({ _id: req.user!.id, isVerified: true });
    if (!isVerified) {
        throw new UnauthorizedError("Must verify your email to start rating recipes");
    }

    // check if already rated
    const alreadyRated = await Rate.findOne({ recipe: recipe._id, user: req.user!.id });

    if (alreadyRated) {
        // upadate the rate
        await alreadyRated.updateOne({ rate });
        await alreadyRated.save();
    } else {
        // create a new rate
        await Rate.create({ user: Object(req.user!.id), recipe: recipe._id, rate });
    }

    res.status(StatusCodes.OK).json({ rate });
}

export {
    rateRecipe
}