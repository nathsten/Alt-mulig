const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { client } = require('./client.js');
const { encryptPassword, decryptPasword } = require('./passProtect.js');
const port = 8080;
const index = express();
index.use(cookieParser());
index.use(bodyParser.urlencoded({extended: true}));

index.listen(port, (err) => {
    if(!err){
        console.log(`Listening on localhost:${port}`)
    }
    else{
        console.error(`Something went wrong: ${err}`);
    }
})

client.connect();

index.use('/open/calendarApp', express.static('calendar'));

index.get('/', async (req, res) => {
    const queryUserlist = await client.query(`SELECT * FROM userlist;`);
    const data = await queryUserlist.rows;
    res.json(data);
});

const fs = require('fs');
const testDates = JSON.parse(fs.readFileSync('testDates.json'));

index.get('/getTestDates', (req, res) => {
    res.json(testDates);
})

index.get('/addNewEvent/eventName/:eventName/eventTime/:eventTime/eventKey/:eventKey', async (req, res) => {
    const eventName = req.params.eventName;
    const eventTime = req.params.eventTime;
    const eventKey = req.params.eventKey;

    console.log(eventName);
    console.log(eventTime);
    console.log(eventKey);

    res.send({status: "success"})

    // Sende til postgres DB
})