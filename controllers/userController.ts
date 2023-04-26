import { Response, Request, RequestHandler } from "express"
import Profile from "../models/profile"
import { NotFoundError, UnauthenticatedError } from "../errors"
import { StatusCodes } from "http-status-codes"

interface CustomRequest extends Request {
    user?: {
        id: string,
        name: string,
        role: string
    }
}

const currentUser: RequestHandler = async (req: CustomRequest, res) => {
    res.json(req.user);
}

const userProfile: RequestHandler = async (req: CustomRequest, res) => {
    const { id } = req.user!;
    const userInfo = await Profile.findOne({ user: id }).populate({ path: 'user', select: 'name email' });
    if (!userInfo) {
        throw new UnauthenticatedError("Failed to authenticate");
    }
    res.status(StatusCodes.OK).json(userInfo);
}

const singleProfile: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    const profile = await Profile.findById(userId).populate({path: "user", select: "name -_id"});
    if (!profile) {
        throw new NotFoundError(`Sorry but there is no user with id ${userId}`);
    }
    res.status(StatusCodes.OK).json(profile);
}


export {
    CustomRequest,
    currentUser,
    userProfile,
    singleProfile
}