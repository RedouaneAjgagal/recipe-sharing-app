import createUserInfo from "./createUserInfo";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Response } from "express";


const createToken = (user: User) => {
    const userInfo = createUserInfo(user);
    const token = jwt.sign(userInfo, process.env.JWT_SECRET!, { expiresIn: "2h" });
    return token
}

const verifyToken = (token: string) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, name: string, role: string };
    return { id: payload.id, name: payload.name, role: payload.role }
}

const attachTokenToCookies = (res: Response, token: string) => {
    const expiresIn = 2 * 60 * 60 * 1000 // 2h
    res.cookie("accessToken", token, {
        expires: new Date(Date.now() + expiresIn),
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });
}

const destroyCookie = (res: Response, tokenName: string) => {
    res.cookie(tokenName, "logout", {
        expires: new Date(Date.now()),
        signed: true,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })
}

export {
    createToken,
    attachTokenToCookies,
    destroyCookie,
    verifyToken
};