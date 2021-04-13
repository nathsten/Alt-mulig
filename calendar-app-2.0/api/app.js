const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const { client } = require('./client.js');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: "test", saveUninitialized: false, resave: false}));
app.use("/", express.static("public"));

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
            res.json({status: "loggedIn"});
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
    try{
        const sid = req.session.user;
        if(sid){
            const [ dbUser ] = await client.db("calendar-app").collection("userList").find({userID: sid.userID}).toArray();
            if(dbUser.hashedPwd == sid.hashedPwd){

                const allEvents = await client.db("calendar-app").collection("allEvents").find({userID: dbUser.userID}).toArray();
                res.json({allEvents, status: "signedIn"});
            }
        }
        else{
            res.json({status: "not signed in"});
        }
    }
    catch(e) {res.json({status: "not signed in"});};
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


// Done
app.post('/addEvent', async (req, res) => {
    const { text, time, date, month, year } = req.body;
    const key = genKey();

    // If you are authorized to calendar-page, no need to autorize pwd;
    if(req.session.user){
        const sid = req.session.user;
        const event = {
            date: `${date}.${month}.${year}`, 
            text, time, 
            completed: false,
            key,
            userID: req.session.user.userID
        }
        await client.db("calendar-app").collection("allEvents").insertOne(event);
        const allEvents = await client.db("calendar-app").collection("allEvents").find({userID: sid.userID}).toArray();
        // Send new eventlist back. 
        res.json(allEvents);
    }

})

app.post('/deleteEvent/', async (req, res) => {
    if(req.session.user){
        const sid = req.session.user;
        const { key } = req.body;

        client.db("calendar-app").collection("allEvents").deleteOne({key: key});

        const updAllEvents = await client.db("calendar-app").collection("allEvents").find({userID: sid.userID}).toArray();
        res.json(await updAllEvents);
    }

})

app.post('/changeEventState', async (req, res) => {
    if(req.session.user){
        const sid = req.session.user;
        const { key, state } = req.body;

        await client.db("calendar-app").collection("allEvents").updateOne(
            {key: key}, 
            {$set: {completed: Boolean(state)} },
            { upsert: true }
        );

        const updAllEvents = await client.db("calendar-app").collection("allEvents").find({userID: sid.userID}).toArray();
        res.json(await updAllEvents)
    }
})

app.get('/logout', (req, res) => {
    res.clearCookie("connect.sid").json({status: "success"});
})