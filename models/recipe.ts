import mongoose from "mongoose";

interface Ingredients {
    title: string,
    sub: string[]
}

interface Recipe {
    user: typeof mongoose.Types.ObjectId,
    preparationTime: number,
    cookTime: number,
    ingredients: Ingredients[],
    method: string[],
    avgRating:  number
}

const ingredientsShema = new mongoose.Schema<Ingredients>({
    title: {
        type: String,
        required: true
    },
    sub: {
        type: [String],
        required: true
    }
})

const recipeSchema = new mongoose.Schema<Recipe>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    preparationTime: {
        type: Number,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    ingredients: {
        type: [ingredientsShema],
        required: true
    },
    method: {
        type: [],
        required: true
    },
    avgRating: {
        type: Number,
        default: 0,
        required: true
    }
});


const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;