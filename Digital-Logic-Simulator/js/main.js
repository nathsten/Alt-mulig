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
var allCables = [];

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
        this.inputList = [];
        this.outputList = [];
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
        const outputDiv = new$("div");
        inputDiv.id = div.id;
        inputDiv.style.position = "absolute";
        inputDiv.style.top = "10%";
        inputDiv.style.width = "10%";
        inputDiv.style.height = "100%";
        inputDiv.style.display = "grid";
        inputDiv.style.gridTemplateRows = `repeat(${inpts}, 1fr)`;
        outputDiv.id = div.id;
        outputDiv.style.position = "absolute";
        outputDiv.style.top = "25%";
        outputDiv.style.right = "10%";
        outputDiv.style.width = "10%";
        outputDiv.style.height = "100%";
        outputDiv.style.display = "grid";
        outputDiv.style.gridTemplateRows = `repeat(${inpts}, 1fr)`;
        
        // Creates a list of inputs for the selected bit. 
        for(var i = 0; i < inpts; i++){
            const newInpt = new$("div");
            const inpt = new inputBit(false, newInpt);
            inpt.div.className = "bitInpt";
            inpt.render(div.id, i);
            inputDiv.append(inpt.div);
            this.inputList.push(inpt);
        }
        // Creates a output(s) for the selected bit. 
        for(var i = 0; i < outpts; i++){
            const newOut = new$("div");
            const out = new outputBit(this.inputList, newOut, name);
            out.div.className = "bitOut";
            out.render();
            outputDiv.append(out.div);
            this.outputList.push(out);
        }

        div.append(inputDiv);
        div.append(outputDiv);
    }
}

class Cable{
    x1 = 0;
    x2 = 0;
    y1 = 0;
    y2 = 0;
    div = new$("div");
    w = 0; 
    parrentInptState = undefined;
    parrentId = undefined;

    render(){
        var { x1, x2, y1, y2, div, w} = this;
        w = Math.sqrt((Math.abs(x1-x2)**2) + (Math.abs(y1-y2)**2))
        div.style.width = `${w}px`;
        div.style.height = `1px`;
        div.style.position = `absolute`;
        div.style.top = `${(y1 + y2)/2}px`;
        div.style.left = `${(x1 + x2)/2 - w/2}px`;
        div.style.transform = `rotate(${Math.atan2((y2 - y1), (x2 - x1)) * 180 / Math.PI}deg)`;
    }
}

class inputBit{
    /**
     * @param {boolean} connected 
     * @param {HTMLDivElement} div 
    */
    constructor(connected, div){
        this.connected = connected;
        this.div = div;
        this.pair = undefined;
        this.state = undefined;
    }

    // Connects to the input from the side, 
    // and determines which state it is, based on input state
    connect = idInput => {
        const inptSel = idInput.split(",");
        this.connected = true;
        this.pair = +(inptSel[0]);
        this.state = +(inptSel[1]);
    }

    render(id, nr){
        this.div.id = id + ",InptBit," + nr
    }
}

class outputBit{
    /**
     * @param {inputBit[]} allInpts 
     * @param {HTMLDivElement} div 
     * @param {string} parrentBit 
     */
    constructor(allInpts, div, parrentBit){
        this.allInpts = allInpts;
        this.div = div;
        this.parrentBit = parrentBit;
        this.state = undefined;
    }

    render(){
        const { allInpts, div, parrentBit } = this;
        div.classList.add("off");
        div.id = this.state;
    }

    // Tells if the output from selected bit is on(1) or off(0)
    act(){
        const { allInpts, div, parrentBit } = this;
        switch(parrentBit){
            case "Not": {
                const [ in1 ] = allInpts;
                if(in1.state == 0){
                    this.state = 1;
                    this.div.classList.remove("off");
                    this.div.classList.add("on");
                }
                else{
                    this.state = 0;
                    this.div.classList.remove("on");
                    this.div.classList.add("off");
                }
            }
            break;

            case "And": {
                const [ in1, in2 ] = allInpts;
                if(in1.state == 1 && in2.state == 1){
                    this.state = 1;
                    this.div.classList.remove("off");
                    this.div.classList.add("on");
                }
                else{
                    this.state = 0;
                    this.div.classList.remove("on");
                    this.div.classList.add("off");
                }
            }
            break;

            case "Or": {
                const [ in1, in2 ] = allInpts;
                if(in1.state == 1 || in2.state == 1){
                    this.state = 1;
                    this.div.classList.remove("off");
                    this.div.classList.add("on");
                }
                else{
                    this.state = 0;
                    this.div.classList.remove("on");
                    this.div.classList.add("off");
                }
            }
            break;
        }
    }
}

// The main output that connects to all the bits via the inputs. 
class MainOutput{
    /**
     * @param {HTMLDivElement} div 
     * @param {0 | 1} state 
     * @param {boolean} connected 
     */
    constructor(div, state, connected){
        this.div = div;
        this.state = state;
        this.connected = connected;
    }
}

