import uploadImages from "./uploadImages";
import url from "../config/url";
import { isValidInputs } from "../utils/recipeFormValidation";

const postRecipe = async (formData: FormData) => {

    // Add validations
    const { errors, value } = isValidInputs(formData);

    const images = formData.getAll("images") as Blob[];

    const customUrl = `${url}/recipes/upload-images`;

    if (Object.keys(errors).length) {
        return { errors }
    }

    const imagesData = await uploadImages(images, customUrl, "images");
    if (imagesData.msg) {
        errors.images = imagesData.msg;
        return { errors }
    }

    // get all inputs data
    const recipeDetails = {
        title: value.title,
        description: formData.get("description")?.toString(),
        note: formData.get("note")?.toString(),
        preparationTime: Number(value.prepTime),
        cookTime: Number(value.cookTime),
        images: imagesData.src,
        ingredients: value.ingredients,
        methods: value.methods,
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