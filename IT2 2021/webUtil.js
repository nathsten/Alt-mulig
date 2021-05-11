const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const session = require('express-session');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: "hyssjj", saveUninitialized: false, resave: false}));

app.use('/', express.static('public'));

const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, e => e ? console.log(e) : console.log(`listening on port:${PORT}`));
// app.listen(PORT, e => e ? console.log(e) : console.log(`listening on port:${PORT}`));

io.on('connection', socket => {
    socket.on('string', data => {

    })
})

// <script src="/socket.io/socket.io.js"></script>
// const socket = io();