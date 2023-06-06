import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface Props {
    avgRating: number
}

const RecipeStars = (props: React.PropsWithoutRef<Props>) => {

    const stars = Array.from({ length: props.avgRating }, (_, i) => <AiFillStar key={i} className="text-orange-400" />);
    const outlineStars = Array.from({ length: 5 - props.avgRating }, (_, i) => <AiOutlineStar key={i} className="text-orange-400" />);

    

    return (
        <div className="flex">
            {stars}
            {outlineStars}
        </div>
    )
}

export default RecipeStars