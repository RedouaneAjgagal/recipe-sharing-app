import { Response, Request, RequestHandler } from "express"

interface CustomRequest extends Request {
    user?: {
        id: string,
        name: string,
        role: string
    }
}

const currentUser: RequestHandler = async (req: CustomRequest, res) => {
    res.json(req.user);
}



export {
    currentUser,
    CustomRequest
}