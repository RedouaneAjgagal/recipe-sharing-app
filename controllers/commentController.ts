import { RequestHandler } from "express";
import { NotFoundError, BadRequestError, UnauthenticatedError } from "../errors";
import Comment from "../models/comment";
import { StatusCodes } from "http-status-codes";
import { CustomRequest } from "./userController";

const createComment: RequestHandler = async (req: CustomRequest, res) => {
    res.status(StatusCodes.CREATED).json({ msg: "create comment" });
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