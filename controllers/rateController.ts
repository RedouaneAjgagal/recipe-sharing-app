import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError, NotFoundError, TooManyRequestError, UnauthorizedError } from "../errors";
import Rate from "../models/rate";
import { RequestHandler } from "express";


const rateRecipe: RequestHandler = (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "rate a recipe" });
}


const updateRate: RequestHandler = (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "update a rate" });
}

export {
    rateRecipe,
    updateRate
}