//@ts-check
/**
 * @param {string} id
 * @returns {object}
 */
const $ = id => document.getElementById(id);

const boardDiv = $("board");
const selectBrick = $("selectBrick");
const selectSPoint = $("selectSPoint");
const selectEPoint = $("selectEPoint");
const deleteBrick = $("deleteBrick");

let shift = false;
let s = false;
let startPoint = false;
let e = false;
let endPoint = false;
let d = false;

let board = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

/**
 * @param {number[][]} b
 */
const drawBoard = b => {
    boardDiv.innerHTML = "";
    for(let i=0; i<b.length; i++){
        for(let j=0; j<b[i].length; j++){
            const n = document.createElement("div");
            n.id = String(i) + ' ' + String(j);
            n.className = "brick";
            if(b[i][j] === 1){
                n.classList.add("selectedBrick")
            }
            if(b[i][j] === 2){
                n.classList.add("endPoint");
            }
            if(b[i][j] === 3){
                n.classList.add("startPoint");
            }
            if(b[i][j] === 4){
                n.classList.add("path");
            }
            boardDiv.append(n);
        }
    }
}
drawBoard(board);

boardDiv.addEventListener("mouseover", 
/**
 * @param {{ target: any; }} e
 */
e => {
    if(shift === true){
        const t = e.target;
        if(t.className.includes("brick")){
            let p = [];
            t.id.split(" ").forEach(n => p.push(Number(n)));
            if(board[p[0]][p[1]] !== 2 && board[p[0]][p[1]] !== 3){
                board[p[0]][p[1]] = 1;
                drawBoard(board);
            }
        }
    }
});

document.addEventListener("keydown", 
/**
 * @param {{keyCode: number}} e 
 */
e => {
    if(e.keyCode === 16){
        shift = true;
        selectBrick.classList.add("activeInfo");
    }
});
document.addEventListener("keyup", 
/**
 * @param {{keyCode: number}} e 
 */
e => {
    if(e.keyCode === 16){
        shift = false;
        selectBrick.classList.remove("activeInfo");
    }
});

document.addEventListener("keydown",
/**
 * @param {{keyCode: number}} n 
 */
n => {
    if(n.keyCode === 69){
        e = true;
        selectEPoint.classList.add("activeInfo");
        boardDiv.addEventListener("click", t => {
            if(e === true && endPoint === false){
                if(t.target.className.includes("brick")){
                    let p = [];
                    t.target.id.split(" ").forEach(n => p.push(Number(n)));
                    board[p[0]][p[1]] = 2;
                    endPoint = true;
                    drawBoard(board);
                }
            }
            e = false;
            selectEPoint.classList.remove("activeInfo");
        })
    }
})

document.addEventListener("keydown",
/**
 * @param {{keyCode: number}} n 
 */
n => {
    if(n.keyCode === 83){
        s = true;
        selectSPoint.classList.add("activeInfo");
        boardDiv.addEventListener("click", t => {
            if(s === true && startPoint === false){
                if(t.target.className.includes("brick")){
                    let p = [];
                    t.target.id.split(" ").forEach(n => p.push(Number(n)));
                    board[p[0]][p[1]] = 3;
                    startPoint = true;
                    drawBoard(board);
                }
            }
            s = false;
            selectSPoint.classList.remove("activeInfo");
        })
    }
})

document.addEventListener("keydown",
/**
 * @param {{keyCode: number}} n 
 */
n => {
    if(n.keyCode === 68){
        d = true;
        deleteBrick.classList.add("activeInfo");
        boardDiv.addEventListener("click", t => {
            if(d === true){
                if(t.target.className.includes("brick")){
                    let p = [];
                    t.target.id.split(" ").forEach(n => p.push(Number(n)));
                    board[p[0]][p[1]] = 0;
                    drawBoard(board);
                }
            }
            d = false;
            deleteBrick.classList.remove("activeInfo");
        })
    }
});