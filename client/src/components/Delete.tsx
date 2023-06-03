import { ImSpinner2 } from "react-icons/im";
import Overlay from "../UI/Overlay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteComment from "../features/deleteComment";
import deleteRecipe from "../features/deleteRecipe";

interface Props {
    commentId?: string;
    recipeId: string;
    onCancel: () => void;
}

const Delete = (props: React.PropsWithoutRef<Props>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: props.commentId ? deleteComment : deleteRecipe,
        onSuccess: () => {
            if (props.commentId) {
                queryClient.invalidateQueries({ queryKey: ["recipeComments", { recipeId: props.recipeId }] })
            } else {
                queryClient.invalidateQueries({ queryKey: ["recipes"] })
                queryClient.invalidateQueries({ queryKey: ["userRecipes"] })
            }
        },
        onSettled: () => props.onCancel()
    })
    const deleteCommentHandler = () => {
        props.commentId ? mutation.mutate(props.commentId!) : mutation.mutate(props.recipeId);
    }

    const cancelDeleteHandler = () => {
        if (mutation.isLoading) {
            return;
        }
        props.onCancel();
    }

    return (
        <div className="relative">
            <Overlay onClick={cancelDeleteHandler} />
            <div className="fixed w-full max-w-sm bg-white z-20 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 p-6 flex flex-col gap-4 rounded shadow-xl">
                <h2 className="text-3xl font-medium ">Confirm Deletion</h2>
                <div className="text-slate-500]">
                    <p>Are you sure you want to delete this {props.commentId ? "comment?" : "recipe?"}</p>
                    <p>This action cannot be undone.</p>
                </div>
                <div className="self-end flex gap-4 font-medium">
                    <button disabled={mutation.isLoading} className="bg-gray-500 text-white py-2 w-24 rounded shadow-lg" onClick={cancelDeleteHandler}>Cancel</button>
                    <button disabled={mutation.isLoading} className="bg-red-600 text-white py-2 w-24 rounded shadow-lg flex justify-center items-center" onClick={deleteCommentHandler}>{mutation.isLoading ? <ImSpinner2 className="animate-spin text-2xl" /> : "Delete"}</button>
                </div>
            </div>
        </div>
    )
}

export default Delete;