import { new$ } from './util.js';

/**
 * @param {number[][]} vectorList 
 * @param {boolean} bool 
 */
const evalVecVal = (vectorList, bool) => 
    vectorList.map(([x, y]) => [x%2 ===0===bool ? x : 0, y%2===0===bool ? y : 0]);

class Life{
    constructor(gender){
        this.gender = gender;
        this.childBoy = Life;
        this.childGirl = Life;
        this.vectorList = [];
        this.x = 198;
        this.y = 0;
        this.body = new$("div");
    }

    genVec(){
        const rnd = () => {
            var num = Math.floor(Math.random()*5) + 1;
            num *= Math.round(Math.random()) ? 1 : -1;
            return num;
        }
        for(let i=0; i<400; ++i){
            const x = rnd();
            const y = rnd();
            this.vectorList.push([x,y]);
        }
    }

    makeChild(gender){
        switch(gender){
            case "boy": // boys get even nums from father and odd from mother. 
            {
                switch(this.gender){
                    case "boy":
                    {
                        // returns only even vector values.
                        return evalVecVal(this.vectorList, true);
                    }
        
                    case "girl":
                    {
                        // return only odd vector values.
                        return evalVecVal(this.vectorList, false);
                    }
                }
            } break;

            case "girl": // girls get odd nums from father and even from mother.
            {
                switch(this.gender){
                    case "boy":
                    {
                        // returns only odd vector values.
                        return evalVecVal(this.vectorList, false);
                    }
        
                    case "girl":
                    {
                        // return only even vector values.
                        return evalVecVal(this.vectorList, true);
                    }
                } break;
            }
        }
    }
}

export { Life };