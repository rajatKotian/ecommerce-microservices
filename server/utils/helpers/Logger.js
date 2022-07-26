"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
class Logger {
    static log(...values) {
        return console.log(...values);
    }
}
exports.default = Logger;
const log = Logger.log;
exports.log = log;
