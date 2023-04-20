import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Name cannot be less than 3 characters"],
        maxLength: [20, "Name cannot be more than 20 characters"],
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        validate: {
            validator: function (value: string) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: (props: { value: string }) => `${props.value} is not a valid email address`
        },
        required: [true, 'Email address is required'],
        unique: true
    },
    password: {
        type: String,
        minLength: [6, "Password cannot be less than 6 characters"],
        maxLength: [60, "Password cannot be more than 60 characters"],
        required: [true, 'Password is required']
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    verificationToken: {
        type: String
    },
    verifiedDate: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: '{VALUE} is not supported'
        },
        default: "user"
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        default: "https://res.cloudinary.com/dqfrgtxde/image/upload/v1681957720/recipe-sharing-app/default-profile-picture_dwfnb9.png"
    }
});

const User = mongoose.model('User', userSchema);

export default User;