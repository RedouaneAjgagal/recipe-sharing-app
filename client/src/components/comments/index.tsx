import PostComment from "./PostComment"
import CommentsNav from "./CommentsNav"
import CommentsList from "./CommentsList"

import { UComment } from "../../pages/Recipe"

interface Props {
    recipeComments: UComment[]
}

const CommentSection = (props: React.PropsWithoutRef<Props>) => {
    return (
        <section className="py-8">
            <h3 className="text-xl text-slate-900 font-medium tracking-wide pb-4 border-b border-slate-800/50">05 Comments</h3>
            <PostComment />
            <article>
                <CommentsNav />
                <CommentsList recipeComments={props.recipeComments} />
            </article>
        </section>
    )
}

export default CommentSection