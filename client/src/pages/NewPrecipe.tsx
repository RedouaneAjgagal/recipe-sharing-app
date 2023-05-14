import { ActionFunction, redirect } from "react-router-dom"
import CreateRecipe from "../components/createRecipe"
import CreateRecipeNav from "../components/createRecipe/CreateRecipeNav"
import url from "../config/url"
import { validIngredients, validMethods, validNumber } from "../helpers/recipeValidations"

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
            <CreateRecipe />
        </div>
    )
}

export default NewPrecipe


const uploadImage = async (images: Blob[]): Promise<{ src?: string[], msg?: string }> => {
    const formData = new FormData();

    images.map(item => {
        formData.append('images', item);
    })

    const reponse = await fetch(`${url}/recipes/upload-images`, {
        credentials: "include",
        method: "POST",
        body: formData
    });

    const data = await reponse.json();
    return data
}


export const action: ActionFunction = async ({ request }) => {

    const errors: UErrorsForm = {};

    const formData = await request.formData();

    // Addition checks
    const title = formData.get("title") as string;
    if (title.trim() === "") {
        errors.title = true;
    }

    const prepTime = formData.get("prepTime") as string;
    const isValidPrepTime = validNumber(Number(prepTime));
    if (prepTime.trim() === "" || !isValidPrepTime) {
        errors.prepTime = true
    }

    const cookTime = formData.get("cookTime") as string;
    const isValidcookTime = validNumber(Number(cookTime));
    if (cookTime.trim() === "" || !isValidcookTime) {
        errors.cookTime = true
    }

    const ingredients = formData.getAll("ingredientTitle").map((title, index) => {
        return { title, sub: formData.getAll(`ingredient-${index}`) }
    }) as { title: string, sub: string[] }[];
    const isValidIngredients = validIngredients(ingredients);
    if (!isValidIngredients) {
        errors.ingredients = true
    }

    const methods = formData.getAll("methodTitle").map((title, index) => {
        return { title, sub: formData.getAll(`method`)[index] }
    }) as { title: string, sub: string }[];
    const isValidMethods = validMethods(methods);
    if (!isValidMethods) {
        errors.methods = true
    }

    const images = formData.getAll("images") as Blob[];
    const imagesData = await uploadImage(images);
    if (imagesData.msg) {
        errors.images = imagesData.msg;
    }

    if (Object.keys(errors).length) {
        return { errors }
    }

    const recipeDetails = {
        title,
        description: formData.get("description") as string,
        note: formData.get("note") as string,
        preparationTime: Number(prepTime),
        cookTime: Number(cookTime),
        images: imagesData.src,
        ingredients,
        methods,
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
    
    return redirect("/", {status: 302, statusText: "Found"});
}