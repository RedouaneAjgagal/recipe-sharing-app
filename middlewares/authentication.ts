import { verifyToken } from "../utils/createToken";
import { UnauthenticatedError } from "../errors";
import { Response, Request, NextFunction, RequestHandler } from "express";
import { CustomRequest } from "../controllers/userController";


const authenticateUser: RequestHandler = (req: CustomRequest, res, next) => {
    const { accessToken } = req.signedCookies;
    try {
        if (!accessToken) {
            throw new UnauthenticatedError('Authentication failed');
        }
        const userInfo = verifyToken(accessToken);

        req.user = userInfo;
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication failed');
    }
}


export default authenticateUser;