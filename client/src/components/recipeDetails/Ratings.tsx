import { BsStarFill, BsStar } from "react-icons/bs";

interface Props {
    avgRating: number
}

const Ratings = (props: React.PropsWithoutRef<Props>) => {
    
    const ratedStars = Array.from({ length: props.avgRating }, (_, i) => <BsStarFill key={i} />)
    const unRatedStars = Array.from({ length: 5 - props.avgRating }, (_, i) => <BsStar key={i} />)

    const toRateHandler = () => {
        console.log("to rate");
    }

    return (
        <div className="inline-flex">
            <span onClick={toRateHandler} role="button" className={`flex items-center gap-1 text-[1.2rem] ${props.avgRating === 0 ? "text-amber-900/25" : "text-amber-900"}`}>
                {ratedStars}
                {unRatedStars}
            </span>
        </div>
    )
}

export default Ratings