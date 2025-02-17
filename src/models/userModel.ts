import mongoose, { Document, Schema, Model } from "mongoose";

// Define the interface for the user document
interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

// Create the schema for the user
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    }
});

// Create the User model based on the schema
const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

// Export the model directly
export default UserModel;