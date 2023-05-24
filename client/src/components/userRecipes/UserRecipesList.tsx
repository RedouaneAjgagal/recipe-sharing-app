import UserRecipe from "./UserRecipe"
import { useLoaderData } from "react-router-dom"
import { UProfileRecipes } from "../../pages/ProfileRecipes";

const UserRecipesList = () => {
    const userRecipes = useLoaderData() as UProfileRecipes[];
    
    return (
        <div className="flex flex-col gap-4">
            {userRecipes.map(recipe => <UserRecipe key={recipe._id} id={recipe._id} image={recipe.images[0]} title={recipe.title} />)}
        </div>
    )
}

export default UserRecipesList