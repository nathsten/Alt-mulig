const { Board, Led } = require('johnny-five');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const port = 4000 || process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use('/', express.static('public'));
server.listen(port, e => e ? console.log(e) : console.log('Board ready'));

new Board();

io.on('connection', socket => {
    socket.on('lightStrengt', ls => {
        brightness(ls);
    });
    socket.on('switch', state => {
        switch(state){
        case "on": turnOn(); break;
        case "off": turnOff(); break;
        case "blink": blink(); break;
        }
    })
})

const turnOn = () => {
    const led = new Led(11);
    led.brightness(255)
};
const turnOff = () => {
    const led = new Led(11);
    led.brightness(0)
};
const blink = () => {
    const led = new Led(11);
    led.blink();
    setTimeout(() => {
        led.stop();
    }, 2000);
}
const brightness = ls => {
    const led = new Led(11);
    led.brightness(ls);
}