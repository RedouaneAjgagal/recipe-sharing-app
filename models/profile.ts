import mongoose, { SchemaType } from "mongoose";


interface Profile {
    _id: string,
    user: typeof mongoose.Types.ObjectId,
    picture: string,
    bio: string,
    favouriteMeals: string[]
}

const profileSchema = new mongoose.Schema<Profile>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    picture: {
        type: String,
        required: [true, "Image is required"],
        default: "https://res.cloudinary.com/dqfrgtxde/image/upload/v1682521049/recipe-sharing-app/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector_zsxy1x.jpg"
    },
    bio: {
        type: String,
        maxlength: [300, "Bio must be less than 300 character"],
        default: "Here is a food lover! Yummy Yummy"
    },
    favouriteMeals: {
        type: [String],
        maxlength: 15
    }
});

profileSchema.index({ user: 1 }, { unique: true });

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;