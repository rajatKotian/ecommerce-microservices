import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import Logger from "../../../../utils/helpers/Logger";
import { Collections } from "../../../../utils/constants";

let Schema = mongoose.Schema;

export interface IProduct {
    _id: string;
    InvoiceNo: number;
    StockCode: string;
    Description: string;
    Quantity: number;
    InvoiceDate: Date;
    UnitPrice: number;
    CustomerID: number;
    Country: string;
};

let productSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    InvoiceNo: {
        type: Number,
        required: true
    },
    StockCode: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    InvoiceDate: {
        type: Date,
        required: true
    },
    UnitPrice: {
        type: Number,
        required: true
    },
    CustomerID: {
        type: Number,
        required: true
    },
    Country: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
    toObject: {
        transform: function (doc, invoice, options) {
            return invoice;
        }
    },
    toJSON: {
        transform: function (doc, invoice) {
            return invoice;
        }
    },
});

export default mongoose.model<IProduct>(Collections.PRODUCTS, productSchema);
