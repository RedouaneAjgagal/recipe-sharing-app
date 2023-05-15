import { ActionFunction, redirect } from "react-router-dom"
import RecipeFormContainer from "../components/recipeForm"
import CreateRecipeNav from "../components/recipeForm/CreateRecipeNav"
import url from "../config/url"
import { isValidInputs } from "../components/util/recipeFormValidation"

export interface UErrorsForm {
    ingredients?: boolean;
    methods?: boolean;
    prepTime?: boolean;
    cookTime?: boolean;
    title?: boolean;
    images?: string;
}

const NewPrecipe = () => {
    return (
        <div>
            <CreateRecipeNav />
            <RecipeFormContainer for="newRecipe" />
        </div>
    )
}

export default NewPrecipe


const uploadImage = async (images: Blob[]): Promise<{ src?: string[], msg?: string }> => {
    const formData = new FormData();

    images.map(item => {
        formData.append('images', item);
    });

    const reponse = await fetch(`${url}/recipes/upload-images`, {
        credentials: "include",
        method: "POST",
        body: formData
    });

    const data = await reponse.json();
    return data
}


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    // Add validations
    const { errors, value } = isValidInputs(formData);

    const images = formData.getAll("images") as Blob[];
    const imagesData = await uploadImage(images);
    if (imagesData.msg) {
        errors.images = imagesData.msg;
    }

    if (Object.keys(errors).length) {
        return { errors }
    }

    const recipeDetails = {
        title: value.title,
        description: formData.get("description") as string,
        note: formData.get("note") as string,
        preparationTime: Number(value.prepTime),
        cookTime: Number(value.cookTime),
        images: imagesData.src,
        ingredients: value.ingredients,
        methods: value.methods,
    }

    const response = await fetch(`${url}/recipes`, {
        method: request.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeDetails),
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        return { response: { msg: data.msg, success: response.ok } }
    }

    return redirect("/", { status: 302, statusText: "Found" });
}