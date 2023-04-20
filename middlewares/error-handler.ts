import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "mongoose";

interface Err {
    statusCode: number,
    message: string,
    code: number,
    keyValue: string
}

const errorHandler = (err: Err, req: Request, res: Response, next: NextFunction) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong. Please try later'
    }
    if (err instanceof Error.ValidationError) {
        customError.msg = Object.values(err.errors).map(item => item.message).join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 1100) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err instanceof Error.CastError) {
        customError.msg = `No item found with id ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandler;
