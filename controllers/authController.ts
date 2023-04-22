import { StatusCodes } from "http-status-codes";
import { BadRequestError, TooManyRequestError, UnauthenticatedError, NotFoundError } from "../errors";
import { Request, Response } from "express";
import User from "../models/user";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail";
import { createToken, attachTokenToCookies, destroyCookie } from "../utils/createToken"


const login = async (req: Request, res: Response) => {
    const { email, password }: { email: string, password: string } = req.body;

    // additional validation
    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const isValidPassword = /^(?=.*\w).{6,60}$/.test(password);
    if ((!email || !isValidEmail) || (!password || !isValidPassword)) {
        throw new BadRequestError('Please provide valid values!');
    }

    // find the user
    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequestError('Email or Password are incorrect');
    }

    // check if the password correct
    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
        throw new BadRequestError('Email or Password are incorrect');
    }

    const token = createToken(user);
    attachTokenToCookies(res, token);

    res.status(StatusCodes.OK).json({ email, password });
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


const logout = async (req: Request, res: Response) => {
    destroyCookie(res, "accessToken");
    res.status(StatusCodes.OK).json({ msg: "logged out" });
}



export {
    login,
    logout,
    register
};