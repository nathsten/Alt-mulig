// @ts-check

/**
 * @param {string} id
 * @returns {object}
 */
const $ = (id) => document.getElementById(id);

let player = $("player");
let block = $("block");
const gameDiv = $("gameDiv");
const scoreDiv = $("score");
const highscoreDiv = $("highscore");

let playerMove;
let playerAX;
let blockMove;
let blockAX;
let blockAXTime = 100;
let blockAXIntervall;
let jumping = false;
let playing = false;
let points = 1;
let allIntervals = [];
let score = 0;
let scoreArr = [0];
class gameObject{
    x = 0;
    y = 0;
    vy = 1;
    vx = 1;
    ay = 0.2;
    ax = 0.2;
    div = undefined;

    jump(){
        this.y = 0;
        this.ay = 0.2;
        this.vy = 1;
        playerAX = setInterval(() => {
            this.vy += this.ay;
        }, 1);
        playerMove = setInterval(() => {
            this.y += this.vy;
            this.div.style.bottom = `${this.y}px`;
            if(this.y > 80){
                this.ay = -0.2;
            }
            if(this.y < 0){
                clearInterval(playerAX);
                clearInterval(playerMove);
                jumping = false;
            }
        }, 10);
    allIntervals.push(playerAX, playerMove);
    }

    moveBlock(){
        blockAXIntervall = setInterval(() => {
            blockAXTime -= 5;
        }, 1000);

        blockAX = setInterval(() => {
            this.vx += this.ax;
            score += points;
            scoreDiv.innerHTML = `Score: ${score}`;
        }, blockAXTime);

        blockMove = setInterval(() => {
            this.x += this.vx;
            this.div.style.right = `${this.x}px`;
            checkFail(player.y, block.x);
            if(this.x > 600){
                this.x = -40;
            }
        }, 10);
    allIntervals.push(blockAX, blockMove, blockAXIntervall);
    }
}

player = new gameObject;
player.x = 60;
player.y = 0;
player.vy = 1;
player.ay = 0.2;
player.div = $("player");

block = new gameObject;
block.x = -40;
block.y = 0;
block.vx = 2;
block.ax = 0.01;
block.div = $("block");

/** Starter spill
 * @param {{ keyCode: number; key: string; }} e
 */
const startSpill = (e) => { if(e.keyCode === 32 || e.key === 'Enter' || e.keyCode === 38){
        if(playing !== true){
            block.moveBlock();
            player.jump();
            jumping = true;
            playing = true;
        }
    }
}

/** Hopper hver gang du trykker space
 * @param {{ keyCode: number; key: string; }} e
 */
const checkSpace = (e) => {if(e.keyCode === 32 || e.keyCode === 38){
    if(jumping !== true && playing !== false){
        player.jump();
        jumping = true;
    }
}};

/** Sjekker om player er borti block
 * @param {number} p
 * @param {number} b
 */
const checkFail = (p, b) => {
    if(p < 40 && b > 480 && b < 540){
        allIntervals.forEach((e) => clearInterval(e));
        jumping = false;
        playing = false;
        scoreArr.push(score);
        highscore(scoreArr);
        score = 0;
        block.x = -40;
        blockAXTime = 100;
        block.vx = 2;
    }
}

/**
 * @param {Number[]} arr
 */
function highscore(arr){
    let hs = arr[0];
    for(let i=0; i<arr.length; i++){
        if(arr[i] > hs){hs = arr[i]};
    }
    highscoreDiv.innerHTML = `Highscore: ${hs}`;
    scoreDiv.innerHTML = `Score: ${score}`;
}

highscore(scoreArr);

document.addEventListener("keydown", checkSpace);
document.addEventListener("keydown", startSpill);