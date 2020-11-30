const $ = (id) => document.getElementById(id);

const player = $("player");
const gameDiv = $("gameDiv");
const scoreDiv = $("score");
const highscoreDiv = $("highscore");

let allIntervals = [];

let jumping = false;
let playing = false;
let points = 1;

let playerY = 0;
let playerx = 40;
let playerVY = 1;

let score = 0;
let scoreArr = [];

let scoreInter;

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

const checkSpace = (e) => {if(e.keyCode === 32 || e.keyCode === 13){
    if(jumping !== true && playing !== false){
        jump();
        jumping = true;
    }
}};

const checkEnter = (e) => {if(e.keyCode === 32){
    if(playing !== true){
        if($("block")){
            $("block").remove();
        }
        moveBlock();
        jump();
        scoreUp();
        playing = true;
    }
}};
function checkFail(){
    if((blockX > 460 && blockX < 540) && (playerY < 40)){
        allIntervals.forEach((e) => clearInterval(e));
        alert("Fail");
        blockX = -40;
        blockVX = 2;
        playerY = 0;
        score = 0;
        $("block").style.right = `${blockX}px`;
        player.style.bottom = `${playerY}px`;
        playing = false;
    }
}

setInterval(() => {
    checkFail();
}, 1);

function scoreUp(){
    scoreInter = setInterval(() => {
        score += points;
        scoreDiv.innerHTML = `Score: ${score}`;
    }, 100);
    allIntervals.push(scoreInter);
}

document.addEventListener("keydown", checkSpace);
document.addEventListener("keydown", checkEnter);