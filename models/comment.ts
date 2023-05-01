import mongoose, { Schema } from "mongoose";
import { Recipe } from "./recipe";


export interface Likes {
    user: typeof mongoose.Types.ObjectId,
    isLike: boolean
}

interface Comment {
    user: typeof mongoose.Types.ObjectId,
    profile: typeof mongoose.Types.ObjectId,
    recipe: typeof mongoose.Types.ObjectId,
    content: string,
    edited: boolean,
    publisher: boolean,
    userLike: Likes[],
    likes: number
}

export type PartialComment = Partial<Comment>


const likeSchema = new mongoose.Schema<Likes>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    isLike: {
        type: Boolean,
        default: true
    }
});

const commentSchema = new mongoose.Schema<Comment>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    profile: {
        type: mongoose.Types.ObjectId,
        ref: "Profile"
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
    edited: {
        type: Boolean,
        default: false
    },
    publisher: {
        type: Boolean,
        default: false
    },
    userLike: {
        type: [likeSchema]
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    }
}, { timestamps: true });


commentSchema.pre("save", { document: true, query: false }, async function () {
    if (this.isNew) {
        // add profile to the model
        const profileId = await this.$model("Profile").findOne({ user: this.user });
        this.profile = Object(profileId!._id);
        // check if the user is the recipe publisher
        const recipe = await this.$model("Recipe").findById(this.recipe) as Recipe;
        const isPublisher = recipe.user.toString() === this.user.toString();
        if (isPublisher) {
            this.publisher = true;
        }
    }
});

// set edited to true when the comment has been updated
commentSchema.pre("updateOne", async function () {
    this.updateOne({ edited: true });
});


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
