import { useParams } from "react-router-dom";
import RecipeDetails from "../components/recipeDetails";
import Comments from "../components/comments";
import { useQueries } from "@tanstack/react-query";
import getSingleRecipe from "../fetchers/getSingleRecipe";
import getRecipeComments from "../fetchers/getRecipeComments";
import Loading from "../UI/Loading";
import { useState } from "react";

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
        _id: string
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
        avgRating: number
        createdAt: Date
        updatedAt: Date
        isFavourited: boolean
        rated: number
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
    belongToUser: true | null
}

const Recipe = () => {
    const { recipeId } = useParams();
    const [commentSort, setCommentSort] = useState<"popular" | "newest">("popular");
    const [recipeQuery, commentsQuery] = useQueries({
        queries: [
            {
                queryKey: ["recipe", { recipeId }],
                queryFn: () => getSingleRecipe(recipeId!)
            },
            {
                queryKey: ["recipeComments", { recipeId, sort: commentSort }],
                queryFn: () => getRecipeComments(recipeId!, commentSort),
                keepPreviousData: true

            }
        ]
    });
    const recipeDetails: URecipeDetails = recipeQuery.data;
    const recipeComments: UComment[] = commentsQuery.data;


    if (recipeQuery.isLoading) {
        return <Loading />
    }

    const getCommentSorting = (sort: "popular" | "newest") => {
        setCommentSort(sort);
    }

    return (
        <div className="p-4">
            <RecipeDetails recipeDetails={recipeDetails} />
            <Comments recipeComments={recipeComments} onSort={getCommentSorting} />
        </div>
    )
}

export default Recipe