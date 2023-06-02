import Comment from "./Comment"

import { UComment } from "../../pages/Recipe"
import { useQuery } from "@tanstack/react-query";
import { UUser } from "../../pages/Root";

interface Props {
    recipeComments: UComment[];
    recipeId: string;
}

const CommentsList = (props: React.PropsWithoutRef<Props>) => {

    const userQuery = useQuery(["authentication"]);
    const userData = userQuery.data as { user: UUser } | undefined;

    const comments = props.recipeComments.map(comment => <Comment comment={comment} id={comment._id} key={comment._id} recipeId={props.recipeId} isUser={userQuery.isSuccess} userId={userData?.user._id} />)
    return (
        <ul className="flex flex-col gap-4">
            {comments}
        </ul>
    )
}

export default CommentsList