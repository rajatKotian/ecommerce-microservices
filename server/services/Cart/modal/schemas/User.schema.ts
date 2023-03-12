import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AppConfig } from "../../../../config";
import { ERROR_MESSAGES } from "../../../../utils/constants";
import Logger from "../../../../utils/helpers/Logger";

let Schema = mongoose.Schema;

export interface ICart {
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
    checkPassword(candidatePassword: string | undefined): Promise<boolean>;
};

let cartSchema = new Schema({
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
        required: false,
        select: false
    },
    mobile: {
        type: String,
        required: false,
    },
    countryCode: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
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

}, {
    timestamps: true,
    toObject: {
        transform: function (doc, user, options) {
            delete user.password;
            return user;
        }
    }
});



interface ICartModel extends ICart, mongoose.Document { }
export default mongoose.model<ICartModel>('cart', cartSchema);
