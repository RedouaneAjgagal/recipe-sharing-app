import Ingredients from "./Ingredients"
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"


const IngredientsList = () => {

    const [ingredients, setIngredients] = useState([<Ingredients key={0} nameId={0} />]);

    const anotherIngredientHandler = () => {
        const id = crypto.randomUUID();
        setIngredients((prev) => {
            return [...prev, <Ingredients key={id} nameId={prev.length} />]
        });
    }

    return (
        <>
            <h2 className='text-2xl font-medium text-slate-700/90 mb-5'>Ingredients</h2>
            <div className="flex flex-col gap-6 py-2">
                {ingredients.map(ingredient => ingredient)}
                <button type="button" onClick={anotherIngredientHandler} className="flex items-center justify-center text-slate-200 bg-slate-800/90 font-medium rounded py-[0.35rem]"><AiOutlinePlus /> Add Another Ingredient</button>
            </div>
        </>
    )
}

export default IngredientsList