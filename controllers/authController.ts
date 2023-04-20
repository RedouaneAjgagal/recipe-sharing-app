import { StatusCodes } from "http-status-codes";
import { BadRequestError, TooManyRequestError, UnauthenticatedError, NotFoundError } from "../errors";
import { Request, Response } from "express";
import User from "../models/user";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail";


const login = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ msg: "login Controller" });
}

const logout = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ msg: "logout Controller" });
}

const register = async (req: Request, res: Response) => {
    const { name, email, password }: { name: string, email: string, password: string } = req.body;

    // additional validation
    const isValidName = /^[a-zA-Z0-9_-]{3,20}$/.test(name);
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const isValidPassword = /^(?=.*\w).{6,60}$/.test(password);
    if ((!name || !isValidName) || (!email || !isValidEmail) || (!password || !isValidPassword)) {
        throw new BadRequestError('Please provide valid values!');
    }

    // check if the email is already exist
    const isExistingEmail = await User.findOne({ email });
    if (isExistingEmail) {
        throw new BadRequestError('Email already exist, please provide another value');
    }

    // create verification code
    const verificationToken = crypto.randomBytes(40).toString('hex');

    // create the user
    const user = await User.create({ email, name, password, verificationToken });

    // send verification email
    sendVerificationEmail(user.name, user.email, user.verificationToken!);

    res.status(StatusCodes.CREATED).json({ msg: "Success! Please verify your email" });
}

export {
    login,
    logout,
    register
};