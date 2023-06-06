import Recipe from "./Recipe";
import { URecipe } from "./Recipe";

interface Props {
    recipes: URecipe[]
}

const RecipesList = (props: React.PropsWithoutRef<Props>) => {
    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:justify-start sm:gap-x-2 sm:gap-y-4 md:grid-cols-3">
            {props.recipes.map(recipe => <Recipe key={recipe._id} avgRating={recipe.avgRating} user={recipe.user} images={recipe.images} title={recipe.title} totalTime={recipe.totalTime} _id={recipe._id} />)}
        </ul>
    )
}

export default RecipesList