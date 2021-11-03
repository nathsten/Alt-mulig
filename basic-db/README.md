# BASIC - DB


## Installation
NOTE: not avalible on npm yet!
````
npm install basic-db
````

## Code example
```` javascript 
    const Database = require('basic-db');

    const db = new Database("mydb"); // "mydb" will be the name of the database-file. 

    db.collection("cars").insert({brand: 'Toyota', model: 'Supra', year: 2010});

    db.collection("cars").insert({brand: 'Ford', model: 'Mustang', year: 2018});

    db.collection("cars").insert({brand: 'Dogde', model: 'Challenger', year: 2018});

    db.collection("cars").get({}) // returns the whole "cars" collection. 

    db.collection("cars").get({year: 2018})
    /**
        returns: [
            {brand: 'ford', model: 'mustang', year: 2018},
            {brand: 'Dogde', model: 'Challenger', year: 2018}
        ]

    */

   db.collection("cars").delete({model: 2010}) // Deletes all cars with maching year value. 
````