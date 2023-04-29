import { Response, Request, RequestHandler } from "express"
import Profile from "../models/profile"
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors"
import { StatusCodes } from "http-status-codes"
import User from "../models/user"
import { UploadedFile } from "express-fileupload";
import { uploadImage } from "../utils/uploadImg"


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

    // find the profile
    const userInfo = await Profile.findOne({ user: id }).populate({ path: 'user', select: 'name email' });
    if (!userInfo) {
        throw new UnauthenticatedError("Failed to authenticate");
    }

    res.status(StatusCodes.OK).json(userInfo);
}

const singleProfile: RequestHandler = async (req, res) => {
    const { userId } = req.params;

    // find the profile
    const profile = await Profile.findById(userId).populate({ path: "user", select: "name -_id" });
    if (!profile) {
        throw new NotFoundError(`There is no user with id ${userId}`);
    }

    res.status(StatusCodes.OK).json(profile);
}

const updateProfile: RequestHandler = async (req: CustomRequest, res) => {
    const { name, picture, bio, favouriteMeals }: { name: string, picture: string, bio: string, favouriteMeals: string[] } = req.body;
    const { id } = req.user!;

    // find the profile
    const profile = await Profile.findOne({ user: id });
    if (!profile) {
        throw new UnauthenticatedError("Failed to authenticate");
    }

    // update the profile
    const newProfileInfo: { picture?: string, bio?: string, favouriteMeals?: string[] } = {}

    if (picture && picture.trim().startsWith('https://res.cloudinary.com/dqfrgtxde/image/upload')) {
        newProfileInfo.picture = picture;
    }
    if (bio && bio.trim().length <= 300) {
        newProfileInfo.bio = bio
    }
    if (favouriteMeals && favouriteMeals.length <= 15 && favouriteMeals.every(meal => typeof meal === "string")) {
        newProfileInfo.favouriteMeals = favouriteMeals;
    }

    await profile.updateOne(newProfileInfo, { runValidators: true });


    // update the user name
    if (name && name.trim().length >= 3 && name.trim().length <= 20) {
        await User.findByIdAndUpdate(profile.user.toString(), { name }, { runValidators: true });
    }

    res.status(StatusCodes.OK).json({ msg: "Profile updated!" });
}

const uploadPicture: RequestHandler = async (req, res) => {
    const picture = req.files?.picture as UploadedFile;
    const url = await uploadImage(picture);
    res.status(StatusCodes.OK).json({ src: url });
}


export {
    CustomRequest,
    currentUser,
    userProfile,
    singleProfile,
    updateProfile,
    uploadPicture
}