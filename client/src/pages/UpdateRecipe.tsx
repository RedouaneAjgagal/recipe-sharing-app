import RecipeFormContainer from "../components/recipeForm"
import { useEffect } from "react";
import isAuthenticated from "../fetchers/isAuthenticated";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const UpdateRecipe = () => {
    const navigate = useNavigate();
    const authenticationQuery = useQuery({
        queryKey: ["authentication"],
        queryFn: isAuthenticated,
        retry: 0
    })

    useEffect(() => {
        if (authenticationQuery.isError && (authenticationQuery.error as Error).message === "Authentication failed") {
            return navigate("/login", { replace: true });
        }
    }, [authenticationQuery]);

    return (
        authenticationQuery.isSuccess ?
            <div className="w-full max-w-[40rem] m-auto">
                <RecipeFormContainer for="updateRecipe" userId={authenticationQuery.data.user._id} />
            </div>
            :
            null
    )
}

export default UpdateRecipe;