const mainOutput = new MainOutput($("mainOutput")[0], 0, false);


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
                    allBits.forEach(bit => {
                        bit.Bit.inputList.forEach(inpt => {
                            if(inpt.pair === id && inpt.state === state){
                                inpt.state = newState;
                            }
                        })
                    })
                    allCables.forEach(cable => {
                        if(cable.parrentId == id){
                            cable.parrentInptState = newState;
                        }
                    })
                }
                else { main.inputList.push(e) }
            })
            main.inputList = main.inputList.slice(4, 8);
            renderBits();
        },
    }
});

// To move the bits around we need to know if the mousepad id pressed down. 
var mouseDown = false
document.addEventListener("mousedown",  ()=> mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);

const [ inputs, bitDiv ] = $("inputs,bitDiv");
var selectedInpt = false;
var selectedInputId = undefined;

// adds eventlisteners to all the inputs on the side. 
inputs.addEventListener("click", 
/**
 * @param {MouseEvent} e  
 */ e => {
     // If its a connector set first cable x and y coordinates to clientX&Y. 
    if(e.target.className.includes("connector")){
        const { clientX, clientY } = e;
        const { id } = e.target
        const c = new Cable;
        c.x1 = clientX-120;
        c.y1 = clientY-75;
        allCables.push(c);
        selectedInpt = true;
        selectedInputId = id;
    }
});


/**
 * @param {MouseEvent} e  
 */ 
const connect = e => {
    // connects to the slected input on selected bit.
    if(selectedInpt){
        const { clientX, clientY } = e;
        const { className, id } = e.target;
        let i = 0;
        let l = allCables.length;
        allCables.forEach(c => {
            if(!c.x2 && !c.y2){
                c.x2 = clientX-120;
                c.y2 = clientY-75;
                c.parrentInptState = selectedInputId.split(",")[1];
                c.parrentId = selectedInputId.split(",")[0];
                c.div.className = selectedInputId.split(",")[1] === 0 ? "cableOn" : "cableOff";
                c.render(); 
            }
            allCables.push(c);
            i++;
        })
        allBits.forEach(bit => {
            bit.Bit.inputList.forEach(inpt => {
                if(inpt.div.id === id){
                    inpt.connect(selectedInputId)
                }
            })
        })
        // The list of all the cables is sliced down to the lengt of previous cables
        // in addition to the new one. 
        allCables = allCables.slice(l, l+i);
        // render the whole simulator for each new cable. 
        renderBits();

        selectedInpt = false;
        selectedInputId = undefined;
    }
}

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


var mainOutputActive = false;

$("mainOutput")[0].addEventListener("click", 
/** @param {MouseEvent} e*/ e => {
    const { clientX, clientY } = e;
    
    const c = new Cable;
    c.x1 = clientX-120;
    c.y1 = clientY-75;
    c.div = new$("div");
    allCables.push(c);
    mainOutputActive = true;
})

/** Change it up, select output on bit first then either main output or 
 * another bit input!!
 * @param {MouseEvent} e 
 */
const connectOut = e => {
    if(mainOutputActive){
        const { clientX, clientY } = e;
    
        const { className, id } = e.target;
        let i = 0;
        let l = allCables.length;
        allCables.forEach(c => {
            if(!c.x2 && !c.y2){
                c.x2 = clientX-120;
                c.y2 = clientY-75;
                c.parrentInptState = mainOutput.state;
                // c.parrentId = ;
                c.div.className = mainOutput.state === 0 ? "cableOn" : "cableOff";
                console.log(c);
                c.render(); 
                mainOutput.connected = true;
                mainOutput.state = +id || undefined;
            }
            allCables.push(c);
            i++;
        })
    
        // The list of all the cables is sliced down to the lengt of previous cables
        // in addition to the new one. 
        allCables = allCables.slice(l, l+i);
        // render the whole simulator for each new cable. 
        renderBits();
        mainOutputActive = false;
    }
}

const renderBits = () => {
    const [ bitDiv ] = $("bitDiv");
    bitDiv.innerHTML = "";

    allBits.forEach(bit => {
        const { Bit, id } = bit;
        bitDiv.append(Bit.div);
    }) 

    allCables.forEach(cbl => {
        if(cbl.parrentId === "mainOutput"){
            cbl.parrentInptState = mainOutput.state;
        }
        cbl.parrentInptState === 1 ? cbl.div.className = "cableOn" : cbl.div.className = "cableOff";
        bitDiv.append(cbl.div)
    })

    const inptOnBits = document.querySelectorAll(".bitInpt");
    inptOnBits.forEach(inpt => inpt.addEventListener("click", connect));

    document.querySelectorAll(".bitOut")
    .forEach(out => out.addEventListener("click", connectOut))
}

// An interval that allways check if the bit req are furfilled in order to stay on. 
// Also checks if mainOutput is on or off. 

setInterval(() => {
    allBits.forEach(bit => {
        bit.Bit.outputList.forEach(out => {
            out.act();
        })
    })

    mainOutput.div.classList.add(mainOutput.state === 1 ? "on" : "off")
}, 10);