import UserRecipesList from "./UserRecipesList"
import { useQuery } from "@tanstack/react-query";
import getUserRecipes from "../../fetchers/getUserRecipes";
import Loading from "../../UI/Loading";
import { UProfileRecipes } from "../../pages/ProfileRecipes";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from "../../UI/PrimaryBtn";

const UserRecipes = () => {
    const navigate = useNavigate();
    const userRecipesQuery = useQuery({
        queryKey: ["userRecipes"],
        queryFn: getUserRecipes
    });

    const authenticationQuery = useQuery(["authentication"])

    useEffect(() => {
        if (authenticationQuery.isError && (authenticationQuery.error as Error).message === "Authentication failed") {
            return navigate("/login");
        }
    }, [authenticationQuery.isError, authenticationQuery.error])

    const addRecipeHandler = () => {
        navigate("new-recipe");
    }

    return (
        <div className="p-4">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-xl font-medium tracking-wider">MY RECIPES</h1>
                <div>
                    <PrimaryBtn style="orange" onClick={addRecipeHandler}>ADD RECIPE</PrimaryBtn>
                </div>
            </div>
            {authenticationQuery.isSuccess ?
                userRecipesQuery.isLoading ?
                    <Loading />
                    :
                    <UserRecipesList userRecipes={userRecipesQuery.data as UProfileRecipes[]} />
                :
                null
            }
        </div>
    )
}

export default UserRecipes