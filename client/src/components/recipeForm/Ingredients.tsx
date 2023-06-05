import Input from "../Input"
import { useState } from "react";
import Ingredient from "./Ingredient";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai"
import { UIngredients } from "../../pages/Recipe";

interface Props {
    index: number;
    value?: UIngredients;
    ingredientContainerId: string;
    removeIngredientsContainer: (ingredientContainerId: string) => void;
    ingredientsAmount: number;
}

const Ingredients = (props: React.PropsWithoutRef<Props>) => {
    const onRemoveIngredient = (ingredientId: string) => {
        setIngredient(prev => {
            return prev.filter(ingredient => ingredient.key !== ingredientId);
        });
    }

    const initialIngredients = props.value ? props.value.sub.map((ingredient, index) => {
        const id = crypto.randomUUID();
        return <Ingredient key={id} ingredientId={id} nameId={props.ingredientContainerId} value={ingredient} onRemoveIngredient={onRemoveIngredient} index={index} />
    }) : [<Ingredient key="0" ingredientId="0" nameId={props.ingredientContainerId} onRemoveIngredient={onRemoveIngredient} index={0} />]

    const [ingredient, setIngredient] = useState(initialIngredients)

    const addIngredientHandler = () => {
        const id = crypto.randomUUID()
        setIngredient(prev => {
            return [...prev, <Ingredient key={id} ingredientId={id} nameId={props.ingredientContainerId} onRemoveIngredient={onRemoveIngredient} index={prev.length} />]
        });
    }

    const onRemoveIngredientsContainer = () => {
        props.removeIngredientsContainer(props.ingredientContainerId);
    }


    return (
        <div className='bg-gray-200/50 p-3 rounded flex flex-col gap-3'>
            <input type="text" hidden className="sr-only" readOnly value={props.ingredientContainerId} name="ingredientContainerId" />
            <div>
                <label className="text-lg font-medium text-amber-800">Title</label>
                <Input name={`ingredientTitle_${props.ingredientContainerId}`} placeHolder='E.g. For the meat' type='text' success={true} value={props.value?.title} />
            </div>
            <div className='flex flex-col gap-2'>
                <label className="text-lg font-medium text-amber-800">Ingredients</label>
                <div className="flex flex-col gap-2 relative pb-2">
                    {ingredient.map(item => item)}
                </div>
                <button type="button" onClick={addIngredientHandler} className="flex items-center justify-center bg-slate-200/80 text-slate-700/90 font-medium rounded-full py-1 mt-2"><AiOutlinePlus /> Add New Ingredient</button>
            </div>
            {props.index !== 0 ?
                <div className="flex justify-end font-medium text-xl text-red-500">
                    <button type="button" onClick={onRemoveIngredientsContainer} className="px-1">
                        <AiFillDelete />
                    </button>
                </div>
                :
                null
            }
        </div>
    )
}

export default Ingredients