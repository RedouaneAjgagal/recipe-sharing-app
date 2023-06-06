import { BiTimeFive } from "react-icons/bi";
import RecipeStars from "./RecipeStars";
import { Link } from "react-router-dom";

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
        <li>
            <Link to={`/recipes/${props._id}`} className="group flex flex-col bg-white shadow-lg shadow-slate-300/10 rounded h-full justify-between">
                <div>
                    <div className="overflow-hidden">
                        <img src={props.images[0]} alt="recipe" className="w-full max-w-full h-[13rem] object-cover rounded-t group-hover:scale-125 duration-500" />
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-1 w-full max-w-full">
                        <div className="col-span-2">
                            <p className="text-sm text-slate-500 ">By {props.user.name}</p>
                            <h3 className="text-3xl font-medium mb-5">{props.title}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex items-center justify-between px-4 pb-4">
                    <span className="flex items-center gap-1 text-slate-500"><BiTimeFive /> {props.totalTime} mins</span>
                    {props.avgRating !== 0 ? <RecipeStars avgRating={props.avgRating} /> : null}
                </div>
            </Link>
        </li>
    )
}

export default Recipe