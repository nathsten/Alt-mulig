import fs from 'fs';
import { encrypt, decrypt } from './crypto';

class Database{

    private db: any;
    private collectionValue: string;
    private dbName: string;

    constructor(name: string){
        this.collectionValue = "";
        this.dbName = name;
        try{
            const db = fs.readFileSync(`${this.dbName}.db`, 'utf-8');
            this.db = JSON.parse(decrypt(JSON.parse(db)));
        }
        catch(error){
            const dbInfo = JSON.stringify({});
            fs.writeFileSync(`${this.dbName}.db`, JSON.stringify(encrypt(dbInfo)))
        }
    }

    /**
     * @param collectioName name of the collection you want to select.
     * @returns 
     */

    collection(collectioName: string){
        this.collectionValue = collectioName;
        return {get: this.get, insert: this.insert, delete: this.delete, db: this.db, collectionValue: this.collectionValue, dbName: this.dbName};
    }
    /**
     * @param args argumenst to filter out rows
     * @returns {Array<Object>} 
     */
    private get(args: any){
        if(Object.keys(args).length > 0){
            var dbFilter: any = {};
            Object.keys(args).forEach((arg: string) => {
                dbFilter = this.db[this.collectionValue].filter((row: any) => row[arg] === args[arg])
            });
            return dbFilter;
        }
        return this.db[this.collectionValue] || [];
    }

    private insert(obj: Object): void{
        if(this.db[this.collectionValue]){
            this.db[this.collectionValue].push(obj)
        }
        else{
            this.db[this.collectionValue] = [obj];
        }
        fs.writeFileSync(`${this.dbName}.db`, JSON.stringify(encrypt(JSON.stringify(this.db))));
    }

    private delete(args: any): void{
        if(Object.keys(args).length > 0){
            try{
                Object.keys(args).forEach((arg: string) => {
                    this.db[this.collectionValue].forEach((row: any, index: number) => {
                        if(row[arg] === args[arg]) this.db[this.collectionValue].splice(index, 1);
                    })
                });

                fs.writeFileSync(`${this.dbName}.db`, JSON.stringify(encrypt(JSON.stringify(this.db))));
            
            } catch(err) { console.log(err) }

        }
    }
}

export default Database;