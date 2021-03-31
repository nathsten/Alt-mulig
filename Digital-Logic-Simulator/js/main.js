/**
 * @param {string} ids 
 * @returns {HTMLElement[]}
 */
const $ = ids => ids.split(",").map(id => document.getElementById(id));

/**
 * @param {string} el 
 * @returns {HTMLElement}
 */
const new$ = el => document.createElement(el);


var allBits = [];
const allCables = [];

class Bit{
    /**
     * @param {HTMLDivElement} div 
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {number} inpts 
     * @param {number} outpts 
     * @param {string} name 
     * @param {string} color 
     */
    constructor(div, x, y, w, h, inpts, outpts, name, color){
        this.div = div;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.inpts = inpts;
        this.outpts = outpts;
        this.name = name;
        this.color = color;
    }

    render(){
        var { div, x, y, w, h, inpts, outpts, name, color } = this;
        if(x === 0 && y === 0){
            x = 600 - w;
            y = 350 - h;
        }
        div.style.width = `${w}px`;
        div.style.height = `${h}px`;
        div.style.top = `${y}px`;
        div.style.left = `${x}px`;
        div.innerHTML = `<p class="text-center bitMover" id="${x},${y},${w},${h},${inpts},${outpts},${name},${color}">${name}</p>`;
        div.style.backgroundColor = color;
        div.className = "bitMain bitMover";
        div.id = `${x},${y},${w},${h},${inpts},${outpts},${name},${color}`;
        const inputDiv = new$("div");
        inputDiv.id = div.id;
        inputDiv.style.position = "absolute";
        inputDiv.style.top = "0";
        inputDiv.style.width = "10%";
        inputDiv.style.height = "100%";
        inputDiv.style.display = "grid";
        inputDiv.style.gridTemplateRows = `repeat(${inpts}, 1fr)`;
        
        for(var i = 0; i < inpts; i++){
            const newInpt = new$("div");
            newInpt.className = "bitInpt";
            inputDiv.append(newInpt);
        }

        div.append(inputDiv);
    }
}

class Cable{
    x1 = 0;
    x2 = 0;
    y1 = 0;
    y2 = 0;
    div = new$("div");

    render(){
        const { x1, x2, y1, y2, div } = this;
        div.style.transform = `rotate(${Math.atan2((y2 - y1), (x2 - x1)) * 180 / Math.PI}deg)`;
        div.style.width = `${Math.sqrt((Math.abs(x1-x2)**2) + (Math.abs(y1-y2)**2))}px`;
        div.style.height = `1px`;
        div.style.position = `absolute`;
        div.style.backgroundColor = `white`;
        div.style.top = `${y1}px`;
        div.style.left = `${x1}px`;
        div.style.backgroundPositionX = `-50%`;
        div.style.backgroundPositionY = `-50%`;
    }
}

const c = new Cable();
c.x1 = 200;
c.x2 = 400;
c.y1 = 400;
c.y2 = 100;
c.render();

const main = new Vue({
    el: "#mainRoot",
    data: {
        newSimStarted: true,
        allProjects: [],
        bitList: [
            {name: "Not", w: 120, h:50, inpts: 1, outpts: 1, color: "red"}, 
            {name: "And", w: 120, h:70, inpts: 2, outpts: 1, color: "blue"}, 
            {name: "Or", w: 120, h:70, inpts: 2, outpts: 1, color: "green"}
        ],
        inputList: [{state: 0, id: 0}, {state: 0, id: 1}, {state: 0, id: 2}, {state: 0, id: 3}]
    },
    methods: {
        newProject: () => {
            main.newSimStarted = true
        },
        selectProject: pjctName => {
            alert(pjctName);
        },
        newBit: bit => {
            const { name, w, h, inpts, outpts, color } = bit;
            const div = new$("div");
            const newBit = new Bit(div, 0, 0, w, h, inpts, outpts, name, color);
            newBit.render();
            allBits.push({Bit: newBit, id: newBit.div.id});
            renderBits();
        },
        changeInptState: (state, id) => {
            main.inputList.forEach(e => {
                if(e.id === id){
                    const newState = state === 1 ? 0 : 1;
                    main.inputList.push({state: newState, id});
                }
                else { main.inputList.push(e) }
            })
            main.inputList = main.inputList.slice(4, 8)
        },
    }
});

var mouseDown = false
document.addEventListener("mousedown", e => mouseDown = true);
document.addEventListener("mouseup", e => mouseDown = false);

const [ inputs, bitDiv ] = $("inputs,bitDiv");
var selectedInpt = false;

inputs.addEventListener("click", 
/**
 * @param {MouseEvent} e  
 */ e => {
    const { clientX, clientY } = e;
    const c = new Cable;
    c.x1 = clientX-120;
    c.y1 = clientY-40;
    allCables.push(c);
    selectedInpt = true;
});
bitDiv.addEventListener("click", 
/**
 * @param {MouseEvent} e  
 */ e => {
    if(selectedInpt){
        const { clientX, clientY } = e;
        const { className, id } = e.target;
        allCables.forEach(c => {
            if(!c.x2 && !c.y2){
                c.x2 = clientX-120;
                c.y2 = clientY-40;
                c.render();
                const [ bitDiv ] = $("bitDiv");
                bitDiv.append(c.div);
            }
        })
        selectedInpt = false;
    }
})

document.addEventListener("mousemove",
/**@param {MouseEvent} e */ e => {
    if(mouseDown && e.target.className.includes("bitMover")){
        const { clientX, clientY } = e
        const [ x, y, w, h, inpts, outpts, name, color ] = e.target.id.split(",");
        const revDiv = document.getElementById(e.target.id);
        const div = new$("div");
        const newBit = new Bit(div, clientX-200, clientY-100, w, h, inpts, outpts, name, color);
        newBit.render();
        (allBits.length ? 
            allBits.forEach((bit, i) => {
                const { Bit, id } = bit;
                if(id === e.target.id) allBits[i] = {Bit: newBit, id: newBit.div.id}
            }) : allBits.push({Bit: newBit, id: e.target.id})
        );
        renderBits();
    }
})

const renderBits = () => {
    const [ bitDiv ] = $("bitDiv");
    bitDiv.innerHTML = "";

    allBits.forEach(bit => {
        const { Bit, id } = bit;
        bitDiv.append(Bit.div);
    })  
}