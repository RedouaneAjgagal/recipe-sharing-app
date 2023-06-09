import { useQuery } from "@tanstack/react-query";
import RecipeFormContainer from "../components/recipeForm"
import CreateRecipeNav from "../components/recipeForm/CreateRecipeNav"
import isAuthenticated from "../fetchers/isAuthenticated";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export interface UErrorsForm {
    ingredients?: boolean;
    methods?: boolean;
    prepTime?: boolean;
    cookTime?: boolean;
    title?: boolean;
    isInvalidImg?: boolean; 
    images?: string;
}

const NewPrecipe = () => {
    const navigate = useNavigate();
    const authenticationQuery = useQuery({
        queryKey: ["authentication"],
        queryFn: isAuthenticated,
        retry: 0
    })

    useEffect(() => {
        if (authenticationQuery.isError && (authenticationQuery.error as Error).message === "Authentication failed") {
            return navigate("/login");
        }
    }, [authenticationQuery.isError, authenticationQuery.error])

    return (
        authenticationQuery.isSuccess ?
            <div className="w-full max-w-[40rem] m-auto">
                <CreateRecipeNav />
                <RecipeFormContainer for="newRecipe" />
            </div>
            :
            null
    )
}

export default NewPrecipe;