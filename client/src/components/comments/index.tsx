import PostComment from "./PostComment"
import CommentsNav from "./CommentsNav"
import CommentsList from "./CommentsList"

import { UComment } from "../../pages/Recipe"

interface Props {
    recipeComments: UComment[]
}

const CommentSection = (props: React.PropsWithoutRef<Props>) => {

    const numOfComments = props.recipeComments?.length
    
    return (
        <section className="py-8">
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