import { useState } from "react";
import postComment from "../../features/postComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import StatusResponse from "../StatusResponse";
import useStatusResponse from "../../hooks/useStatusResponse";

const PostComment = () => {
    const { recipeId } = useParams();
    const [comment, setComment] = useState({ value: "", error: false });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => postComment(recipeId!, comment.value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["recipeComments", { recipeId }] })
        }
    });

    const postCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // check if comment is empty
        if (comment.value.trim() === "" || comment.value.trim().length > 250) {
            setComment(prev => {
                return { ...prev, error: true }
            });
            return;
        }
        await mutation.mutateAsync();
        setComment({ error: false, value: "" });
    }

    const errorMsg = mutation.error as Error;

    const commentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(prev => {
            if (prev.error) {
                return { error: false, value: e.target.value }
            }
            return { ...prev, value: e.target.value }
        });
    }

    const isError = useStatusResponse(mutation.isError);

    return (
        <>
            {isError && <StatusResponse message={errorMsg?.message} success={false} />}
            <form method="POST" className='mt-8 mb-10' onSubmit={postCommentHandler}>
                <div className="relative pb-4">
                    <textarea id="comment" autoComplete='off' placeholder='Join the discussion...' className={`${comment.error && "border-red-600 bg-red-100/25"} w-full resize-none border rounded-md py-2 px-4  min-h-[8rem] text-slate-600 `} onChange={commentValue} value={comment.value} maxLength={250}></textarea>
                    <p className="absolute right-0 bottom-0 text-sm text-slate-400">{comment.value.length}/250</p>
                </div>
                <div className="flex md:justify-end">
                    <button disabled={mutation.isLoading} className="w-full px-2 py-[.15rem] rounded-md font-medium bg-[#FFEBCC] text-black border border-[#FFC877] mt-2 flex items-center justify-center md:w-48">
                        {mutation.isLoading ? <ImSpinner2 className="animate-spin text-2xl" /> : "NEW COMMENT"}
                    </button>
                </div>

            </form>
        </>
    )
}

export default PostComment