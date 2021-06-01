import { $, new$, makeTag } from './util.js';
import { Life } from './life.js';

var currgen = 0;
const allLife = {};
var speed = 10;

/**
 * @param {Life} father 
 * @param {Life} mother 
 * @returns {Life[]}
 */
const makeNewChild = (father, mother) => {
    const newLifeArr = [];
    const boyFather = father.makeChild("boy");
    const boyMother = mother.makeChild("boy");
    const girlFather = father.makeChild("girl");
    const girlMother = mother.makeChild("girl");

    const boy = new Life("boy");
    const girl = new Life("girl");
    const boyArray = [];
    const girlArray = [];
    for(let i=0; i<400; ++i){
        const [ bfx, bfy ] = boyFather[i];
        const [ bmx, bmy ] = boyMother[i];
        const [ gfx, gfy ] = girlFather[i];
        const [ fmx, fmy ] = girlMother[i];
        const boyVec = [bfx || bmx, bfy || bmy];
        const girlVec = [gfx || fmx, gfy || fmy];
        boyArray.push(boyVec);
        girlArray.push(girlVec);
    }
    boy.vectorList = boyArray;
    girl.vectorList = girlArray;
    father.childBoy = boy;
    father.childGirl = girl;
    mother.childBoy = boy;
    mother.childGirl = girl;
    newLifeArr.push(boy,girl);
    return newLifeArr;
}

/**
 * @returns {void}
 */
const genFirstGeneration = () => {
    const genereation = [];
    for(let i=0; i<50; ++i){
        const boy = new Life("boy");
        const girl = new Life("girl");
        boy.genVec();
        girl.genVec();
        genereation.push(boy, girl);
    }
    allLife[0] = genereation;
}

/**
 * @returns {{bestBoys: Life[], bestGirls: Life[]}}
 */
const filterStrongest = () => {
    var allBoys = allLife[currgen].filter(life => life.gender === "boy").map(life => { return {life, absDist:  Math.sqrt((198 - life.x)**2 + (400 - life.y)**2)} });
    var allGirls = allLife[currgen].filter(life => life.gender === "girl").map(life => { return {life, absDist:  Math.sqrt((198 - life.x)**2 + (400 - life.y)**2)} });
    var limit = 0;
    const bestBoys = [];
    const bestGirls = [];
    while(bestBoys.length < 25){
        allBoys.forEach(life => life.absDist >= limit && bestBoys.length < 25 ? bestBoys.push(life.life) : null);
        limit += 10;
    }
    limit = 0;
    while(bestGirls.length < 25){
        allGirls.forEach(life => life.absDist >= limit && bestGirls.length < 25 ? bestGirls.push(life.life) : null);
        limit += 10;
    }
    return {bestBoys, bestGirls};
}

/**
 * 
 * @param {HTMLElement} div 
 */
const renderLife = (div) => {
    allLife[currgen].forEach(/**@param {Life} life*/life => {
        life.body.className = "life";
        life.body.classList.add(life.gender === "boy" ? "boy" : "girl");
        div.append(life.body);
    });
    let i=0;
    let move = setInterval(() => {     
        allLife[currgen].forEach(/**@param {Life} life*/(life) => {
            life.x += life.vectorList[i][0];
            life.y += life.vectorList[i][1];
            if(life.x <= 0) life.x = 0;
            if(life.x >= 400) life.x = 400;
            if(life.y >= 600) life.y = 600;
            if(life.y <= 0) life.y = 0;
            life.body.style.top = `${life.y}px`;
            life.body.style.left = `${life.x}px`;
        })
        i++;
        if(i === 398) clearInterval(move);
    }, speed);
}

/**
 * @param {HTMLElement} world 
 * @param {HTMLElement} genNr 
 */
const nature = (world, genNr) => {
    setInterval(() => {     
        renderLife(world);
        setTimeout(() => {   
            // each parrent have 2 children.
            var { bestBoys, bestGirls}  = filterStrongest();
            const newLife = [];
            for(let i=0; i<25; i++){
                const father = bestBoys[i];
                const mother = bestGirls[i];
                const [boy, girl] = makeNewChild(father, mother);
                newLife.push(boy, girl);
            }
            bestBoys = bestBoys.sort((a, b) => Math.sqrt((200 - a.x)**2 + (400 - a.y)**2) +  Math.sqrt((198 - b.x)**2 + (400 - b.y)**2) )
            bestGirls = bestGirls.sort((a, b) => Math.sqrt((200 - a.x)**2 + (400 - a.y)**2) +  Math.sqrt((198 - b.x)**2 + (400 - b.y)**2))
            for(let i=0; i<25; i++){
                const father = bestBoys[i];
                const mother = bestGirls[i];
                const [boy, girl] = makeNewChild(father, mother);
                newLife.push(boy, girl);
            }
            currgen++;
            allLife[currgen] = newLife;
            world.innerHTML = `<div id="goal"></div>`;
            genNr.innerHTML = `Generation nr: ${currgen+1}`;
            renderLife(world);
        }, speed*400);
    }, speed*400);
}

const main = () => {
    // Loop that makes 50 of each gender, 
    // and another loop that makes child for two genders at the time. 
    const [ world, genNr, speedInpt, speedLbl ] = $("world genNr speed speedLbl");
    speedInpt.oninput = function(){
        speed = 100-this.value;
        speedLbl.innerHTML = `Speed: ${this.value}`;
    }
    genFirstGeneration();
    genNr.innerHTML = `Generation nr: ${currgen}`;

    nature(world, genNr)
}

export default main;