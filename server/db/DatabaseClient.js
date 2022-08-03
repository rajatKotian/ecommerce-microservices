"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
class DatabaseClient {
    constructor() {
        // this.connect()
    }
    connect() {
        return new Promise((resolve, reject) => {
            let { uri, options } = config_1.AppConfig.get("mongoDB");
            mongoose_1.default.connect(uri, options, (error) => {
                if (error) {
                    console.log("Mongodb connection Unsuccessful");
                    reject(error);
                }
                else {
                    console.log("Mongodb connection successful");
                    resolve({});
                }
            });
        });
    }
}
exports.default = DatabaseClient;
