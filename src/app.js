"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Express App declaration
let app = (0, express_1.default)();
let port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send("Every thing is fine");
});
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
