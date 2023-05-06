import PrimaryBtn from '../../UI/PrimaryBtn'

const CommentsNav = () => {
    const topHandler = () => {
        console.log("top comments");
    }
    const recentHandler = () => {
        console.log("recent comments");
    }
    return (
        <nav className='flex gap-4 mt-10 mb-5'>
            <PrimaryBtn onClick={topHandler} style="black">TOP</PrimaryBtn>
            <PrimaryBtn onClick={recentHandler} style="white">RECENT</PrimaryBtn>
        </nav>
    )
}

export default CommentsNav