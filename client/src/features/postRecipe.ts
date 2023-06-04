import url from "../config/url";
import { isValidInputs } from "../utils/recipeFormValidation";
import { validImages } from "../helpers/recipeValidations";


const postRecipe = async (formData: FormData) => {

    // Add validations
    const { errors, value } = isValidInputs(formData);

    const images = formData.get("images")?.toString().split(",") || [];

    const isValidImages = validImages(images)
    let isInvalidImg = false;
    if (Object.keys(errors).length || !isValidImages) {
        if (!isValidImages) {
            isInvalidImg = true;
        }
        return { errors: { ...errors, isInvalidImg } }
    }

    // get all inputs data
    const recipeDetails = {
        title: value.title,
        description: formData.get("description")?.toString(),
        note: formData.get("note")?.toString(),
        preparationTime: Number(value.prepTime),
        cookTime: Number(value.cookTime),
        ingredients: value.ingredients,
        methods: value.methods,
        images
    }

    // creqte recipe request
    const response = await fetch(`${url}/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(recipeDetails)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg);
    }

    return null
}

export default postRecipe;