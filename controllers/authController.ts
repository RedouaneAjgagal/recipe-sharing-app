import { StatusCodes } from "http-status-codes";
import { BadRequestError, TooManyRequestError, UnauthenticatedError, NotFoundError } from "../errors";
import { RequestHandler } from "express";
import User from "../models/user";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail";
import { createToken, attachTokenToCookies, destroyCookie } from "../utils/createToken";
import { validEmail, validPassword, validName } from "../helpers/authValidation";


const login: RequestHandler = async (req, res) => {
    const { email, password }: { email: string, password: string } = req.body;

    // additional validation
    const isValidEmail = validEmail(email);
    const isValidPassword = validPassword(password);
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


const register: RequestHandler = async (req, res) => {
    const { name, email, password }: { name: string, email: string, password: string } = req.body;

    // additional validation
    const isValidName = validName(name);
    const isValidEmail = validEmail(email);
    const isValidPassword = validPassword(password);
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


const logout: RequestHandler = async (req, res) => {
    destroyCookie(res, "accessToken");
    res.status(StatusCodes.OK).json({ msg: "logged out" });
}

const verifyEmail: RequestHandler = async (req, res) => {
    const { token, email } = req.query as { token: string, email: string };
    const isValidEmail = validEmail(email);
    if (!email || !isValidEmail) {
        throw new BadRequestError('Invalid email');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Verification failed');
    }
    if (user.isVerified) {
        return res.status(StatusCodes.OK).json({ msg: "Already verified" });
    }
    if (user.verificationToken !== token) {
        throw new UnauthenticatedError('Verification failed');
    }
    user.isVerified = true;
    user.verifiedDate = new Date(Date.now());
    await user.save();

    res.json({ msg: "Success! You are verified now" });
}


export {
    login,
    logout,
    register,
    verifyEmail
};