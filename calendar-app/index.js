const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
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
index.use('/open/calendarApp/signUp/error', express.static('public/errors/failedSignUp.html'));
index.use('/open/calendarApp/signIn/error', express.static('public/errors/failedLogin.html'));

index.post('/open/calendarApp/signUp', (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;

    const month = String(new Date()).split(" ")[1];
    const date = new Date().getDate();
    const time = String(new Date()).split("").splice(16, 5).join("");

    if(password == repeatPassword){
        client.query(`INSERT INTO userlist(username, password)
        values('${userName}', '${encryptPassword(password)}')`)
        .then(() => client.query(`
            CREATE TABLE IF NOT EXISTS ${userName} (
                eventKey VARCHAR ( 50 ) NOT NULL,
                eventDescription VARCHAR ( 255 ) NOT NULL,
                eventTime VARCHAR ( 50 ) NOT NULL,
                event_id serial PRIMARY KEY
            );
        `))
        .then(() => client.query(`
            INSERT INTO ${userName}(eventKey, eventDescription, eventTime)
            values('${month+date}', 'Start using this awesome app', '${time}');
        `))
        .then(() => res.redirect('/open/calendarApp/signIn'))
        .catch(e => res.redirect('/open/calendarApp/signUp/error'));
    }
    else{
        res.redirect('/open/calendarApp/signUp/error');
    }
})

index.post('/open/calendarApp/signIn', (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    client.query(`SELECT * FROM userlist where username = '${userName}'`)
    .then(userData => {
        if(decryptPasword(userData.rows[0].password) === password){
            const time = new Date;
            time.setTime(time.getTime() + 1 * 3600 * 1000);

            const key = randomKey();

            client.query(`UPDATE userlist
                SET sign_in_key = '${encryptPassword(key)}'
                where username = '${userName}'`);

            res.cookie('key', encryptPassword(key), {path: '/open/calendarApp', expires: time})
            .cookie('userName', userName, {path: '/open/calendarApp', expires: time})
            .redirect('/open/calendarApp');
        }
        else{
            res.redirect('/open/calendarApp/signIn/error');
        }
    })
    .catch(e => res.redirect('/open/calendarApp/signIn/error'));
})

index.get('/open/calendarApp/getUserEvents', (req, res) => {
    try{
        const cookie = req.headers.cookie.split(" ");
        let userName;
        let key;
        if(cookie[0].split("=")[0] === "key"){
            key = cookie[0].split("=")[1];
            userName = cookie[1].split("=")[1];
        }
        else if(cookie[0].split("=")[0] === "userName"){
            key = cookie[1].split("=")[1];
            userName = cookie[0].split("=")[1];
        }
        if(userName.includes(";")){
            userName = userName.slice(0, userName.indexOf(";"));
        }
        if(key.includes(";")){
            key = key.slice(0, key.indexOf(";"));
        }

        const dates = JSON.parse(fs.readFileSync('dates.json'));

        client.query(`SELECT * FROM userlist
        where username = '${userName}'`)
        .then(data => {
            if(decryptPasword(data.rows[0].sign_in_key) === decryptPasword(key)){
                client.query(`SELECT * FROM ${userName}`)
                .then(res => {
                    const events = res.rows;
                    events.forEach(event => {
                        dates[(event.eventkey)].push({
                            eventdescription: event.eventdescription, 
                            eventtime: event.eventtime,
                            event_id: event.event_id
                        })
                    });
                })
                .then(() => res.send(dates))
            }
            else{
                res.send({status: "Not autorized"})
            }
        })
        .catch(e => res.send({status: "Not autorized"}));
        }
    catch(e){
        res.clearCookie('key', {path: '/open/calendarApp'})
        .clearCookie('userName', {path: '/open/calendarApp'})
        .send({status: "Not autorized"});
        // console.log(e);
    }
})

