//@ts-check
const start = $("start");

/**
 * @param {number[][]} b
 */
const findPath = b => {

}

start.addEventListener("click", () => {
    if(startPoint === true && endPoint === true){
        findPath(board);
    }
    else{
        alert("Please select start and end point")
    }
});