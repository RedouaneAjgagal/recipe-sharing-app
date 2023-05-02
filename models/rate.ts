import mongoose from "mongoose";
import Recipe from "./recipe";

interface Rate {
    user: typeof mongoose.Types.ObjectId,
    recipe: typeof mongoose.Types.ObjectId,
    rate: number
}

interface RateModel extends mongoose.Model<Rate> {
    getAvgRating(recipeId: mongoose.Types.ObjectId): Promise<void>
}

const rateSchema = new mongoose.Schema<Rate>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        require: [true, "Rating is required!"]
    }
});


rateSchema.statics.getAvgRating = async function (recipeId: mongoose.Types.ObjectId) {
    const [result]: { _id: null, avgRating: number }[] = await this.aggregate([
        { $match: { recipe: recipeId } },
        {
            $group: {
                _id: null,
                avgRating: { $avg: "$rate" }
            }
        }
    ]);
    const avgRating = Math.ceil(result.avgRating);

    await Recipe.findByIdAndUpdate(recipeId, { avgRating }, { timestamps: false });
}

rateSchema.post("save", async function () {
    await (this.constructor as RateModel).getAvgRating(Object(this.recipe));
});

rateSchema.index({ user: 1, recipe: 1 }, { unique: true });

const Rate = mongoose.model("Rate", rateSchema);

export default Rate;