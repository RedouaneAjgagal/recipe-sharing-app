import mongoose from "mongoose";


interface Favourite {
    user: typeof mongoose.Types.ObjectId,
    recipe: typeof mongoose.Types.ObjectId,
}

const favouriteSchema = new mongoose.Schema<Favourite>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: "Recipe",
        required: true
    }
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;