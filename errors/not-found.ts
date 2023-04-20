import CustomApiError from "./custom-error";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomApiError {
    statusCode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export default NotFoundError;