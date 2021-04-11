const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { client } = require('./client.js');
const PORT = process.env.PORT || 5000;

// For the testDB
const { readFileSync, writeFileSync } = require('fs');
var db = JSON.parse(readFileSync('testDB.json'));

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: "test", saveUninitialized: false, resave: false}));

app.listen(PORT, e => e ? console.log(e) : console.log(`listening on port:${PORT}`));

// Connect to mongo db.
client.connect(err => err ? console.log(err) : null);

app.post('/createUser', async (req, res) => {
    const { username, password } = req.body;
    try{
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = {
            username, hashedPwd,
            userID: genKey()
        }
        client.db("calendar-app").collection("userList").insertOne(newUser);
        res.json({status: "success"});
    }
    catch(e){res.json({status: "failed"})}
})

app.post('/signIn', async (req, res) => {
    const { username, password } = req.body;
    try{
        // unwraps and fids the user with passed username
        const [ dbUser ] = await client.db("calendar-app").collection("userList").find({username}).toArray();
        const validatePassword = await bcrypt.compare(password, dbUser.hashedPwd);
        if(validatePassword){
            req.session.user = dbUser;
            // Send real DB userID. 
            res.cookie("userId", dbUser.userID).json({status: "loggedIn"});
        }
        else{
            res.json({status: "Wrong pwd"})
        }
    }
    catch(e){
        res.json({status: "Non exsisting user"})
    }
})

// Validate session id and userID and then send userEvents
app.get('/getUserEvents', async (req, res) => {
    const sid = req.session.user;
    if(sid){
        const [ dbUser ] = await client.db("calendar-app").collection("userList").find({userID: req.cookies.userId}).toArray();
        if(dbUser.hashedPwd == sid.hashedPwd){
            // Send real DB. 
            res.json({allEvents: db.allEvents, status: "signedIn"});
        }
    }
    else{
        res.json({status: "not signed in"});
    }
})

// generates a random key for the eventID and the userID
const genKey = () => {
    const rndLen = Math.floor(Math.random() * 20) + 10;
    const chars = "qwertyuiopasdfghjklzxcvbnm1234567890!#$%&/£€§=";
    const rnd = () => Math.floor(Math.random() * chars.length);
    let str = "";
    for(let i = 0; i < rndLen; i++){
        str+=chars[rnd()];
    }
    return str;
}


// Set up eventList collection
app.post('/addEvent', (req, res) => {
    const { cookies } = req;
    const { text, time, date, month, year } = req.body;
    const key = genKey();
    // test database
    db.allEvents.push({date: `${date}.${month}.${year}`, text, time, completed: false, key});
    writeFileSync('testDB.json', JSON.stringify(db, null, 2));

    // If you are authorized to calendar-page, no need to autorize pwd;
    if(req.session.user){
        // send user events
        // Add event to db.
    
        // Send new eventlist back. 
        res.json(db.allEvents);
    }

})

app.get('/deleteEvent/:eventKey', (req, res) => {
    const { cookies } = req;
    if(req.session.user){
        const key = req.params.eventKey;
        // delete from real db

        // testDB
        db.allEvents = db.allEvents.filter(e => e.key !== key);
        writeFileSync('testDB.json', JSON.stringify(db, null, 2));
        res.json(db.allEvents);
    }

})

app.get('/changeEventState/:key', (req, res) => {
    const { cookies } = req;
    if(req.session.user){
        // change real db
        const key = req.params.key;
    
        // testDB
        db.allEvents.forEach((e, i) => e.key === key ? db.allEvents[i].completed = !db.allEvents[i].completed : undefined);
        writeFileSync('testDB.json', JSON.stringify(db, null, 2));
        res.json(db.allEvents);
    }

})