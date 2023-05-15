import { ActionFunction } from "react-router-dom"
import RecipeFormContainer from "../components/recipeForm"
import { isValidInputs } from "../components/util/recipeFormValidation"
import url from "../config/url"

const UpdateRecipe = () => {
    return (
        <RecipeFormContainer for="updateRecipe" />
    )
}

export default UpdateRecipe


export const action: ActionFunction = async ({ request, params }) => {
    // const { recipeId } = params;

    const formData = await request.formData();

    // add validation
    const { errors } = isValidInputs(formData);
    if (Object.keys(errors).length) {
        return { errors }
    }

    return null;
}