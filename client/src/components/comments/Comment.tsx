import { AiOutlineHeart } from "react-icons/ai"
import { AiFillHeart } from "react-icons/ai"
import { UComment } from "../../pages/Recipe"
import DeleteContainer from "../DeleteContainer";
import UpdateComment from "./UpdateComment";
import { useEffect, useState } from "react";
import UpdateCommentContainer from "./UpdateCommentContainer";
import PrimaryBtn from "../../UI/PrimaryBtn";
import updateComment from "../../features/updateComment";
import likeComment from "../../features/likeComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StatusResponse from "../StatusResponse";
import useStatusResponse from "../../hooks/useStatusResponse";

interface Props {
    id: string;
    comment: UComment;
    recipeId: string;
    userId: string | undefined;
    isUser: boolean;
}

const Comment = (props: React.PropsWithoutRef<Props>) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [updatedComment, setUpdatedComment] = useState({ value: "", error: false });

    const queryClient = useQueryClient();

    const isLike = props.comment.userLike.some(comment => {
        if (comment.isLike === true && props.isUser && comment.user === props.userId) {
            return true;
        }
        return false;
    });


    const likeMutation = useMutation({
        mutationFn: () => likeComment(props.comment._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipeComments", { recipeId: props.recipeId }] });
        }
    })

    const likeHandler = () => {
        likeMutation.mutate();
    }

    const createdAt = new Date(props.comment.createdAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "2-digit" });


    const openUpdateHandler = () => {
        setIsUpdate(true);
    }

    const cancelUpdateHandler = () => {
        setIsUpdate(false);
    }

    const updateMutation = useMutation({
        mutationFn: () => updateComment(updatedComment.value, props.comment._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipeComments", { recipeId: props.recipeId }] })
        }
    });

    const updateCommentHandler = () => {
        if (updatedComment.value.trim() === "" || updatedComment.value.length > 250) {
            setUpdatedComment(prev => {
                return { ...prev, error: true }
            });
            return;
        }
        updateMutation.mutate();
    }

    const getUpdatedContent = (value: string) => {
        setUpdatedComment({ error: false, value });
    }

    useEffect(() => {
        cancelUpdateHandler();
    }, [updateMutation.data]);

    const isError = useStatusResponse((updateMutation.data?.msg || likeMutation.isError));

    return (
        <>
            {isError && <StatusResponse message={updateMutation.data?.msg ? updateMutation.data.msg : (likeMutation.error as Error)?.message} success={false} />}
            <li className="bg-[#ffffff] border border-amber-700/80 p-4 flex flex-col gap-3 rounded-md">
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="min-h-full h-14 flex items-center">
                        <img src={props.comment.profile.picture} alt="user's profile picture" className="w-full max-w-[2.5rem] h-[2.5rem] object-cover rounded-full" />
                    </div>
                    <div className="min-h-full h-14 flex flex-col justify-center">
                        <div className="flex items-center gap-4">
                            <h5 className={`font-medium ${props.comment.user.role === "admin" ? "text-amber-600 " : "text-black"}`}>{props.comment.user.name}</h5>
                            {props.comment.publisher && <span className="bg-indigo-600  text-white px-2 text-sm">Publisher</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-slate-500 text-sm">{createdAt}</p>
                            {props.comment.edited && <span className="text-xs text-slate-500">(edited)</span>}
                        </div>
                    </div>
                </div>
                <div>
                    {isUpdate ?
                        <UpdateCommentContainer isError={updatedComment.error} content={props.comment.content} updatedContent={getUpdatedContent} />
                        :
                        <p className="text-slate-500/90 text-[1.05rem]">{updateMutation.isSuccess && !updateMutation.data.msg ? updateMutation.data : props.comment.content}</p>
                    }
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900">
                        <button className="flex text-2xl" onClick={likeHandler}>{isLike ? <AiFillHeart /> : <AiOutlineHeart />}</button>
                        <span className="font-medium">{props.comment.likes}</span>
                    </div>
                    {props.comment.belongToUser ?
                        (isUpdate ?
                            <div className="flex items-center gap-4">
                                <button onClick={cancelUpdateHandler} className="text-[.95rem] font-medium text-slate-500">Cancel</button>
                                <PrimaryBtn disabled={updateMutation.isLoading} onClick={updateCommentHandler} style="orange">Update</PrimaryBtn>
                            </div>
                            :
                            <div className="flex items-center gap-6">
                                <DeleteContainer commentId={props.comment._id} recipeId={props.recipeId} />
                                <UpdateComment onClick={openUpdateHandler} />
                            </div>)
                        : null
                    }
                </div>
            </li>
        </>

    )
}

export default Comment