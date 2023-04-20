import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";


const login = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ msg: "login Controller" });
}

const logout = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ msg: "logout Controller" });
}

const register = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ msg: "register Controller" });
}

export {
    login,
    logout,
    register
};