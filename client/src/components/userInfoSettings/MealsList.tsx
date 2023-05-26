import { AiOutlinePlus } from "react-icons/ai"
import { useState, useEffect } from "react"
import Meal from "./Meal"


interface Props {
    meals: string[]
    submit: "idle" | "loading" | "submitting";
    onRemove: (index: number) => void;
}

const MealsList = (props: React.PropsWithoutRef<Props>) => {
    const [inputMeals, setInputMeals] = useState<JSX.Element[]>([]);

    const onRemove = (index: number) => {
        props.onRemove(index);
    }

    const meals = props.meals.map((meal, index) => {
        const id = crypto.randomUUID();
        return <Meal content={meal} key={id} onRemove={onRemove} index={index} />
    });


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