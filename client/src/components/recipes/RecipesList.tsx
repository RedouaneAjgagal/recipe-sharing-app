import Recipe from "./Recipe";
import { URecipe } from "./Recipe";

interface Props {
    recipes: URecipe[]
}

const RecipesList = (props: React.PropsWithoutRef<Props>) => {
    return (
        <ul>
            {props.recipes.map(recipe => <Recipe key={recipe._id} avgRating={recipe.avgRating} user={recipe.user} images={recipe.images} title={recipe.title} totalTime={recipe.totalTime} _id={recipe._id} />)}
        </ul>
    )
}

export default RecipesList