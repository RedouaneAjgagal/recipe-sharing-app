import mongoose from "mongoose";

export interface Ingredients {
    title: string,
    sub: string[]
}

export interface Methods {
    title: string,
    sub: string
}

export interface Recipe {
    user: typeof mongoose.Types.ObjectId,
    title: string,
    description?: string,
    images: string[],
    note?: string,
    preparationTime: number,
    cookTime: number,
    totalTime?: number,
    ingredients: Ingredients[],
    methods: Methods[],
    avgRating?: number,
    createdAt?: Date
}

export type PartialRecipe = Partial<Recipe>

interface RecipeModel extends mongoose.Model<Recipe> {
    calcTotalTime(recipeId: mongoose.Types.ObjectId): Promise<void>;
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
    images: {
        type: [String],
        maxlength: 5,
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


// // total time calculation
// recipeSchema.statics.calcTotalTime = async function (recipeId: mongoose.Types.ObjectId) {
//     const [result] = await this.aggregate([
//         { $match: { _id: recipeId } },
//         {
//             $group: {
//                 _id: null,
//                 totalTime: { $sum: { $sum: ["$preparationTime", "$cookTime"] } }
//             }
//         }
//     ]);
//     await this.findByIdAndUpdate(recipeId, { totalTime: result.totalTime });
// }

// recipeSchema.post(["save", "updateOne"], { document: true }, async function () {
//     await (this.constructor as RecipeModel).calcTotalTime(this._id);
// });


recipeSchema.pre("deleteOne", { document: true, query: false }, async function () {
    // delete all rates related to this recipe
    await this.$model("Rate").deleteMany({ recipe: this._id });

    // delete all comments related to this recipe
    await this.$model("Comment").deleteMany({ recipe: this._id });

    // delete all favourite recipes related to this recipe
    await this.$model("Favourite").deleteMany({ recipe: this._id });
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;