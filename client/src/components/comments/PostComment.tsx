import React from 'react'

const PostComment = () => {

    const postCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.comment.value);
    }

    return (
        <form onSubmit={postCommentHandler} className='mt-8 mb-10'>
            <textarea name="comment" id="comment" autoComplete='off' placeholder='Join the discussion...' className='w-full resize-none border rounded-md py-2 px-4 bg-white min-h-[8rem] text-slate-600'></textarea>
            <button className="w-full px-2 py-[.15rem] rounded-md font-medium bg-[#FFEBCC] text-black border border-[#FFC877] mt-2">NEW COMMENT</button>
        </form>
    )
}

export default PostComment