"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const db_1 = __importDefault(require("./db"));
//Express App declaration
let app = (0, express_1.default)();
let port = config_1.AppConfig.get("express:port") || 3000;
app.get('/', (req, res) => {
    res.send("Every thing will surely be fine");
});
app.listen(port, async () => {
    await db_1.default.connect();
    console.log(`server is listening on ${port}`);
});
