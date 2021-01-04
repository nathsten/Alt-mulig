//@ts-check
const startBtn = $("start");

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
    boardDiv.childNodes.forEach(a => a.className.includes("startPoint") ? a.id.split(" ").forEach(id => start.push(Number(id))):0);
    boardDiv.childNodes.forEach(a => a.className.includes("endPoint") ? a.id.split(" ").forEach(id => end.push(Number(id))):0);
    let pathFound = false;

    switch(findDirection(end[0], start[0])){
        case "up":{
            switch(findDirection(end[1], start[1])){
                case"up":{
                    console.log("up up");
                    let currentNode = [start[0], start[1]];
                    while(pathFound === false){
                        for(let i=0; i<3; i++){
                            for(let j=0; j<3; j++){
                                if(b[currentNode[0]+i][currentNode[1+j]] === 0){
                                    b[currentNode[0]+i][currentNode[1]+j] = 4;
                                    currentNode = [(currentNode[0]+i), (currentNode[1]+j)]
                                    drawBoard(b);
                                }
                                else if(b[currentNode[0]+i][currentNode[1-j]] === 0){
                                    b[currentNode[0]+i][currentNode[1]-j] = 4;
                                    currentNode = [(currentNode[0]+i), (currentNode[1]-j)]
                                    drawBoard(b);
                                }
                                else if(b[currentNode[0]-i][currentNode[1+j]] === 0){
                                    b[currentNode[0]-i][currentNode[1]+j] = 4;
                                    currentNode = [(currentNode[0]-i), (currentNode[1]+j)]
                                    drawBoard(b);
                                }
                                if(b[currentNode[0]+i][currentNode[1]+j] === 2){
                                    pathFound = true;
                                }
                            }
                        }
                    }
                    break;
                }
                case"down":{
                    console.log("up down");
                    let currentNode = [start[0], start[1]];
                    while(pathFound === false){
                        for(let i=0; i<3; i++){
                            for(let j=0; j<3; j++){
                                if(b[currentNode[0]+i][currentNode[1]] === 2){
                                    pathFound = true;
                                }
                                if(b[currentNode[0]][currentNode[1]+j] === 2){
                                    pathFound = true;
                                }
                                if(b[currentNode[0]+i][currentNode[1]+j] === 2){
                                    pathFound = true;
                                }
                                if(b[currentNode[0]+i][currentNode[1]-j] === 2){
                                    pathFound = true;
                                }
                                if(b[currentNode[0]-i][currentNode[1]+j] === 2){
                                    pathFound = true;
                                }
                                if(b[currentNode[0]][currentNode[1]-j] === 2){
                                    pathFound = true;
                                }
                                if(b[currentNode[0]+i][currentNode[1]] === 2){
                                    pathFound = true;
                                }
                                
                                if(b[currentNode[0]+i][currentNode[1]-j] === 0){
                                    b[currentNode[0]+i][currentNode[1]-j] = 4;
                                    currentNode = [(currentNode[0]+i), (currentNode[1]-j)];
                                    drawBoard(b);
                                }
                                else if(b[currentNode[0]][currentNode[1]-j] === 0){
                                    b[currentNode[0]][currentNode[1]-j] = 4;
                                    currentNode = [(currentNode[0]), (currentNode[1]-j)];
                                    drawBoard(b);
                                }
                                else if(b[currentNode[0]][currentNode[1]+j] === 0){
                                    b[currentNode[0]][currentNode[1]+j] = 4;
                                    currentNode = [(currentNode[0]), (currentNode[1]+j)];
                                    drawBoard(b);
                                }
                                else if(b[currentNode[0]+i][currentNode[1]] === 0){
                                    b[currentNode[0]+i][currentNode[1]] = 4;
                                    currentNode = [(currentNode[0]+i), (currentNode[1])];
                                    drawBoard(b);
                                }
                                else if(b[currentNode[0]-i][currentNode[1]-j] === 0){
                                    b[currentNode[0]-i][currentNode[1]-j] = 4;
                                    currentNode = [(currentNode[0]-i), (currentNode[1]-j)];
                                    drawBoard(b);
                                }
                            }
                        }
                    }
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

startBtn.addEventListener("click", () => {
    if(startPoint === true && endPoint === true){
        findPath(board);
    }
    else{
        alert("Please select start and end point")
    }
});