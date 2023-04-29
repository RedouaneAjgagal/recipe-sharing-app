import { Router } from "express";
import { createComment, updateComment, deleteComment } from "../controllers/commentController";
import authenticateUser from "../middlewares/authentication";


const router = Router();


router.post('/', authenticateUser, createComment);

router.route('/:commentId')
    .patch(authenticateUser, updateComment)
    .delete(authenticateUser, deleteComment);


export default router;