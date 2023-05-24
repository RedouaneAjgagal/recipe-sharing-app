import UserRecipe from "./UserRecipe"

const UserRecipesList = () => {
    return (
        <div className="flex flex-col gap-4">
            <UserRecipe image="https://res.cloudinary.com/dqfrgtxde/image/upload/v1683144196/recipe-sharing-app/recipes/Vegan-Meatballs-Perfect-SQUARE_yelgdy.jpg" title="Vegan Meatballs With Sauce" />
            <UserRecipe image="https://res.cloudinary.com/dqfrgtxde/image/upload/v1682626657/recipe-sharing-app/recipes/17tootired-grilled-cheese-articleLarge_ylryze.jpg" title="Vegan Meatballs With Sauce" />
            <UserRecipe image="https://res.cloudinary.com/dqfrgtxde/image/upload/v1683144196/recipe-sharing-app/recipes/Vegan-Meatballs-Perfect-SQUARE_yelgdy.jpg" title="Vegan Meatballs With Sauce" />
        </div>
    )
}

export default UserRecipesList