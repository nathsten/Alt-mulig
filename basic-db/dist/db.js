"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const crypto_1 = require("./crypto");
class Database {
    /**
     * @param {string} name Name of the database
     */
    constructor(name) {
        this.collectionValue = "";
        this.dbName = name;
        try {
            const db = fs_1.default.readFileSync(`${this.dbName}.db`, 'utf-8');
            this.db = JSON.parse(crypto_1.decrypt(JSON.parse(db)));
        }
        catch (error) {
            this.db = {};
            fs_1.default.writeFileSync(`${this.dbName}.db`, JSON.stringify(crypto_1.encrypt(JSON.stringify(this.db))));
        }
    }
    /**
     * @param {string} collectioName  Name of the collection you want to select.
     * @returns
     */
    collection(collectioName) {
        this.collectionValue = collectioName;
        return { get: this.get, insert: this.insert, delete: this.delete, db: this.db, collectionValue: this.collectionValue, dbName: this.dbName };
    }
    /**
     * @param {Object} args Argumenst to filter out rows
     * @returns {Array<Object>}
     */
    get(args) {
        if (Object.keys(args).length > 0) {
            var dbFilter = {};
            Object.keys(args).forEach((arg) => {
                dbFilter = this.db[this.collectionValue].filter((row) => row[arg] === args[arg]);
            });
            return dbFilter;
        }
        return this.db[this.collectionValue] || [];
    }
    /**
     * @param {Object} obj The object you want to insert into the collection.
     */
    insert(obj) {
        if (this.db[this.collectionValue]) {
            this.db[this.collectionValue].push(obj);
        }
        else {
            this.db[this.collectionValue] = [obj];
        }
        fs_1.default.writeFileSync(`${this.dbName}.db`, JSON.stringify(crypto_1.encrypt(JSON.stringify(this.db))));
    }
    /**
     * @param {object} args Criteria for what to delete
     */
    delete(args) {
        if (Object.keys(args).length > 0) {
            try {
                Object.keys(args).forEach((arg) => {
                    this.db[this.collectionValue].forEach((row, index) => {
                        if (row[arg] === args[arg])
                            this.db[this.collectionValue].splice(index, 1);
                    });
                });
                fs_1.default.writeFileSync(`${this.dbName}.db`, JSON.stringify(crypto_1.encrypt(JSON.stringify(this.db))));
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}
module.exports = { Database };
