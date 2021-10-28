import fs from 'fs';
import { encrypt, decrypt } from './crypto';

class Database{

    db = {};

    constructor(user: {username: string, password: string}){
        const {
            username,
            password
        } = user;

        console.log(fs.readdir('./', 'utf-8', e => {
            console.log(e);
        }));
        this.db = fs.readFileSync("");
        
    }

    connect(){

    }
}

const db = new Database({username: "hei", password: "noe"});

export default Database;