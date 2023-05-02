import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../errors";
import Rate from "../models/rate";
import { RequestHandler } from "express";
import { CustomRequest } from "./userController";
import Recipe from "../models/recipe";
import checkPermission from "../utils/permissionChecker";


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

    // check if valid rate
    if (rate < 1 || rate > 5) {
        throw new BadRequestError('Rating must be between 1 and 5');
    }

    // check if already rated
    const alreadyRated = await Rate.findOne({ recipe: recipe._id, user: req.user!.id });
    if (alreadyRated) {
        throw new BadRequestError('You have already rated for this recipe');
    }

    // create a new rate
    await Rate.create({ user: Object(req.user!.id), recipe: recipe._id, rate });

    res.status(StatusCodes.OK).json({ msg: "rate a recipe" });
}


const updateRate: RequestHandler = async (req: CustomRequest, res) => {
    const { rateId } = req.params;
    const { rate: updatedRate } = req.body;

    // check if valid rate
    if (updatedRate < 1 || updatedRate > 5) {
        throw new BadRequestError('Rating must be between 1 and 5');
    }

    // find rate
    const rate = await Rate.findById(rateId);
    if (!rate) {
        throw new NotFoundError(`Found no rate with id ${rateId}`);
    }

    // check if rate belon to the user
    checkPermission(rate.user.toString(), req.user!.id);

    // update the rate
    rate.rate = updatedRate
    await rate.save();

    res.status(StatusCodes.OK).json({ msg: "update a rate" });
}

export {
    rateRecipe,
    updateRate
}