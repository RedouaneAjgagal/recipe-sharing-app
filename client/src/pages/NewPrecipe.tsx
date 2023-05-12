import { ActionFunction, FormMethod } from "react-router-dom"
import CreateRecipe from "../components/createRecipe"
import CreateRecipeNav from "../components/createRecipe/CreateRecipeNav"
import url from "../config/url"

const NewPrecipe = () => {
    return (
        <div>
            <CreateRecipeNav />
            <CreateRecipe />
        </div>
    )
}

export default NewPrecipe


const uploadImage = async (images: Blob[]): Promise<{ src?: string[] }> => {
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

    const formData = await request.formData();

    const ingredients = formData.getAll("ingredientTitle").map((title, index) => {
        return { title, sub: formData.getAll(`ingredient-${index}`) }
    });

    const methods = formData.getAll("methodTitle").map((title, index) => {
        return { title, sub: formData.getAll(`method`)[index] }
    });

    const images = formData.getAll("images") as Blob[];

    const imagesData = await uploadImage(images);


    const recipeDetails = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        note: formData.get("note") as string,
        preparationTime: Number(formData.get("prepTime")),
        cookTime: Number(formData.get("cookTime")),
        images: imagesData?.src,
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

    console.log(data);


    return null
}