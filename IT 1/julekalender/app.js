const fs = require('fs');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const jokes = JSON.parse(fs.readFileSync('jokes.json'));
const app = express();

app.listen(PORT, e => e ? console.log(e) : console.log(`Listening og 127.0.0.1:${PORT}`));
app.use(cors());
app.use('/', express.static('public'));

app.get('/getJokes', (req, res) => {
    res.send(jokes);
})