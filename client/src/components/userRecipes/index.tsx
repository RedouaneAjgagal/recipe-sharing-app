import UserRecipesList from "./UserRecipesList"

const UserRecipes = () => {
    return (
        <div className="p-4">
            <h1 className="text-xl font-medium tracking-wider mb-6">MY RECIPES</h1>
            <UserRecipesList />
        </div>
    )
}

export default UserRecipes