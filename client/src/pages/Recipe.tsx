import { LoaderFunction, json, useLoaderData } from "react-router-dom";
import RecipeDetails from "../components/recipeDetails";
import Comments from "../components/comments";

export interface UIngredients {
    title: string,
    sub: string[]
}

export interface UMethods {
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
        totalTime: number
        ingredients: UIngredients[]
        methods: UMethods[]
        avgRating?: number,
        createdAt: Date,
        updatedAt: Date
    }
}

export interface Likes {
    user: string,
    isLike: boolean
}


export interface UComment {
    _id: string
    user: {
        name: string
        role: "user" | "admin"
    },
    content: string
    edited: boolean
    publisher: boolean
    likes: number
    userLike: Likes[]
    createdAt: Date
    profile: {
        picture: string
    }
}

const Recipe = () => {
    const { recipeDetails, recipeComments } = useLoaderData() as { recipeDetails: URecipeDetails, recipeComments: UComment[] };

    return (
        <>
            <RecipeDetails recipeDetails={recipeDetails} />
            <Comments recipeComments={recipeComments} />
        </>
    )
}

export default Recipe


const loadRecipeDetails = async (recipeId: string) => {
    const url = `http://localhost:5000/api/v1/recipes/${recipeId}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw json({ msg: "Something went wrong.." }, { status: response.status, statusText: response.statusText });
    }
    const data = response.json();
    return data;
}

const loadRecipeComments = async (recipeId: string, isNewest: boolean) => {
    const sorting = isNewest ? "?newest=true" : ""
    const url = `http://localhost:5000/api/v1/recipes/${recipeId}/comments${sorting}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw json({ msg: "Something went wrong..", }, { status: response.status, statusText: response.statusText });
    }
    const data = response.json();
    return data;
}

export const loader: LoaderFunction = async ({ params, request }) => {
    const isNewest = new URL(request.url).searchParams.get("newest") === "true";
    const { recipeId } = params;
    return {
        recipeDetails: await loadRecipeDetails(recipeId!),
        recipeComments: await loadRecipeComments(recipeId!, isNewest)
    };
}