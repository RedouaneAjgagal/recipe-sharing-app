import PostComment from "./PostComment"
import CommentsNav from "./CommentsNav"
import CommentsList from "./CommentsList"
import { UComment } from "../../pages/Recipe"
import StatusResponse from "../StatusResponse"
import { useQuery } from "@tanstack/react-query"
import getRecipeComments from "../../fetchers/getRecipeComments"
import { useState } from "react";
import Loading from "../../UI/Loading"

interface Props {
    recipeId: string
}

const CommentSection = (props: React.PropsWithoutRef<Props>) => {
    const [commentSort, setCommentSort] = useState<"popular" | "newest">("popular");

    const commentsQuery = useQuery({
        queryKey: ["recipeComments", { recipeId: props.recipeId, sort: commentSort }],
        queryFn: () => getRecipeComments(props.recipeId, commentSort),
        keepPreviousData: true
    });
    const recipeComments: UComment[] = commentsQuery.data;

    const onSort = (sort: "popular" | "newest") => {
        setCommentSort(sort);
    }


    return (
        commentsQuery.isLoading ?
            <Loading />
            :
            <section className="py-8">
                {commentsQuery.isError && <StatusResponse message={(commentsQuery.error as Error).message} success={false} />}
                <h3 className="text-xl text-slate-900 font-medium tracking-wide pb-4 border-b border-slate-800/50">{recipeComments.length} Comments</h3>
                <PostComment />
                <article>
                    {recipeComments.length ?
                        <>
                            <CommentsNav onSort={onSort} />
                            <CommentsList recipeComments={recipeComments} recipeId={props.recipeId} />
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

export default CommentSection;