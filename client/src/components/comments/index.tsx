import PostComment from "./PostComment"
import CommentsNav from "./CommentsNav"
import CommentsList from "./CommentsList"
import { UComment } from "../../pages/Recipe"
import { ActionFunction, useActionData } from "react-router-dom"
import url from "../../config/url"
import StatusResponse from "../StatusResponse"

interface Props {
    recipeComments: UComment[]
}

const CommentSection = (props: React.PropsWithoutRef<Props>) => {

    const numOfComments = props.recipeComments?.length
    const actionData = useActionData() as { msg: string, success: boolean } | null;

    return (
        <section className="py-8">
            {actionData && <StatusResponse message={actionData.msg} success={actionData.success} />}
            <h3 className="text-xl text-slate-900 font-medium tracking-wide pb-4 border-b border-slate-800/50">{numOfComments} Comments</h3>
            <PostComment />
            <article>
                {numOfComments ?
                    <>
                        <CommentsNav />
                        <CommentsList recipeComments={props.recipeComments} />
                    </>
                    :
                    <div className="text-slate-500 leading-7 text-lg">
                        <p>So empty..</p>
                        <p>Be the first to comment</p>
                    </div>
                }
            </article>
        </section>
    )
}

export default CommentSection



const createComment = async (recipeId: string | undefined, formData: FormData) => {
    const comment = formData.get("comment") as string;

    // add validations
    if (comment.trim() === "") {
        return { error: true }
    }

    // create comment request
    const response = await fetch(`${url}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            recipe: recipeId,
            content: comment
        })
    });

    const data = await response.json();
    return { msg: data.msg, success: response.ok, value: "" };
}


const likeComment = async (formData: FormData) => {
    const commentId = formData.get("commentId");

    // like comment request
    const response = await fetch(`${url}/comments/${commentId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    const data = await response.json();
    
    return { msg: data.msg, success: response.ok };
}


export const action: ActionFunction = async ({ request, params }) => {
    const { recipeId } = params;
    const formData = await request.formData();

    // Add new comment
    if (request.method === "POST") {
        const response = await createComment(recipeId, formData);
        if (response.error) {
            return { error: response.error }
        }
        return { response }
    }

    // like a comment
    if (request.method === "PATCH") {
        const response = await likeComment(formData);
        if (!response.success) {
            return response
        }
        return null
    }
}