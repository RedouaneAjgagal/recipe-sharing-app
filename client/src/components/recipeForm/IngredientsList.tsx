import Ingredients from "./Ingredients"
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import { UIngredients } from "../../pages/Recipe";


interface Props {
    errors?: boolean,
    ingredients?: UIngredients[]
}

const IngredientsList = (props: React.PropsWithoutRef<Props>) => {
    
    const initialIngredients = props.ingredients ? props.ingredients.map((ingredient, index) => <Ingredients key={crypto.randomUUID()} nameId={index} value={ingredient} />) : [<Ingredients key={0} nameId={0} />]

    const [ingredients, setIngredients] = useState(initialIngredients);

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
                <div className="flex flex-col gap-6 relative pb-6">
                    {ingredients.map(ingredient => ingredient)}
                    {props.errors && <span className="absolute bottom-0 left-0 text-sm text-red-700">Please fill out all the ingredients</span>}
                </div>
                <button type="button" onClick={anotherIngredientHandler} className="flex items-center justify-center text-slate-200 bg-slate-800/90 font-medium rounded py-[0.35rem]"><AiOutlinePlus /> Add Another Ingredient</button>
            </div>
        </>
    )
}

export default IngredientsList