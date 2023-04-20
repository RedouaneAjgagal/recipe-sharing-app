import CustomApiError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomApiError {
    statusCode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default BadRequestError;