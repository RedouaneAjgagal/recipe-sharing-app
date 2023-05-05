import { UIngredients } from "../../pages/Recipe"


interface Props {
    ingredient: UIngredients
}

const Ingredient = (props: React.PropsWithoutRef<Props>) => {

    const subIngredients = props.ingredient.sub.map((ingredient, index) => <li key={index}>{ingredient}</li>)

    return (
        <div className="pt-8">
            <h3 className="text-xl text-slate-700 font-medium tracking-wide mb-2">{props.ingredient.title}:</h3>
            <ul className="list-disc list-inside leading-loose">
                {subIngredients}
            </ul>
        </div>
    )
}

export default Ingredient