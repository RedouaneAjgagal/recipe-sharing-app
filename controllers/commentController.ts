import { RequestHandler } from "express";
import { NotFoundError, BadRequestError, UnauthenticatedError } from "../errors";
import Comment from "../models/comment";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "./userController";
import { PartialComment } from "../models/comment";
import Recipe from "../models/recipe";


const createComment: RequestHandler = async (req: CustomRequest, res) => {
    const { content, recipe: recipeId }: PartialComment = req.body;

    // additional checks
    if (!content || content.trim() === "" || !recipeId) {
        throw new BadRequestError(`Must provide all values`);
    }

    // check if the recipe exist
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new NotFoundError(`Found no recipe with id ${recipeId}`);
    }

    // create the comment
    await Comment.create({ content, recipe: recipeId, user: req.user!.id });

    res.status(StatusCodes.CREATED).json({ msg: "New comment created successfully" });
}


const updateComment: RequestHandler = async (req: CustomRequest, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "update comment" });
}
const deleteComment: RequestHandler = async (req: CustomRequest, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "delete comment" });
}

export {
    createComment,
    updateComment,
    deleteComment
}