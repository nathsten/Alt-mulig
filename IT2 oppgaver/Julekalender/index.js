const express = require('express');
const fs = require('fs');
const port = 3000;
const index = express();

index.listen(port, (e) => {
    if(e){
        console.log(`Noe gikk galt... ${e}`);
    }
    else{
        console.log(`Listening on localhost:${port}`);
    }
});
index.use(express.static('public'));

const allEvents = JSON.parse(fs.readFileSync('allEvents.json'));

index.get('/allEvents', (req, res) => {
    res.send(allEvents);
});

index.get('/dateID/:id/eventValue/:value', (req, res) => {
    const dateID = req.params.id;
    const dateValue = req.params.value;

    if(!allEvents[dateID]){
        allEvents[dateID] = dateValue;
    }

    fs.writeFileSync('allEvents.json', JSON.stringify(allEvents, null, 2));
    res.send(`Hendelsen til ${dateID} er lagret til ${dateValue}`);
});

index.get('/deleteItem/:dateID', (req, res) => {
    const dateID = req.params.dateID;

    delete allEvents[dateID];
    fs.writeFileSync('allEvents.json', JSON.stringify(allEvents, null, 2));

    res.send(`Hendelsen til ${dateID} er fjernet`);
});