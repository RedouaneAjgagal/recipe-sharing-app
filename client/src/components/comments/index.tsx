import PostComment from "./PostComment"
import CommentsNav from "./CommentsNav"
import CommentsList from "./CommentsList"


export interface Likes {
    user: string,
    isLike: boolean
}


export interface UComment {
    _id: string
    user: {
        name: string
        role: "user" | "admin"
    },
    content: string
    edited: boolean
    publisher: boolean
    likes: number
    userLike: Likes[]
    createdAt: Date
    profile: string
}

const CommentSection = () => {
    return (
        <section className="py-8">
            <h3 className="text-xl text-slate-900 font-medium tracking-wide pb-4 border-b border-slate-800/50">05 Comments</h3>
            <PostComment />
            <article>
                <CommentsNav />
                <CommentsList />
            </article>
        </section>
    )
}

export default CommentSection