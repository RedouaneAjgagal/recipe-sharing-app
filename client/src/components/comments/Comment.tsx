import { AiOutlineHeart } from "react-icons/ai"
import { AiFillHeart } from "react-icons/ai"
import { UComment } from "../../pages/Recipe"
import { useSubmit } from "react-router-dom";

interface Props {
    comment: UComment
}

const Comment = (props: React.PropsWithoutRef<Props>) => {
    const submit = useSubmit();
    const currentUser = "humala";

    const likeHandler = () => {
        const formData = new FormData();
        formData.set("commentId", props.comment._id);
        submit(formData, { method: "PATCH" });
    }

    const createdAt = new Date(props.comment.createdAt).toLocaleDateString("en", { year: "numeric", month: "short", day: "2-digit" });

    return (
        <li className="bg-[#ffffff] border border-amber-700/80 p-4 flex flex-col gap-3 rounded-md">
            <div className="flex items-center gap-3 flex-wrap">
                <div className="min-h-full h-14 flex items-center">
                    <img src={props.comment.profile.picture} alt="user's profile picture" className="w-full max-w-[2.5rem] h-[2.5rem] object-cover rounded-full" />
                </div>
                <div className="min-h-full h-14 flex flex-col justify-center">
                    <div className="flex items-center gap-4">
                        <h5 className={`font-medium ${props.comment.user.role === "admin" ? "text-amber-600 " : "text-black"}`}>{props.comment.user.name}</h5>
                        {props.comment.publisher && <span className="bg-indigo-600  text-white px-2 text-sm">Publisher</span>}
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-slate-500 text-sm">{createdAt}</p>
                        {props.comment.edited && <span className="text-xs text-slate-500">(edited)</span>}
                    </div>
                </div>
            </div>
            <div>
                <p className="text-slate-500/90 text-[1.05rem]">{props.comment.content}</p>
            </div>
            <div className="flex items-center gap-2 text-amber-900">
                <button className="flex text-2xl" onClick={likeHandler}>{props.comment.userLike[0]?.user === currentUser && props.comment.userLike[0].isLike ? <AiFillHeart /> : <AiOutlineHeart />}</button>
                <span className="font-medium">{props.comment.likes}</span>
            </div>
        </li>
    )
}

export default Comment