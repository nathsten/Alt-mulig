const Database = require('./dist/db');

const db = new Database("database");

db.collection("userlist").insert({firstname: 'John', lastname: 'Doe', password: 'skasd'});
db.collection("userlist").insert({firstname: 'Marry', lastname: 'Doe', password: 'skasd'});
db.collection("userlist").insert({firstname: 'Jack', lastname: 'Jones', password: 'skasd'});

// db.collection("userlist").delete({});

db.collection("cars").insert({brand: 'Toyota', model: 'Supra', year: 2010});
db.collection("cars").insert({brand: 'Ford', model: 'Mustang', year: 2018});
db.collection("cars").insert({brand: 'Dogde', model: 'Challenger', year: 2018});

console.log(db.collection("userlist").get({}));
console.log(db.collection("cars").get({}));