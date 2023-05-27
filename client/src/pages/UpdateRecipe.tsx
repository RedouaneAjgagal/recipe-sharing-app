import { ActionFunction, LoaderFunction, redirect } from "react-router-dom"
import RecipeFormContainer from "../components/recipeForm"
import { isValidInputs } from "../utils/recipeFormValidation"
import url from "../config/url"
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

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    // add validation
    const { errors, value } = isValidInputs(formData);
    if (Object.keys(errors).length) {
        return { errors }
    }

    const images = formData.get("images")?.toString().split(",");


    // get all inputs data
    const recipeDetails = {
        title: value.title,
        description: formData.get("description") as string,
        note: formData.get("note") as string,
        preparationTime: Number(value.prepTime),
        cookTime: Number(value.cookTime),
        ingredients: value.ingredients,
        methods: value.methods,
        images
    }

    // update recipe request
    const recipeId = new URL(request.url).searchParams.get("recipeId");

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

    return redirect("..");
}