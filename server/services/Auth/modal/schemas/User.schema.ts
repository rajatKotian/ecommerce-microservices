import mongoose from "mongoose";
import bcrypt from "bcrypt";

let Schema = mongoose.Schema;

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
    countryCode: string;
    isEmailVerified: boolean;
    isMobileVerified: boolean;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
};

let userSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false,
    },
    countryCode: {
        type: String,
        required: false
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    isMobileVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },

}, { timestamps: true });
userSchema.index({ firstName: "text", lastName: "text" });

interface IUserModel extends IUser, mongoose.Document { }
export default mongoose.model<IUserModel>('users', userSchema);
