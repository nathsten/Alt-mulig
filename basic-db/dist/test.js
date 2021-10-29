// @ts-check

const { Database } = require('./db');

const db = new Database("test");
// db.collection("users").insert({name: 'Joe', password: 'abc123'});
// db.collection("users").insert({name: 'Marry', password: 'hsjkdhsj'});
console.log(db.collection("users").get({}));