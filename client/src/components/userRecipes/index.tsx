import UserRecipesList from "./UserRecipesList"
import { useQuery } from "@tanstack/react-query";
import getUserRecipes from "../../fetchers/getUserRecipes";
import Loading from "../../UI/Loading";
import { UProfileRecipes } from "../../pages/ProfileRecipes";

const UserRecipes = () => {
    const userRecipesQuery = useQuery({
        queryKey: ["userRecipes"],
        queryFn: getUserRecipes
    });
    return (
        <div className="p-4">
            <h1 className="text-xl font-medium tracking-wider mb-6">MY RECIPES</h1>
            {userRecipesQuery.isLoading ?
                <Loading />
                :
                <UserRecipesList userRecipes={userRecipesQuery.data as UProfileRecipes[]} />
            }
        </div>
    )
}

export default UserRecipes