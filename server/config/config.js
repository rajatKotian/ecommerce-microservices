"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nconf_1 = __importDefault(require("nconf"));
const helpers_1 = __importDefault(require("../utils/helpers"));
let log = helpers_1.default.log;
let environment = process.env.NODE_ENV || "development";
let configClient = nconf_1.default.argv()
    .env()
    .file({ file: require.resolve('./environment/' + environment + '.json') });
exports.default = configClient;
