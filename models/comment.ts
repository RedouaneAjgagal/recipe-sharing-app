import mongoose from "mongoose";


interface Comment {
    user: typeof mongoose.Types.ObjectId,
    recipe: typeof mongoose.Types.ObjectId,
    content: string,
    rating: number,
    like: number
}


const commentSchema = new mongoose.Schema<Comment>({
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
    content: {
        type: String,
        required: [true, "Comment content is required"],
        maxlength: 600
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
