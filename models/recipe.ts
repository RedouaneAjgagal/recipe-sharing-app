import mongoose from "mongoose";

export interface Ingredients {
    title: string,
    sub: string[]
}

export interface Methods {
    title: string,
    sub: string
}

export interface RecipeImages {
    main: string,
    sub: string[]
}

export interface Recipe {
    user: typeof mongoose.Types.ObjectId,
    title: string,
    description?: string,
    image: RecipeImages,
    note?: string,
    preparationTime: number,
    cookTime: number,
    totalTime?: number,
    ingredients: Ingredients[],
    methods: Methods[],
    avgRating?: number
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
});

const methodsShema = new mongoose.Schema<Methods>({
    title: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        required: true
    }
});

const imageSchema = new mongoose.Schema<RecipeImages>({
    main: {
        type: String,
        required: true
    },
    sub: {
        type: [String],
        maxlength: 4
    }
})

const recipeSchema = new mongoose.Schema<Recipe>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: imageSchema,
        required: true
    },
    note: {
        type: String
    },
    preparationTime: {
        type: Number,
        required: true
    },
    cookTime: {
        type: Number,
        required: true
    },
    totalTime: {
        type: Number
    },
    ingredients: {
        type: [ingredientsShema],
        required: true
    },
    methods: {
        type: [methodsShema],
        required: true
    },
    avgRating: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true });

recipeSchema.pre(["updateOne", "save"], { document: true }, async function () {
    // calc total time
    const totalTime = this.preparationTime + this.cookTime;
    this.totalTime = totalTime;
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;