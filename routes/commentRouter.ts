import { Router } from "express";
import { createComment, updateComment, deleteComment, likeComment } from "../controllers/commentController";
import authenticateUser from "../middlewares/authentication";


const router = Router();


router.post('/', authenticateUser, createComment);

router.route('/:commentId')
    .patch(authenticateUser, updateComment)
    .delete(authenticateUser, deleteComment);

router.patch('/:commentId/like', authenticateUser, likeComment);


export default router;