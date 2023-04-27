import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../errors";
import Recipe from "../models/recipe";
import { RequestHandler } from "express";


const allRecipes: RequestHandler = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "all recipes" });
}

const singleRecipe: RequestHandler = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "single recipe" });
}
const createRecipe: RequestHandler = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "create recipe" });
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