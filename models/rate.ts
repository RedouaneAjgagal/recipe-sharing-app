import mongoose from "mongoose";


interface Rate {
    user: typeof mongoose.Types.ObjectId,
    recipe: typeof mongoose.Types.ObjectId,
    rate: number
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

rateSchema.index({ user: 1, recipe: 1 }, { unique: true });

const Rate = mongoose.model("Rate", rateSchema);

export default Rate;