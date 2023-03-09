import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AppConfig } from "../../../../config";
import { ERROR_MESSAGES } from "../../../../utils/constants";
import Logger from "../../../../utils/helpers/Logger";

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
    checkPassword(candidatePassword: string | undefined): Promise<boolean>;
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

userSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user?.password || '', salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }
                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
})

userSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
    Logger.debug(`${password} ${this.password}`)
    return await bcrypt.compare(password, this.password);
};

userSchema.index({ firstName: "text", lastName: "text" });



interface IUserModel extends IUser, mongoose.Document { }
export default mongoose.model<IUserModel>('users', userSchema);
