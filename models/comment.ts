import mongoose from "mongoose";


interface Comment {
    user: typeof mongoose.Types.ObjectId,
    profile: typeof mongoose.Types.ObjectId,
    recipe: typeof mongoose.Types.ObjectId,
    content: string,
    edited: boolean
}

export type PartialComment = Partial<Comment>


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
    }
}, { timestamps: true });


// add profile id
commentSchema.pre("save", async function () {
    const profileId = await this.$model("Profile").findOne({ user: this.user });
    this.profile = Object(profileId!._id);
});

// set edited to true when the comment has been updated
commentSchema.pre("updateOne", async function () {
    this.updateOne({ edited: true });
});


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
