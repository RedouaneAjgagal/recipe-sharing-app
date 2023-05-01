import { RequestHandler } from "express";
import { NotFoundError, BadRequestError, UnauthenticatedError } from "../errors";
import Comment from "../models/comment";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "./userController";
import { PartialComment } from "../models/comment";
import Recipe from "../models/recipe";
import checkPermission from "../utils/permissionChecker";
import mongoose from "mongoose";
import { Likes } from "../models/comment";

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
    const { content }: { content: string | undefined } = req.body;
    const { commentId } = req.params;

    // additional checks
    if (!content || content.trim() === "" || !commentId || commentId.trim() === "") {
        throw new BadRequestError(`Must provide all values`);
    }

    // find comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new NotFoundError(`Found no comment with id ${commentId}`);
    }

    // check if the comment belong to the user 
    checkPermission(comment.user.toString(), req.user!.id);

    // update the comment
    await comment.updateOne({ content }, { runValidators: true });

    res.status(StatusCodes.OK).json({ msg: "Updated comment successfully" });
}


const deleteComment: RequestHandler = async (req: CustomRequest, res) => {
    const { commentId } = req.params;

    // additional checks
    if (!commentId || commentId.trim() === "") {
        throw new BadRequestError(`Must provide comment id`);
    }

    // find comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new NotFoundError(`Found no comment with id ${commentId}`);
    }

    // check if the comment belong to the user
    checkPermission(comment.user.toString(), req.user!.id);

    // delete the comment
    await comment.deleteOne();

    res.status(StatusCodes.OK).json({ msg: "Deleted comment successfully" });
}

const likeComment: RequestHandler = async (req: CustomRequest, res) => {
    const { commentId } = req.params;

    // additional checks
    if (!commentId || commentId.trim() === "") {
        throw new BadRequestError(`Must provide comment id`);
    }

    // find comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new NotFoundError(`Found no comment with id ${commentId}`);
    }

    // find the index if the user already liked the comment
    let index = comment.userLike.findIndex(item => item.user.toString() === req.user!.id);

    if (index !== -1) {
        // if already liked/unliked then set to to opposite liked/unliked
        comment.userLike[index].isLike = !comment.userLike[index].isLike
    } else {
        // like the comment immediately
        comment.userLike.push({ user: Object(req.user!.id), isLike: true });
    }


    const totalLikes = comment.userLike.filter(item => item.isLike === true).length;
    
    comment.likes = totalLikes

    await comment.save();

    res.status(StatusCodes.OK).json({ msg: "Liked a comment" });
}

export {
    createComment,
    updateComment,
    deleteComment,
    likeComment
}