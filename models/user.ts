import mongoose from "mongoose";
import bcryptJS from "bcryptjs";


interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    verificationToken: string,
    verifiedDate: Date | null,
    resetPasswordtoken: String | null,
    passwordTokenExpirationDate: Date | null,
    role: 'user' | 'admin',
    comparePassword: (candidatePassword: string) => boolean
}

const userSchema = new mongoose.Schema<User>({
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
    resetPasswordtoken: {
        type: String,
        default: null
    },
    passwordTokenExpirationDate: {
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
    }
}, { timestamps: true });


// Add a profile model related to the user when creating a new user
userSchema.post("save", { document: true }, async function (doc) {
    if (!doc.isNew) {
        return;
    }
    await this.$model("Profile").create({ user: this._id });
});


// hash the password when creating a new user
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcryptJS.genSalt(10);
    const hashedPassword = await bcryptJS.hash(this.password, salt);
    this.password = hashedPassword;
});


// a compare password method to check if the password is correct in the login
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const isCorrectPassword = await bcryptJS.compare(candidatePassword, this.password);
    return isCorrectPassword;
}

const User = mongoose.model('User', userSchema);

export default User;