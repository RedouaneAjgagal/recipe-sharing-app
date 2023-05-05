import { UIngredients } from "../../pages/Recipe"
import Ingredient from "./Ingredient"

interface Props {
    ingredients: UIngredients[]
}

const Ingredients = (props: React.PropsWithoutRef<Props>) => {

    const ingredientsElement = props.ingredients.map((ingredient, index) => <Ingredient ingredient={ingredient} key={index} />);

    return (
        <section className="mt-6">
            <h2 className="text-2xl text-slate-700 font-medium tracking-wide pb-4 border-b border-slate-800/30">Ingredients</h2>
            {ingredientsElement}
        </section>
    )
}

export default Ingredients