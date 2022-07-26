"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nconf_1 = __importDefault(require("nconf"));
let environment = process.env.NODE_ENV || "development";
let configClient = nconf_1.default.argv()
    .env()
    .file({ file: `../config/environment/${environment}.json` });
exports.default = configClient;
