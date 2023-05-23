import { Link } from "react-router-dom";

interface Props {
    meals: string[];
}

const FavouriteMeals = (props: React.PropsWithoutRef<Props>) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="font-medium">Favourite Meals</h2>
            {props.meals.length ?
                <div className="flex items-center justify-center flex-wrap gap-2">
                    {props.meals.map((meal, index) => <span key={index} className="bg-amber-600 text-white font-medium tracking-wide rounded py-[0.15rem] px-2">{meal}</span>)}
                </div>
                : <p className="">No favourite meals to show. <Link to="settings" className="underline text-amber-700">Add Some</Link></p>
            }
        </div>
    )
}

export default FavouriteMeals