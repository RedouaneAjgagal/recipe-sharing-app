import { AiOutlineHeart } from "react-icons/ai"
import { AiFillHeart } from "react-icons/ai"
import { UComment } from "."

interface Props {
    comment: UComment
}

const Comment = (props: React.PropsWithoutRef<Props>) => {

    const currentUser = "Mali";

    const likeHandler = () => {
        console.log("like a comment");
    }

    const createdAt = new Date(props.comment.createdAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "2-digit" });

    return (
        <li className="bg-[#ffffff] border border-amber-700/80 p-4 flex flex-col gap-3 rounded-md">
            <div className="flex items-center gap-3">
                <div className="min-h-full h-14 flex items-center">
                    <img src={props.comment.profile} alt="user's profile picture" className="w-full max-w-[2.75rem] h-[2.75rem] object-cover rounded-full" />
                </div>
                <div className="min-h-full h-14 flex flex-col justify-center">
                    <div className="flex items-center gap-4 ">
                        <h5 className="text-black font-medium">{props.comment.user.name}</h5>
                        {props.comment.user.role === "admin" && <span className="bg-amber-700 text-white px-2 text-sm">Admin</span>}
                        {props.comment.publisher && <span className="bg-indigo-600 text-white px-2 text-sm">Publisher</span>}
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-slate-500">{createdAt}</p>
                        {props.comment.edited && <span className="text-xs text-slate-500">(edited)</span>}
                    </div>
                </div>
            </div>
            <div>
                <p className="text-slate-500/90">{props.comment.content}</p>
            </div>
            <div className="flex items-center gap-2 text-amber-900">
                <button className="flex text-2xl" onClick={likeHandler}>{props.comment.userLike[0].user === currentUser && props.comment.userLike[0].isLike ? <AiFillHeart /> : <AiOutlineHeart />}</button>
                <span className="font-medium">{props.comment.likes}</span>
            </div>
        </li>
    )
}

export default Comment