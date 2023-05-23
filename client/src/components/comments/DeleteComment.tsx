import { AiFillDelete } from "react-icons/ai";
import DeleteCommentContainer from "./DeleteCommentContainer";
import { useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    commentId: string
}

const DeleteComment = (props: React.PropsWithoutRef<Props>) => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const deleteCommentHandler = () => {
        setIsDeleteOpen(true);
        document.body.style.overflow = "hidden";
    }

    const onCancel = () => {
        setIsDeleteOpen(false);
        document.body.style.overflow = "auto";
    } 

    return (
        <>
            <button onClick={deleteCommentHandler} className="flex items-center gap-1 font-medium text-red-600">
                <AiFillDelete className="text-lg" />
                Delete
            </button>
            {isDeleteOpen &&
                createPortal(
                    <DeleteCommentContainer commentId={props.commentId} onCancel={onCancel} />,
                    document.getElementById("overlay")!
                )
            }
        </>
    )
}

export default DeleteComment;