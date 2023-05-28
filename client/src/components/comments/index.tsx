import PostComment from "./PostComment"
import CommentsNav from "./CommentsNav"
import CommentsList from "./CommentsList"
import { UComment } from "../../pages/Recipe"
import { ActionFunction, useActionData } from "react-router-dom"
import url from "../../config/url"
import StatusResponse from "../StatusResponse"

interface Props {
    recipeComments: UComment[];
    onSort: (sort: "popular" | "newest") => void;
    recipeId: string
}

const CommentSection = (props: React.PropsWithoutRef<Props>) => {

    const numOfComments = props.recipeComments?.length
    const actionData = useActionData() as { msg: string, success: boolean } | null;

    const onSort = (sort: "popular" | "newest") => {
        props.onSort(sort);
    }


    return (
        <section className="py-8">
            {actionData && <StatusResponse message={actionData.msg} success={actionData.success} />}
            <h3 className="text-xl text-slate-900 font-medium tracking-wide pb-4 border-b border-slate-800/50">{numOfComments} Comments</h3>
            <PostComment />
            <article>
                {numOfComments ?
                    <>
                        <CommentsNav onSort={onSort} />
                        <CommentsList recipeComments={props.recipeComments} recipeId={props.recipeId} />
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


const likeComment = async (commentId: string) => {
    // like comment request
    const response = await fetch(`${url}/comments/${commentId}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    const data = await response.json();

    return { msg: data.msg, success: response.ok };
}


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const commentId = formData.get("commentId") as string;

    // like a comment
    if (request.method === "PATCH") {
        const response = await likeComment(commentId);
        if (!response.success) {
            return response
        }
        return null
    }
}