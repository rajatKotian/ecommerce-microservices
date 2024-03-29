
export interface IUser {
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    mobile?: string;
    countryCode?: string;
    isEmailVerified?: boolean;
    isMobileVerified?: boolean;
    isActive?: boolean;
    createdBy?: string;
    updatedBy?: string;
};