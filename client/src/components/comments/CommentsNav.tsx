import PrimaryBtn from '../../UI/PrimaryBtn'
import { useState } from "react";

interface Props {
    onSort: (sort: "popular" | "newest") => void;
}

const CommentsNav = (props: React.PropsWithoutRef<Props>) => {

    const [isRecent, setIsRecent] = useState(false);

    const topHandler = () => {
        setIsRecent(false);
        props.onSort("popular");
    }

    const recentHandler = () => {
        setIsRecent(true);
        props.onSort("newest");
    }

    return (
        <nav className='flex gap-4 mb-5'>
            <PrimaryBtn onClick={topHandler} style={`${isRecent ? "white" : "black"}`}>TOP</PrimaryBtn>
            <PrimaryBtn onClick={recentHandler} style={`${isRecent ? "black" : "white"}`}>RECENT</PrimaryBtn>
        </nav>
    )
}

export default CommentsNav