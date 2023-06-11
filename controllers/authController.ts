import { StatusCodes } from "http-status-codes";
import { BadRequestError, TooManyRequestError, UnauthenticatedError, NotFoundError } from "../errors";
import { RequestHandler } from "express";
import User from "../models/user";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail";
import { createToken, attachTokenToCookies, destroyCookie } from "../utils/createToken";
import { validEmail, validPassword, validName } from "../helpers/authValidation";
import createHash from "../utils/createHash";
import sendResetPasswordEmail from "../utils/sendResetPasswordEmail";


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

    res.status(StatusCodes.OK).json({ msg: `Success! Welcome back ${user.name}` });
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

    // additional validation
    const isValidEmail = validEmail(email);
    if (!email || !isValidEmail) {
        throw new BadRequestError('Invalid email');
    }

    // find the user
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Verification failed');
    }

    // if the user is already verified
    if (user.isVerified) {
        return res.status(StatusCodes.OK).json({ msg: "Already verified" });
    }

    // check if the token is correct
    if (user.verificationToken !== token) {
        throw new UnauthenticatedError('Verification failed');
    }

    // verify the user
    user.isVerified = true;
    user.verifiedDate = new Date(Date.now());
    await user.save();

    res.status(StatusCodes.OK).json({ msg: "Success! You are verified now" });
}

const forgetPassword: RequestHandler = async (req, res) => {
    const { email }: { email: string } = req.body;

    // additional validation
    const isValidEmail = validEmail(email);
    if (!email || !isValidEmail) {
        throw new BadRequestError('Incorrect email');
    }

    // find the user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(StatusCodes.OK).json({ msg: "Please check your email to change your password" });
    }

    // set reset password token and its expiration date
    const resetPasswordtoken = crypto.randomBytes(70).toString('hex');
    const hashedResetPasswordToken = createHash("md5", resetPasswordtoken);
    const expiresDate = 1000 * 60 * 10; // 10 min
    const expiresIn = new Date(Date.now() + expiresDate);
    user.resetPasswordtoken = hashedResetPasswordToken;
    user.passwordTokenExpirationDate = expiresIn;
    await user.save();

    // send reset password email
    sendResetPasswordEmail({
        token: resetPasswordtoken,
        email: user.email,
        name: user.name
    });

    res.status(StatusCodes.OK).json({ msg: "Please check your email to change your password" });
}

const resetPassword: RequestHandler = async (req, res) => {
    const { newPassword, email, token }: { newPassword: string, email: string, token: string } = req.body;

    // additional validation
    const isValidNewPassword = validPassword(newPassword);
    const isValidEmail = validEmail(email);
    if ((!email || !isValidEmail) || (!newPassword || !isValidNewPassword) || !token) {
        throw new BadRequestError('Please provide all corrected values');
    }

    // find the user
    const hashedToken = createHash("md5", token);
    const user = await User.findOne({ email, resetPasswordtoken: hashedToken });
    if (!user) {
        return res.status(StatusCodes.OK).json({ msg: "Success! Password has been changed" });
    }

    // check the expiration token
    const currentTime = new Date(Date.now());
    if (user.passwordTokenExpirationDate! < currentTime) {
        throw new UnauthenticatedError("Expired token");
    }

    // set new password
    user.password = newPassword;
    user.resetPasswordtoken = null;
    user.passwordTokenExpirationDate = null;
    await user.save();

    res.status(StatusCodes.OK).json({ msg: "Success! Password has been changed" });
}


export {
    login,
    logout,
    register,
    verifyEmail,
    resetPassword,
    forgetPassword
};