import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-error";

class UnauthorizedError extends CustomApiError {
    statusCode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

export default UnauthorizedError;