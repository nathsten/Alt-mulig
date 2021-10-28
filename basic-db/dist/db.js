"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Database {
    constructor(user) {
        this.db = {};
        const { username, password } = user;
        console.log(fs_1.default.readdir('./', 'utf-8', e => {
            console.log(e);
        }));
        this.db = fs_1.default.readFileSync("");
    }
    connect() {
    }
}
const db = new Database({ username: "hei", password: "noe" });
exports.default = Database;
