import { GrFormClose } from "react-icons/gr"
import Input from "../Input"

interface Props {
    nameId: string;
    value?: string;
    ingredientId: string;
    onRemoveIngredient: (ingredientId: string) => void;
    index: number;
}

const Ingredient = (props: React.PropsWithoutRef<Props>) => {
    const name = `ingredient_${props.nameId}`

    const noteToggle = () => {
        props.onRemoveIngredient(props.ingredientId);
    }

    return (
        <div className="flex items-center justify-between gap-2 w-full">
            <Input name={name} placeHolder='Ingredient' type='text' success={true} value={props.value} />
            {props.index !== 0 ?
                <button className={`  font-medium`} type="button" onClick={noteToggle}><GrFormClose className="text-2xl" /></button>
                :
                null
            }
        </div>
    )
}

export default Ingredient