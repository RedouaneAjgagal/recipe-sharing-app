import Comment from "./Comment"

import { UComment } from "../../pages/Recipe"

interface Props {
    recipeComments: UComment[]
}

const CommentsList = (props: React.PropsWithoutRef<Props>) => {

    const comments = props.recipeComments.map(comment => <Comment comment={comment} id={comment._id} key={comment._id} />)
    return (
        <ul className="flex flex-col gap-4">
            {comments}
        </ul>
    )
}

export default CommentsList