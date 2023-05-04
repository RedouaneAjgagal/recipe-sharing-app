import { BiTimeFive } from "react-icons/bi";
import RecipeStars from "./RecipeStars";

export interface URecipe {
    images: string[]
    title: string
    totalTime: number,
    avgRating: number
    user: { name: string },
    _id?: string
}

const Recipe = (props: React.PropsWithoutRef<URecipe>) => {

    return (
        <div className="mb-10 ">
            <img src={props.images[0]} alt="recipe" className="w-full max-w-[24rem] h-[13rem] object-cover rounded-t" />
            <div className="bg-white p-4 grid grid-cols-2 items-center gap-1 w-full max-w-[24rem] rounded-b shadow-lg shadow-slate-300/10">
                <p className="text-sm text-slate-500 col-span-2">By {props.user.name}</p>
                <h3 className="text-3xl font-medium col-span-2 mb-5">{props.title}</h3>
                <span className="flex items-center gap-1 text-slate-500 col-span-1"><BiTimeFive /> {props.totalTime} mins</span>
                {props.avgRating !== 0 ? <RecipeStars avgRating={props.avgRating} /> : null}
            </div>
        </div>
    )
}

export default Recipe