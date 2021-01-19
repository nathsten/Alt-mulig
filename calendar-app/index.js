const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { client } = require('./client.js');
const { encryptPassword, decryptPasword, randomKey } = require('./passProtect.js');
const port = 8080;
const index = express();
index.use(bodyParser.urlencoded({extended: true}));
index.use(cookieParser());

index.listen(port, (err) => {
    if(!err){
        console.log(`Listening on localhost:${port}`)
    }
    else{
        console.error(`Something went wrong: ${err}`);
    }
})

client.connect();

index.use('/open/calendarApp', express.static('public/calendar'));
index.use('/open/calendarApp/signUp', express.static('public/sign-up'));
index.use('/open/calendarApp/signIn', express.static('public/sign-in'));

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

index.post('/open/calendarApp/signUp', (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    client.query(`INSERT INTO userlist(username, password)
    values('${userName}', '${encryptPassword(password)}')`)
    .then(() => client.query(`
        CREATE TABLE IF NOT EXISTS ${userName} (
            eventKey VARCHAR ( 50 ) NOT NULL,
            eventDescription VARCHAR ( 255 ) NOT NULL,
            eventTime VARCHAR ( 50 ) UNIQUE NOT NULL
        );
    `))
    .then(() => client.query(`
        INSERT INTO ${userName}(eventKey, eventDescription, eventTime)
        values('Jan19', 'Teste dette', '18:00');
    `))
    .then(() => res.redirect('/open/calendarApp/signIn'))
    .catch(e => console.log(e));
})

index.post('/open/calendarApp/signIn', (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    client.query(`SELECT * FROM userlist where username = '${userName}'`)
    .then(userData => {
        if(decryptPasword(userData.rows[0].password) === password){
            const time = new Date;
            time.setTime(time.getTime() + 1 * 3600 * 1000);

            res.cookie('userName', userName, {path: '/open/calendarApp', expires: time}).redirect('/open/calendarApp')
        }
        else{
            console.log("NO");
        }
    })
    .catch(e => console.log(e));

    // console.log(`${userName} ${password}`);
    // res.redirect('/open/calendarApp')
})

index.get('/open/calendarApp/getUserEvents', (req, res) => {
    const userName = req.headers.cookie.split(/\n/)[0].split("=")[1];

    const eventList = [];

    client.query(`SELECT * FROM ${userName}`)
    .then(res => {
        const events = res.rows;
        // console.log(events);
        for(let i=0; i<events.length; i++){
            const newEventList = {}
            const date = newEventList[events[i].eventkey] = {};
            date[events[i].eventtime] = {
                eventdescription: events[i].eventdescription,
                eventtime: events[i].eventtime
            };
            eventList.push(newEventList);
        }
    })
    .then(() => res.send(eventList))
    .catch(e => console.log(e));
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

index.get('/checkUserExistence', (req, res) => {
    // res.send({status: "not signed in"});
    res.send({status: "Signed in"});
})

/** ## COMMANDS ##
 * DELETE FROM testUsers
 * where id = 7;
 * 
 * SELECT * FROM testUsers;
 * 
 * INSERT INTO testUsers(username, socre)
 * values('userName', 'score')
 */
