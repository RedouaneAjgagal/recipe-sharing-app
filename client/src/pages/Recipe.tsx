import { useParams } from "react-router-dom";
import RecipeDetails from "../components/recipeDetails";
import Comments from "../components/comments";
import { useQuery } from "@tanstack/react-query";
import getSingleRecipe from "../fetchers/getSingleRecipe";
import Loading from "../UI/Loading";

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

    const recipeQuery = useQuery({
        queryKey: ["recipe", { recipeId }],
        queryFn: () => getSingleRecipe(recipeId!)
    });
    const recipeDetails: URecipeDetails = recipeQuery.data;

    return (
        <div className="p-4">
            {recipeQuery.isLoading ?
                <Loading />
                :
                <RecipeDetails recipeDetails={recipeDetails} />
            }
            {recipeQuery.isSuccess ?
                <Comments recipeId={recipeDetails.recipe._id} />
                :
                null
            }
        </div>
    )
}

export default Recipe