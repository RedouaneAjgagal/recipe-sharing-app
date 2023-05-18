import { LoaderFunction, defer, json, useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
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
        avgRating: number,
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
    const { recipeDetails, recipeComments } = useRouteLoaderData("recipeDetails") as { recipeDetails: URecipeDetails, recipeComments: UComment[] };

    return (
        <>
            <Suspense fallback={<p className="text-center">Loading..</p>}>
                <Await resolve={recipeDetails} key={0}>
                    {(loadedDetails) => <RecipeDetails recipeDetails={loadedDetails} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p className="text-center">Loading..</p>}>
                <Await resolve={recipeComments} key={1}>
                    {(loadedComments) => <Comments recipeComments={loadedComments} />}
                </Await>
            </Suspense>

        </>
    )
}

export default Recipe


export const loadRecipeDetails = async (recipeId: string) => {
    const url = `http://localhost:5000/api/v1/recipes/${recipeId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw json({ msg: data.msg }, { status: response.status, statusText: response.statusText });
    }
    return data;
}

const loadRecipeComments = async (recipeId: string, isNewest: boolean) => {
    const sorting = isNewest ? "?newest=true" : ""
    const url = `http://localhost:5000/api/v1/recipes/${recipeId}/comments${sorting}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        throw json({ msg: data.msg, }, { status: response.status, statusText: response.statusText });
    }
    return data;
}

export const loader: LoaderFunction = async ({ params, request }) => {
    const { recipeId } = params;
    const isNewest = new URL(request.url).searchParams.get("newest") === "true";    
    
    return defer({
        recipeDetails: await loadRecipeDetails(recipeId!),
        recipeComments: loadRecipeComments(recipeId!, isNewest)
    });
}