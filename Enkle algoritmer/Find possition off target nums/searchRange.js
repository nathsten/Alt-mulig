//@ts-check

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange1 = function(nums, target) {
    let output = [];
    nums.sort((a,b) => a-b);

    for(let i=0; i<nums.length; i++){
        if(nums[i] === target){
            output.push(i);
        }   
    }
    if(output.length > 2){
        let o = output[0]
        let i = output[output.length-1];
        output = [o, i];

    }
    if(output.length === 1){
        output.push(output[0]);
    }

    if (nums.includes(target) !== true){
        output.push(-1, -1)
    }

    return output;
};


var searchRange2 = function(nums, target) {
    let output = [];
    let indexes = [];
    /**
     * @param {number} a
     * @param {number} b
     * @returns {number[]}
     */
    nums.sort((a,b) => a-b);

    if(nums.includes(target) !== true){
        output.push(-1, -1);
    }  
    else{
        for(let i=0; i<nums.length; i++){
            if(nums[i] === target){
                indexes.push(i);
            }
        }
        output.push(indexes[0], indexes[indexes.length-1])
    }   
    return output;
}

let numbers = [4,7,1,6,9,5,3,5,6,8,3,5,6,3,2,5,7,8,6,3,2,4,5,4,6,7,6];
console.log(searchRange1(numbers, 6));
console.log(searchRange2(numbers, 3));