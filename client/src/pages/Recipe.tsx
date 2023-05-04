import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import RecipeDetails from "../components/recipeDetails";

interface Ingredients {
    title: string,
    sub: string[]
}

interface Methods {
    title: string,
    sub: string
}

export interface URecipeDetails {
    user: {
        name: string
        picture: string
    }
    recipe: {
        _id: string
        user: string
        title: string
        description?: string
        images: string[]
        note?: string
        preparationTime: number
        cookTime: number
        totalTime?: number
        ingredients: Ingredients[]
        methods: Methods[]
        avgRating?: number,
        createdAt: Date,
        updatedAt: Date
    }
}

const Recipe = () => {
    const recipeDetails = useLoaderData() as URecipeDetails;    
    return (
        <RecipeDetails recipeDetails={recipeDetails} />
    )
}

export default Recipe


export const loader: LoaderFunction = async ({ params }) => {
    const { recipeId } = params;
    const url = `http://localhost:5000/api/v1/recipes/${recipeId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw json("Something went wrong..", { status: response.status, statusText: response.statusText });
    }
    const data = response.json();
    return data;
}