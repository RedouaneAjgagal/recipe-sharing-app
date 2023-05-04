
import { URecipeDetails } from "../../pages/Recipe"

interface Props {
    recipeDetails: URecipeDetails
}

const RecipeDetails = (props: React.PropsWithoutRef<Props>) => {
    console.log(props.recipeDetails);

    return (
        <div>RecipeDetails</div>
    )
}

export default RecipeDetails