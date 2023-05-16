import { useFetcher } from "react-router-dom";
import StatusResponse from "../StatusResponse";

const PostComment = () => {
    const fetcher = useFetcher();
    const error = fetcher.data?.error;
    const response = fetcher.data?.response as { msg: string, success: boolean, value: string };

    const clearErrorHandler = () => {
        if (error) {
            return fetcher.data.error = null
        }
    }

    return (
        <>
        {response && <StatusResponse message={response.msg} success={response.success} />}
        <fetcher.Form method="POST" className='mt-8 mb-10'>
            <textarea name="comment" id="comment" autoComplete='off' placeholder='Join the discussion...' className={`${error && "border-red-600 bg-red-100/25"} w-full resize-none border rounded-md py-2 px-4  min-h-[8rem] text-slate-600 `} onChange={clearErrorHandler} value={response?.value}></textarea>
            <button className="w-full px-2 py-[.15rem] rounded-md font-medium bg-[#FFEBCC] text-black border border-[#FFC877] mt-2">NEW COMMENT</button>
        </fetcher.Form>
        </>
    )
}

export default PostComment