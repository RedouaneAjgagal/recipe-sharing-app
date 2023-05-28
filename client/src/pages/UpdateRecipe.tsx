import { LoaderFunction, redirect } from "react-router-dom"
import RecipeFormContainer from "../components/recipeForm"
import getSingleRecipe from "../fetchers/getSingleRecipe"
const UpdateRecipe = () => {
    return (
        <RecipeFormContainer for="updateRecipe" />
    )
}

export default UpdateRecipe

export const loader: LoaderFunction = async ({ request }) => {
    const recipeId = new URL(request.url).searchParams.get("recipeId");

    if (!recipeId) {
        return redirect("..");
    }

    const recipeDetails = await getSingleRecipe(recipeId);

    return recipeDetails
}