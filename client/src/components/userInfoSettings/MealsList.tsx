import { AiOutlinePlus } from "react-icons/ai"
import { useState, useEffect } from "react"



interface Props {
    meals: string[]
    submit: "idle" | "loading" | "submitting"
}

const MealsList = (props: React.PropsWithoutRef<Props>) => {
    const meals = props.meals.map((meal) => <span key={crypto.randomUUID()} className="bg-amber-700 text-white rounded py-[0.15rem] px-2">{meal}</span>)

    const [inputMeals, setInputMeals] = useState<JSX.Element[]>([])

    useEffect(() => {
        setInputMeals([]);
    }, [props.submit === "loading"]);

    // const addMealInputs = 
    const addFavouriteMeal = () => {
        const isLimitMeals = meals.length + inputMeals.length === 15
        if (isLimitMeals) {
            return;
        }
        setInputMeals(prev => {
            const id = crypto.randomUUID();
            return [...prev, <input autoFocus className="w-24 py-[0.15rem] px-1 outline-none rounded bg-amber-700 text-white" key={id} type="text" name={`favouriteMeal_${id}`} />]
        });
    }

    return (
        <div className="-mt-1">
            <label className="text-black font-medium" htmlFor="favouriteMeals">Favourite Meals</label>
            <div className="flex items-center gap-2 flex-wrap mt-1">
                {meals}
                {inputMeals}
                <button onClick={addFavouriteMeal} type="button" className="flex border border-amber-700/50 text-amber-700 p-[0.35rem] rounded"><AiOutlinePlus /></button>
            </div>
        </div>
    )
}

export default MealsList