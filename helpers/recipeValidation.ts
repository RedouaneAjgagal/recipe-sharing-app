import { Ingredients, Methods } from "../models/recipe"

const validIngredients = (ingredients: Ingredients[]) => {
    const isValidIngredients = ingredients?.length > 0 && ingredients.every(ingredient => ingredient.title?.trim().length > 0 && ingredient.sub?.length > 0 && ingredient.sub.every(item => item.trim().length > 0));
    return isValidIngredients
}

const validMethods = (methods: Methods[]) => {
    const isValidMethods = methods?.length > 0 && methods.every(method => method.title?.trim().length > 0 && method.sub?.trim().length > 0);
    return isValidMethods;
}

const validImages = (recipeImages: string[]) => {
    const isValidRecipeImages = recipeImages?.length < 5 && recipeImages.every(item => item.trim().startsWith("https://res.cloudinary.com/dqfrgtxde/image/upload"));
    return isValidRecipeImages;
}

const validNumber = (value: number) => {
    const isValidNumber = /^[0-9]+$/.test(value?.toString());
    return isValidNumber
}

export {
    validIngredients,
    validMethods,
    validImages,
    validNumber
}