// @ts-check
/**
 * @param {string} id 
 */
const $ = id => document.querySelector(id);

class lines{
    constructor(x,y,w,h,r,c,div){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.c = c;
        this.div = div;
    }

    render(){
        const { x, y, w, h, r, c, div } = this;
        div.style.position = `absolute`;
        if(r !== 0){
            div.style.left = `calc(${x}% - ${w/2}%)`
            div.style.top = `20%`;
        }else{
            div.style.left = `0%`;
            div.style.top = `calc(${y}% - ${h/2}%)`;
        }
        div.style.width = `${w}%`;
        div.style.height = `${h}%`;
        div.style.transform = `rotate(-${r}deg)`;
        div.style.backgroundColor = c;
    }
}

const flagg = {
    norsk: [
        {w: 100, h: 10, x: 0, y: 50, r: 0, c: "white", bg: "red"},
        {w: 100, h: 10, x: 40, y: 0, r: 90, c: "white", bg: "red"},
        {w: 100, h: 6, x: 0, y: 50, r: 0, c: "blue", bg: "red"},
        {w: 100, h: 6, x: 40, y: 0, r: 90, c: "blue", bg: "red"}
    ],
    dansk: [
        {w: 100, h: 10, x: 0, y: 50, r: 0, c: "white", bg: "red"},
        {w: 100, h: 10, x: 40, y: 0, r: 90, c: "white", bg: "red"}
    ],
    svensk: [
        {w: 100, h: 10, x: 0, y: 50, r: 0, c: "yellow", bg: "blue"},
        {w: 100, h: 10, x: 40, y: 0, r: 90, c: "yellow", bg: "blue"}
    ],
    finsk: [
        {w: 100, h: 10, x: 0, y: 50, r: 0, c: "blue", bg: "white"},
        {w: 100, h: 10, x: 40, y: 0, r: 90, c: "blue", bg: "white"},
    ]
}

Object.keys(flagg).forEach(land => {
    flagg[land].forEach(li => {
        const { w, h, x, y, r, c, bg } = li;
        const div = document.createElement("div");
        const line = new lines(x, y, w, h, r, c, div);
        line.render();
        const divLand = /**@type {HTMLDivElement}*/($(`#${land}`));
        divLand.append(line.div);
        divLand.style.backgroundColor = bg;
    })
})