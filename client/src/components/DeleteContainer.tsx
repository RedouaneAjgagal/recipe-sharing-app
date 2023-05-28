import { AiFillDelete } from "react-icons/ai";
import Delete from "./Delete";
import { useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    recipeId: string;
    commentId?: string;
}

const DeleteContainer = (props: React.PropsWithoutRef<Props>) => {
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
            <button onClick={deleteCommentHandler} className="flex items-center gap-1 font-medium text-red-600 p-1">
                <AiFillDelete className="text-lg" />
                Delete
            </button>
            {isDeleteOpen &&
                createPortal(
                    props.commentId ? <Delete recipeId={props.recipeId} commentId={props.commentId} onCancel={onCancel} /> : <Delete recipeId={props.recipeId} onCancel={onCancel} />,
                    document.getElementById("overlay")!
                )
            }
        </>
    )
}

export default DeleteContainer;