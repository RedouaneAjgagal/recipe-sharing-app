import { Response, Request, RequestHandler } from "express"
import Profile from "../models/profile"
import { UnauthenticatedError } from "../errors"

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
    const userInfo = await Profile.findOne({ user: id }).populate({ path: 'user', select: 'name email'});
    if (!userInfo) {
        throw new UnauthenticatedError("Failed to authenticate");
    }
    res.json(userInfo);
}



export {
    CustomRequest,
    currentUser,
    userProfile
}