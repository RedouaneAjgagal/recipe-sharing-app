import { ActionFunction, LoaderFunction, redirect } from "react-router-dom"
import RecipeFormContainer from "../components/recipeForm"
import { isValidInputs } from "../components/util/recipeFormValidation"
import url from "../config/url"
import { loadRecipeDetails } from "./Recipe"

const UpdateRecipe = () => {
    return (
        <RecipeFormContainer for="updateRecipe" />
    )
}

export default UpdateRecipe




export const loader: LoaderFunction = async ({ params }) => {
    const { recipeId } = params;
    const recipeDetails = await loadRecipeDetails(recipeId!);
    return { recipeDetails }
}

export const action: ActionFunction = async ({ request, params }) => {


    const formData = await request.formData();

    // add validation
    const { errors, value } = isValidInputs(formData);
    if (Object.keys(errors).length) {
        return { errors }
    }

    // get all inputs data
    const recipeDetails = {
        title: value.title,
        description: formData.get("description") as string,
        note: formData.get("note") as string,
        preparationTime: Number(value.prepTime),
        cookTime: Number(value.cookTime),
        ingredients: value.ingredients,
        methods: value.methods,
    }

    // update recipe request
    const { recipeId } = params;
    const response = await fetch(`${url}/recipes/${recipeId}`, {
        method: request.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(recipeDetails)
    });

    const data = await response.json();

    if (!response.ok) {
        return { response: { msg: data.msg, success: response.ok } }
    }


    return redirect(`/recipes/${recipeId}`, { status: 303, statusText: "See Other" });
}