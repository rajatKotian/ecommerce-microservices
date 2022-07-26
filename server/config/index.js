"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const config_1 = __importDefault(require("./config"));
class AppConfig {
    //Get a key value in the environment variable
    static get(key) {
        return config_1.default.get(key);
    }
    //Set a key value in the environment variable
    static set(key, value) {
        return config_1.default.set(key, value);
    }
}
exports.AppConfig = AppConfig;