index.get('/open/calendarApp/getUserName', (req, res) => {
    try{
        const cookie = req.headers.cookie.split(" ");
        let userName;
        let key;
        if(cookie[0].split("=")[0] === "key"){
            key = cookie[0].split("=")[1];
            userName = cookie[1].split("=")[1];
        }
        else if(cookie[0].split("=")[0] === "userName"){
            key = cookie[1].split("=")[1];
            userName = cookie[0].split("=")[1];
        }
        if(userName.includes(";")){
            userName = userName.slice(0, userName.indexOf(";"));
        }
        if(key.includes(";")){
            key = key.slice(0, key.indexOf(";"));
        }
        res.json(userName);
    }
    catch(e){}
})

index.get('/open/calendarApp/addNewEvent/eventName/:eventName/eventTime/:eventTime/eventKey/:eventKey', async (req, res) => {
    const eventName = req.params.eventName;
    const eventTime = req.params.eventTime;
    const eventKey = req.params.eventKey;

    const cookie = req.headers.cookie.split(" ");
    let userName;
    let key;
    if(cookie[0].split("=")[0] === "key"){
        key = cookie[0].split("=")[1];
        userName = cookie[1].split("=")[1];
    }
    else if(cookie[0].split("=")[0] === "userName"){
        key = cookie[1].split("=")[1];
        userName = cookie[0].split("=")[1];
    }
    if(userName.includes(";")){
        userName = userName.slice(0, userName.indexOf(";"));
    }
    if(key.includes(";")){
        key = key.slice(0, key.indexOf(";"));
    }

    const dates = JSON.parse(fs.readFileSync('dates.json'));

    client.query(`
        INSERT INTO ${userName}(eventKey, eventDescription, eventTime)
        values('${eventKey}', '${eventName}', '${eventTime}');
    `)
    .then(() => client.query(`SELECT * FROM ${userName}`))
    .then(res => {
        const events = res.rows;
        events.forEach(event => {
            dates[(event.eventkey)].push({
                eventdescription: event.eventdescription, 
                eventtime: event.eventtime,
                event_id: event.event_id
            })
        })
    })
    .then(() => res.send(dates))
    .catch(e => console.log(e));
})

index.get('/open/calendarApp/deleteEvent/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const cookie = req.headers.cookie.split(" ");
    let userName;
    let key;
    if(cookie[0].split("=")[0] === "key"){
        key = cookie[0].split("=")[1];
        userName = cookie[1].split("=")[1];
    }
    else if(cookie[0].split("=")[0] === "userName"){
        key = cookie[1].split("=")[1];
        userName = cookie[0].split("=")[1];
    }
    if(userName.includes(";")){
        userName = userName.slice(0, userName.indexOf(";"));
    }
    if(key.includes(";")){
        key = key.slice(0, key.indexOf(";"));
    }

    const dates = JSON.parse(fs.readFileSync('dates.json'));

    client.query(`DELETE FROM ${userName}
        where event_id = ${eventId}`
    )
    .then(() => client.query(`SELECT * FROM ${userName}`))
    .then(res => {
        const events = res.rows;
        events.forEach(event => {
            dates[(event.eventkey)].push({
                eventdescription: event.eventdescription, 
                eventtime: event.eventtime,
                event_id: event.event_id
            })
        })
    })
    .then(() => res.send(dates))
    .catch(e => console.log(e));
})

index.post('/open/calendarApp/logout', (req, res) => {
    res.clearCookie('key', {path: '/open/calendarApp'})
    .clearCookie('userName', {path: '/open/calendarApp'})
    .redirect('/open/calendarApp/signIn');
})

/** ## COMMANDS ##
 * DELETE FROM userlist
 * where id = 7;
 * 
 * SELECT * FROM userlist;
 * 
 * INSERT INTO userlist(username, socre)
 * values('userName', 'score')
 * 
 * UPDATE userlist
 * SET sign_in_key = 'noe'
 * where username = 'username'
 */