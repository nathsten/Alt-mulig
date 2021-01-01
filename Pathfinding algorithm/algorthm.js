//@ts-check
const start = $("start");

/**
 * @param {number} s
 * @param {number} e
 * @returns {string}
 */
const findDirection = (e, s) => {
    if(s < e){
        return "up";
    }
    if(s > e){
        return "down";
    }
    if(s === e){
        return "diagonal";
    }
}

/**
 * @param {number[][]} b
 */
const findPath = b => {
    let start = [];
    let end = [];
    boardDiv.childNodes.forEach(a => {if(a.className.includes("startPoint")){a.id.split(" ").forEach(id => start.push(Number(id)))}if (a.className.includes("endPoint")){a.id.split(" ").forEach(i => end.push(Number(i)))}});

    // Visualize empty bricks
    for(let i=0; i<b.length; i++){
        for(let j=0; j<b[i].length; j++){
            if(b[start[0]+i][start[1]+j] === 0){
                b[start[0]+i][start[1]+j] = 4;
                drawBoard(b);
            }
            if(b[start[0]-i][start[1]-j] === 0){
                b[start[0]-i][start[1]-j] = 4;
                drawBoard(b);
            }
            if(b[start[0]-i][start[1]+j] === 0){
                b[start[0]-i][start[1]+j] = 4;
                drawBoard(b);
            }
            if(b[start[0]+i][start[1]-j] === 0){
                b[start[0]+i][start[1]-j] = 4;
                drawBoard(b);
            }
        }
    }

    // Mulig ubrukelig...
    switch(findDirection(end[0], start[0])){
        case "up":{
            switch(findDirection(end[1], start[1])){
                case"up":{
                    console.log("up up");
                    for(let i=0; i<b.length; i++){
                        for(let j=0; j<b[i].length; j++){
                            if(b[start[0]+i][start[1]+j] === 0){
                                b[start[0]+i][start[1]+j] = 4;
                                drawBoard(b);
                            }
                        }
                    }
                    break;
                }
                case"down":{
                    console.log("up down");
                    break;
                }
                case"diagonal":{
                    console.log("up diagonal");
                    break;
                }
            }
            break;
        }
        case"down":{
            switch(findDirection(end[1], start[1])){
                case"up":{
                    console.log("down up");
                    break;
                }
                case"down":{
                    console.log("down down");
                    break;
                }
                case"diagonal":{
                    console.log("down diagonal");
                    break;
                }
            }
            break;
        }
        case"diagonal":{
            switch(findDirection(end[1], start[1])){
                case"up":{
                    console.log("diagonal up");
                    break;
                }
                case"down":{
                    console.log("diagonal down");
                    break;
                }
                case"diagonal":{
                    console.log("same brick");
                    break;
                }
            }
            break;
        }
    }
}

start.addEventListener("click", () => {
    if(startPoint === true && endPoint === true){
        findPath(board);
    }
    else{
        alert("Please select start and end point")
    }
});