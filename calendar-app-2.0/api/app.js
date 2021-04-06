const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(cors());
// app.use(session({secret: ""}));
app.use(bodyParser.urlencoded({extended: true}))

app.listen(PORT, e => e ? console.log(e) : console.log(`listening on port:${PORT}`));

app.get('/test', (req, res) => {
    res.send({status: "I'm alive!"});
})