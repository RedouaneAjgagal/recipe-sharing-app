import { useFetcher } from "react-router-dom";
import StatusResponse from "../StatusResponse";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

const PostComment = () => {
    const fetcher = useFetcher();
    const response = fetcher.data?.response as { msg: string, success: boolean };

    const [comment, setComment] = useState({ value: "", error: false });

    const postCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // check if comment is empty
        if (comment.value.trim() === "" || comment.value.trim().length > 250) {
            setComment(prev => {
                return { ...prev, error: true }
            });
            return;
        }

        const formData = new FormData();
        formData.set("comment", comment.value);
        fetcher.submit(formData, { method: "POST" });
        setComment({ error: false, value: "" });
    }

    const commentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(prev => {
            if (prev.error) {
                return { error: false, value: e.target.value }
            }
            return { ...prev, value: e.target.value }
        });
    }

    return (
        <>
            {response && <StatusResponse message={response.msg} success={response.success} />}
            <fetcher.Form method="POST" className='mt-8 mb-10' onSubmit={postCommentHandler} reloadDocument>
                <div className="relative pb-4">
                    <textarea id="comment" autoComplete='off' placeholder='Join the discussion...' className={`${comment.error && "border-red-600 bg-red-100/25"} w-full resize-none border rounded-md py-2 px-4  min-h-[8rem] text-slate-600 `} onChange={commentValue} value={comment.value} maxLength={250}></textarea>
                    <p className="absolute right-0 bottom-0 text-sm text-slate-400">{comment.value.length}/250</p>
                </div>
                <button disabled={fetcher.state !== "idle"} className="w-full px-2 py-[.15rem] rounded-md font-medium bg-[#FFEBCC] text-black border border-[#FFC877] mt-2 flex items-center justify-center">{fetcher.state !== "idle" ? <ImSpinner2 className="animate-spin text-2xl" /> : "NEW COMMENT"}</button>
            </fetcher.Form>
        </>
    )
}

export default PostComment