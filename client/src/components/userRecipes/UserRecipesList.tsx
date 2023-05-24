import UserRecipe from "./UserRecipe"

const UserRecipesList = () => {
    return (
        <div className="flex flex-col gap-4">
            <UserRecipe image="https://res.cloudinary.com/dqfrgtxde/image/upload/v1683144196/recipe-sharing-app/recipes/Vegan-Meatballs-Perfect-SQUARE_yelgdy.jpg" title="Vegan Meatballs With Sauce" _id="6461179016e736647167a3cb" />
            <UserRecipe image="https://res.cloudinary.com/dqfrgtxde/image/upload/v1682626657/recipe-sharing-app/recipes/17tootired-grilled-cheese-articleLarge_ylryze.jpg" title="Vegan Meatballs With Sauce" _id="6461179016e736647167a3cb" />
            <UserRecipe image="https://res.cloudinary.com/dqfrgtxde/image/upload/v1683144196/recipe-sharing-app/recipes/Vegan-Meatballs-Perfect-SQUARE_yelgdy.jpg" title="Vegan Meatballs With Sauce" _id="6461179016e736647167a3cb" />
        </div>
    )
}

export default UserRecipesList