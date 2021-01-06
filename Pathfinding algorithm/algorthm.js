//@ts-check
const startBtn = $("start");

/**
 * @param {number} s
 * @param {number} e
 * @returns {string}
 */
const findDirection = (e, s) => {
    if(s <= e){
        return "up";
    }
    if(s >= e){
        return "down";
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
    let currentNode = [start[0], start[1]];

    const UpUp = () => {
        // Down
        if(b[currentNode[0]+1][currentNode[1]] === 0){
            if(currentNode[0] >= end[0] && b[currentNode[0]][currentNode[1]+1] === 0){
                if(currentNode[1] >= end[1] && b[currentNode[0]-1][currentNode[1]] === 0){
                    b[currentNode[0]-1][currentNode[1]] = 4;
                    currentNode = [currentNode[0]-1, currentNode[1]];
                    drawBoard(b);
                }
                else{
                    b[currentNode[0]][currentNode[1]+1] = 4;
                    currentNode = [currentNode[0], currentNode[1]+1];
                    drawBoard(b);
                }
            }
            else{
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
        }
        // Right
        else if(b[currentNode[0]][currentNode[1]+1] === 0){
            if(currentNode[1] >= end[1] && b[currentNode[0]+1][currentNode[1]] === 0){
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
            else{
                b[currentNode[0]][currentNode[1]+1] = 4;
                currentNode = [currentNode[0], currentNode[1]+1];
                drawBoard(b);
            }
        }
        // Up
        else if(b[currentNode[0]-1][currentNode[1]] === 0){
            b[currentNode[0]-1][currentNode[1]] = 4;
            currentNode = [currentNode[0]-1, currentNode[1]];
            drawBoard(b);
        }
        // Left
        else if(b[currentNode[0]][currentNode[1]-1] === 0){
            b[currentNode[0]][currentNode[1]-1] = 4;
            currentNode = [currentNode[0], currentNode[1]-1];
            drawBoard(b);
        }
    }

    const downDown = () => {
        // Up
        if(b[currentNode[0]-1][currentNode[1]] === 0){
            if(currentNode[0] <= end[0] && b[currentNode[0]][currentNode[1]-1] === 0){
                b[currentNode[0]][currentNode[1]-1] = 4;
                currentNode = [currentNode[0], currentNode[1]-1];
                drawBoard(b);
            }
            else{
                b[currentNode[0]-1][currentNode[1]] = 4;
                currentNode = [currentNode[0]-1, currentNode[1]];
                drawBoard(b);
            }
        }
        // Left
        else if(b[currentNode[0]][currentNode[1]-1] === 0){
            if(currentNode[1] <= end[1] && b[currentNode[0]-1][currentNode[1]] === 0){
                // Up
                b[currentNode[0]-1][currentNode[1]] = 4;
                currentNode = [currentNode[0]-1, currentNode[1]];
                drawBoard(b);
            }
            else{
                // Left
                b[currentNode[0]][currentNode[1]-1] = 4;
                currentNode = [currentNode[0], currentNode[1]-1];
                drawBoard(b);
            }
        }

        // Down
        else if(b[currentNode[0]+1][currentNode[1]] === 0){
            if(currentNode[0] >= end[0] && b[currentNode[0]][currentNode[1]+1] === 0){
                b[currentNode[0]][currentNode[1]+1] = 4;
                currentNode = [currentNode[0], currentNode[1]+1];
                drawBoard(b);
            }
            else{
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
        }
        // Right
        else if(b[currentNode[0]][currentNode[1]+1] === 0){
            if(currentNode[1] >= end[1] && b[currentNode[0]+1][currentNode[1]] === 0){
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
            else{
                b[currentNode[0]][currentNode[1]+1] = 4;
                currentNode = [currentNode[0], currentNode[1]+1];
                drawBoard(b);
            }
        }
    }

    const upDown = () => {
        // Down
        if(b[currentNode[0]+1][currentNode[1]] === 0){
            if(currentNode[0] >= end[0] && b[currentNode[0]][currentNode[1]-1] === 0){
                // Left
                b[currentNode[0]][currentNode[1]-1] = 4;
                currentNode = [currentNode[0], currentNode[1]-1];
                drawBoard(b);
            }
            else{
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
        }
        // Left
        else if(b[currentNode[0]][currentNode[1]-1] === 0){
            if(currentNode[0] <= end[0] && b[currentNode[0]+1][currentNode[1]] === 0){
                // Down
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
            else{
                // Left
                b[currentNode[0]][currentNode[1]-1] = 4;
                currentNode = [currentNode[0], currentNode[1]-1];
                drawBoard(b);
            }
        }
        // Up
        else if(b[currentNode[0]-1][currentNode[1]] === 0){
            if(currentNode[0] <= end[0] && b[currentNode[0]][currentNode[1]-1] === 0){
                b[currentNode[0]][currentNode[1]-1] = 4;
                currentNode = [currentNode[0], currentNode[1]-1];
                drawBoard(b);
            }
            else{
                b[currentNode[0]-1][currentNode[1]] = 4;
                currentNode = [currentNode[0]-1, currentNode[1]];
                drawBoard(b);
            }
        }
        // Right
        else if(b[currentNode[0]][currentNode[1]+1] === 0){
            if(currentNode[1] >= end[1] && b[currentNode[0]+1][currentNode[1]] === 0){
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
            else{
                b[currentNode[0]][currentNode[1]+1] = 4;
                currentNode = [currentNode[0], currentNode[1]+1];
                drawBoard(b);
            }
        }
    }

    const downUp = () => {
        // Right
        if(b[currentNode[0]][currentNode[1]+1] === 0){
            if(currentNode[0] <= end[0] && b[currentNode[0]-1][currentNode[1]] === 0){
                // Up
                b[currentNode[0]-1][currentNode[1]] = 4;
                currentNode = [currentNode[0]-1, currentNode[1]];
                drawBoard(b);
            }
            else{
                b[currentNode[0]][currentNode[1]+1] = 4;
                currentNode = [currentNode[0], currentNode[1]+1];
                drawBoard(b);
            }
        }
        // Up
        else if(b[currentNode[0]-1][currentNode[1]] === 0){
            if(currentNode[1] <= end[1] && b[currentNode[0]][currentNode[1]+1] === 0){
                // Right
                b[currentNode[0]][currentNode[1]+1] = 4;
                currentNode = [currentNode[0], currentNode[1]+1];
                drawBoard(b);
            }
            else{
                b[currentNode[0]-1][currentNode[1]] = 4;
                currentNode = [currentNode[0]-1, currentNode[1]];
                drawBoard(b);
            }
        }

        // Down
        else if(b[currentNode[0]+1][currentNode[1]] === 0){
            if(currentNode[0] >= end[0] && b[currentNode[0]][currentNode[1]-1] === 0){
                // Left
                b[currentNode[0]][currentNode[1]-1] = 4;
                currentNode = [currentNode[0], currentNode[1]-1];
                drawBoard(b);
            }
            else{
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
        }
        // Left
        else if(b[currentNode[0]][currentNode[1]-1] === 0){
            if(currentNode[0] <= end[0] && b[currentNode[0]+1][currentNode[1]] === 0){
                // Down
                b[currentNode[0]+1][currentNode[1]] = 4;
                currentNode = [currentNode[0]+1, currentNode[1]];
                drawBoard(b);
            }
            else{
                // Left
                b[currentNode[0]][currentNode[1]-1] = 4;
                currentNode = [currentNode[0], currentNode[1]-1];
                drawBoard(b);
            }
        }

    }

    switch(findDirection(end[0], start[0])){
        case "up":{
            switch(findDirection(end[1], start[1])){
                case"up":{
                    console.log("up up");
                    while(pathFound === false){
                        if(b[currentNode[0]-1][currentNode[1]] === 2
                            || b[currentNode[0]+1][currentNode[1]] === 2
                            || b[currentNode[0]][currentNode[1]+1] === 2
                            || b[currentNode[0]][currentNode[1]-1] === 2){
                                pathFound = true;
                        }
                        if(currentNode[0] > end[0] && currentNode[1] > end[1]){
                            downDown();
                        }
                        else if(currentNode[0] < end[0] && currentNode[1] > end[1]){
                            upDown();
                        }
                        else if(currentNode[0] > end[0] && currentNode[1] < end[1]){
                            downUp();
                        }
                        else{
                            UpUp();
                        }
                        if(pathFound === true){
                            break;
                        }
                    }
                    break;
                }
                case"down":{
                    console.log("up down");
                    while(pathFound === false){
                        if(b[currentNode[0]-1][currentNode[1]] === 2
                            || b[currentNode[0]+1][currentNode[1]] === 2
                            || b[currentNode[0]][currentNode[1]+1] === 2
                            || b[currentNode[0]][currentNode[1]-1] === 2){
                                pathFound = true;
                        }
                        if(currentNode[0] > end[0] && currentNode[1] < end[1]){
                            downDown();
                        }
                        else if(currentNode[0] < end[0] && currentNode[1] < end[1]){
                            UpUp();
                        }
                        else if(currentNode[0] > end[0] && currentNode[1] < end[1]){
                            downUp();
                        }
                        else{
                            upDown();
                        }
                        if(pathFound === true){
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
        case"down":{
            switch(findDirection(end[1], start[1])){
                case"up":{
                    console.log("down up");
                    while(pathFound === false){
                        if(b[currentNode[0]-1][currentNode[1]] === 2
                            || b[currentNode[0]+1][currentNode[1]] === 2
                            || b[currentNode[0]][currentNode[1]+1] === 2
                            || b[currentNode[0]][currentNode[1]-1] === 2){
                                pathFound = true;
                        }
                        if(currentNode[0] > end[0] && currentNode[1] > end[1]){
                            downDown();
                        }
                        else if(currentNode[0] < end[0] && currentNode[1] > end[1]){
                            upDown();
                        }
                        else if(currentNode[0] < end[0] && currentNode[1] < end[1]){
                            UpUp();
                        }
                        else{
                            downUp();
                        }
                        if(pathFound === true){
                            break;
                        }
                    }
                    break;
                }
                case"down":{
                    console.log("down down");
                    while(pathFound === false){
                        if(b[currentNode[0]-1][currentNode[1]] === 2
                            || b[currentNode[0]+1][currentNode[1]] === 2
                            || b[currentNode[0]][currentNode[1]+1] === 2
                            || b[currentNode[0]][currentNode[1]-1] === 2){
                                pathFound = true;
                        }
                        if(currentNode[0] < end[0] && currentNode[1] < end[1]){
                            UpUp();
                        }
                        else if(currentNode[0] < end[0] && currentNode[1] < end[1]){
                            upDown();
                        }
                        else if(currentNode[0] < end[0] && currentNode[1] > end[1]){
                            downUp();
                        }
                        else{
                            downDown();
                        }
                        if(pathFound === true){
                            break;
                        }
                    }
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