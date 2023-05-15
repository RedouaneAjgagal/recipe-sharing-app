import Input from "../Input"
import { useState } from "react";
import Ingredient from "./Ingredient";
import { AiOutlinePlus } from "react-icons/ai"
import { UIngredients } from "../../pages/Recipe";

interface Props {
    nameId: number;
    value?: UIngredients
}

const Ingredients = (props: React.PropsWithoutRef<Props>) => {
    
    const initialIngredients = props.value ? props.value.sub.map((ingredient) => <Ingredient key={crypto.randomUUID()} nameId={props.nameId} value={ingredient} />) : [<Ingredient key={0} nameId={props.nameId} />]

    const [ingredient, setIngredient] = useState(initialIngredients)

    const addIngredientHandler = () => {
        const id = crypto.randomUUID()
        setIngredient(prev => {
            return [...prev, <Ingredient key={id} nameId={props.nameId} />]
        });
    }

    return (
        <div className='bg-gray-200/50 p-3 rounded flex flex-col gap-3'>
            <div>
                <label className="text-lg font-medium text-amber-800">Title</label>
                <Input name='ingredientTitle' placeHolder='E.g. For the meat' type='text' success={true} value={props.value?.title} />
            </div>
            <div className='flex flex-col gap-2'>
                <label className="text-lg font-medium text-amber-800">Ingredients</label>
                <div className="flex flex-col gap-2 relative pb-2">
                    {ingredient.map(item => item)}
                </div>
                <button type="button" onClick={addIngredientHandler} className="flex items-center justify-center bg-slate-200/80 text-slate-700/90 font-medium rounded-full py-1 mt-2"><AiOutlinePlus /> Add New Ingredient</button>
            </div>
        </div>
    )
}

export default Ingredients