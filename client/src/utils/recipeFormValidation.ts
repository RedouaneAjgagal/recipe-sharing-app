import { UErrorsForm } from "../pages/NewPrecipe";
import { validIngredients, validMethods, validNumber } from "../helpers/recipeValidations"

export const isValidInputs = (formData: FormData) => {
    const errors: UErrorsForm = {};

    const title = formData.get("title") as string;
    if (title.trim() === "") {
        errors.title = true;
    }

    const prepTime = formData.get("prepTime") as string;
    
    const isValidPrepTime = validNumber(Number(prepTime));
    if (prepTime.trim() === "" || !isValidPrepTime) {
        errors.prepTime = true
    }

    const cookTime = formData.get("cookTime") as string;

    const isValidcookTime = validNumber(Number(cookTime));
    if (cookTime.trim() === "" || !isValidcookTime) {
        errors.cookTime = true
    }

    const ingredients = formData.getAll("ingredientTitle").map((title, index) => {
        return { title, sub: formData.getAll(`ingredient-${index}`) }
    }) as { title: string, sub: string[] }[];

    const isValidIngredients = validIngredients(ingredients);
    if (!isValidIngredients) {
        errors.ingredients = true
    }

    const methods = formData.getAll("methodTitle").map((title, index) => {
        return { title, sub: formData.getAll(`method`)[index] }
    }) as { title: string, sub: string }[];

    const isValidMethods = validMethods(methods);
    if (!isValidMethods) {
        errors.methods = true
    }

    return {
        errors,
        value: {
            title,
            prepTime,
            cookTime,
            ingredients,
            methods
        }
    }
}