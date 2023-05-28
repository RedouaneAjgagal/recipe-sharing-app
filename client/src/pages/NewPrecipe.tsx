import RecipeFormContainer from "../components/recipeForm"
import CreateRecipeNav from "../components/recipeForm/CreateRecipeNav"

export interface UErrorsForm {
    ingredients?: boolean;
    methods?: boolean;
    prepTime?: boolean;
    cookTime?: boolean;
    title?: boolean;
    images?: string;
}

const NewPrecipe = () => {
    return (
        <div>
            <CreateRecipeNav />
            <RecipeFormContainer for="newRecipe" />
        </div>
    )
}

export default NewPrecipe;