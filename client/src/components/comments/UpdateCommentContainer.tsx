import { useRef, useEffect } from "react";
interface Props {
    content: string;
    updatedContent: (value: string) => void;
    isError: boolean;
}

const UpdateCommentContainer = (props: React.PropsWithoutRef<Props>) => {
    const textAreaInput = useRef<HTMLTextAreaElement>(null);

    // set the autofocus cursor to the end of the comment content
    useEffect(() => {
        props.updatedContent(props.content);
        if (textAreaInput.current) {
            const length = props.content.length;
            textAreaInput.current.setSelectionRange(length, length);
        }
    }, []);

    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.updatedContent(e.target.value);
    }

    return (
        <div>
            <textarea id="commentss" autoComplete='off' placeholder='Update your comment' className={`${props.isError && "border-red-600 bg-red-100/50"} bg-slate-100/25 w-full resize-none border rounded-md py-2 px-4  min-h-[6rem] text-slate-600 `} defaultValue={props.content} maxLength={250} autoFocus ref={textAreaInput} onChange={changeHandler}></textarea>
        </div>
    )
}

export default UpdateCommentContainer