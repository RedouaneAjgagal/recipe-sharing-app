import PrimaryBtn from '../../UI/PrimaryBtn'
import { useSearchParams } from 'react-router-dom';

const CommentsNav = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const isNewest = searchParams.get("newest") === "true";

    const topHandler = () => {
        setSearchParams(prev => {
            prev.delete("newest");
            return prev;
        });
    }

    const recentHandler = () => {
        setSearchParams(prev => {
            prev.set("newest", "true");
            return prev;
        });
    }

    return (
        <nav className='flex gap-4 mb-5'>
            <PrimaryBtn onClick={topHandler} style={`${isNewest ? "white" : "black"}`}>TOP</PrimaryBtn>
            <PrimaryBtn onClick={recentHandler} style={`${isNewest ? "black" : "white"}`}>RECENT</PrimaryBtn>
        </nav>
    )
}

export default CommentsNav