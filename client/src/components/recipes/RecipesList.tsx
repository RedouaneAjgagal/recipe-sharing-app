import Recipe from "./Recipe";
import { URecipe } from "./Recipe";

interface Props {
    recipes: URecipe[]
}

// const recipes = [
//     { by: "redoune", title: "Vegan Meatballs", totalTime: 90, avgRating: 5, image: "https://res.cloudinary.com/dqfrgtxde/image/upload/v1682626657/recipe-sharing-app/recipes/17tootired-grilled-cheese-articleLarge_ylryze.jpg" },
//     { by: "vinnex", title: "Vegan Meatballs Version Two", totalTime: 120, avgRating: 0, image: "https://res.cloudinary.com/dqfrgtxde/image/upload/v1683144196/recipe-sharing-app/recipes/vegan-meatballs-sq-3_zlixvz.jpg" },
//     { by: "trapa", title: "Vegan Meatballs With sauce", totalTime: 35, avgRating: 2, image: "https://res.cloudinary.com/dqfrgtxde/image/upload/v1683144196/recipe-sharing-app/recipes/Vegan-Meatballs-Perfect-SQUARE_yelgdy.jpg" }
// ]

const RecipesList = (props: React.PropsWithoutRef<Props>) => {
    return (
        <ul>
            {props.recipes.map(recipe => <Recipe key={recipe._id} avgRating={recipe.avgRating} user={recipe.user} images={recipe.images} title={recipe.title} totalTime={recipe.totalTime} />)}
        </ul>
    )
}

export default RecipesList