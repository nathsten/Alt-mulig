const $ = ids => ids.split(",").map(id => document.getElementById(id));
const [ onBtn, offBtn, blinkBtn, brightnessSlide ] = $("on,off,blink,brightness");

const socket = io();

brightnessSlide.oninput = function(){
    const ls = Number(brightnessSlide.value * 2.55);
    socket.emit('lightStrengt', ls);
}

onBtn.addEventListener("click", () => socket.emit('switch', 'on'));
offBtn.addEventListener("click", () => socket.emit('switch', 'off'));
blinkBtn.addEventListener("click", () => socket.emit('switch', 'blink'));