const $ = (id) => document.getElementById(id);

const player = $("player");
const gameDiv = $("gameDiv");

let allIntervals = [];

let jumping = false;

let playerY = 0;
let playerx = 40;
let playerVY = 1;

const jump = () => {
    playerY = 1;
    playerVY = 1;
    let move;
    let vxup;
    let down;

    vxup = setInterval(() => {
        playerVY += 0.2;
    }, 1);

    move = setInterval(() => {
        playerY += playerVY;
        player.style.bottom = `${playerY}px`;
    }, 10);

    setTimeout(() => {
        clearInterval(vxup)
        down = setInterval(() => {
            playerVY -= 0.15;
            if(playerY < 0){
                clearInterval(move);
                clearInterval(down);
                playerY = 1;
                jumping = false;
            }
        }, 1);
    }, 130);
    allIntervals.push(move, vxup, down);
}

let blockX = -40;
let blockVX = 2;

const moveBlock = () => {
    const block = document.createElement("div");
    block.id = "block";
    gameDiv.append(block);

    let moveBlock;
    let vankslighetsgrad;
    let time = 10;

    function createMoveBlockTimer(){
        moveBlock = setInterval(() => {
            blockX += blockVX;
            block.style.right = `${blockX}px`;
            checkX();
        }, time);
    }

    createMoveBlockTimer();

    vankslighetsgrad = setInterval(() => {
        blockVX += 0.5
        if(time > 0){
            time -=1;
        }
    }, 5000);

    function checkX(){
        if(blockX > 600){
            clearInterval(moveBlock);
            blockX = -40;
            createMoveBlockTimer();
        }
    }
    allIntervals.push(moveBlock, vankslighetsgrad);
}

const checkSpace = (e) => {if(e.keyCode === 32){
    if(jumping !== true){
        jump();
        jumping = true;
    }
}};

moveBlock();

const checkFail = () => {
    if((blockX > 460 && blockX < 540) && (playerY < 40)){
        alert("Feil");
        allIntervals.forEach((e) => clearInterval(e));
        blockX = -40;
        blockVX = 2;
        playerY = 0;
        $("block").style.right = `${blockX}px`;
        player.style.bottom = `${playerY}px`;
    }
}

setInterval(() => {
    checkFail();
}, 10);

document.addEventListener("keydown", checkSpace);