import url from "../config/url";
import { isValidInputs } from "../utils/recipeFormValidation";

const updateRecipe = async (formData: FormData) => {
    // add validation
    console.log(formData.get("note"));
    const { errors, value } = isValidInputs(formData);
    if (Object.keys(errors).length) {
        return { errors }
    }

    const images = formData.get("images")?.toString().split(",");
    const note = formData.get("note") ? formData.get("note")!.toString() : ""


    // get all inputs data
    const recipeDetails = {
        title: value.title,
        description: formData.get("description")?.toString(),
        note,
        preparationTime: Number(value.prepTime),
        cookTime: Number(value.cookTime),
        ingredients: value.ingredients,
        methods: value.methods,
        images
    }

    // update recipe request
    const recipeId = new URL(window.location.href).searchParams.get("recipeId");

    const response = await fetch(`${url}/recipes/${recipeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(recipeDetails)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg);
    }

    return null;
}

export default updateRecipe;