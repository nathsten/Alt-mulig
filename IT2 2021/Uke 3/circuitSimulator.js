const select = el => document.querySelector(el);

const π = Math.PI;

/**
 * Beregner avstand mellom to punkt a og b
 * @param {{ x: number; y: number; }} a
 * @param {{ x: number; y: number; }} b
 */
const dist = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy)
}

const vinkel = (p1, p2) => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / π;
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const spole = (ctx, p1, p2) => {
    ctx.beginPath();
    let p = new Path2D(
      `M ${p1.x} ${p1.y} h ${Math.abs((dist(p2,p1))/2)} t 2 -5 , 4 0 , 4 0, 4 0, 4 0, 4 0, 4 0, 4 0 l 2 5 h ${Math.abs((dist(p2,p1))/2)}`);
    ctx.save();
    ctx.translate(p1.x, p1.y);
    ctx.rotate(vinkel(p1,p2)*π/180);
    ctx.translate(-p1.x, -p1.y);
    ctx.stroke(p);
    ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const kapasitans = (ctx, p1, p2) => {
    ctx.beginPath();
    let p = new Path2D(`
    M ${p1.x} ${p1.y} h ${Math.abs(dist(p2,p1)/2)} v 10 -20 10 h10 v10 -20 10 h ${Math.abs(dist(p2,p1)/2)}
    `);
    ctx.save();
    ctx.translate(p1.x, p1.y);
    ctx.rotate(vinkel(p1,p2)*π/180);
    ctx.translate(-p1.x, -p1.y);
    ctx.stroke(p);
    ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const resistor = (ctx,p1, p2) => {
    ctx.beginPath();
    let p = new Path2D(
      `M ${p1.x} ${p1.y} h ${Math.abs(dist(p2,p1)/2)} l 2 5  l 4 -10  l 4 10  l 4 -10  l 4 10  l 4 -10  l 2 5 h ${Math.abs(dist(p2,p1)/2)}`);
    ctx.save();
    ctx.translate(p1.x, p1.y);
    ctx.rotate(vinkel(p1,p2)*π/180);
    ctx.translate(-p1.x, -p1.y);
    ctx.stroke(p);
    ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const ledning = (ctx, p1, p2) => {
    const path = new Path2D(`M ${p2.x} ${p2.y} L ${p1.x} ${p1.y}`);
    ctx.beginPath();
    ctx.stroke(path);
}

class numberInPath{
    x = 0;
    y = 0;
    a = 0;
    text = "";
    span = undefined;

    render() {
        this.span.style.position = "absolute";
        this.span.style.left = `${this.x}px`;
        this.span.style.top = `${this.y}px`;
        this.span.style.transform = `rotate(${this.a}deg)`;
        this.span.innerHTML = this.text;
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const batteripol = (ctx, p1, p2, volt, brett) => {
    ctx.beginPath();
    const path = new Path2D(`M ${p1.x} ${p1.y} h 5 v 5 -10 5 h 5 M ${p1.x + 40} ${p1.y} h ${Math.abs(dist(p1, p2))-40}`);
    const v = new numberInPath();
    v.x = p1.x + 15; v.y = p1.y; v.a = vinkel(p1, p2); v.text = volt;
    v.span = document.createElement("span");
    v.span.className = "numberInPath";
    v.render();
    brett.append(v.span);
    ctx.save();
    ctx.translate(p1.x, p1.y);
    ctx.rotate(vinkel(p1,p2)*π/180);
    ctx.translate(-p1.x, -p1.y);
    ctx.stroke(path);
    ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
const jord = (ctx, p1, p2) => {
    ctx.beginPath();
    const path = new Path2D(`M ${p1.x} ${p1.y} h 20 v 15 -30 15 M ${p1.x + 30} ${p1.y} v 10 -20 10 M ${p1.x + 40} ${p1.y} v 5 -10 5`)
    ctx.save();
    ctx.translate(p1.x, p1.y);
    ctx.rotate(vinkel(p1,p2)*π/180);
    ctx.translate(-p1.x, -p1.y);
    ctx.stroke(path);
    ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctxBG
 */
const tegnRutenett = ctxBG => {
    for(let i=10; i<=390; i+=10){
        ctxBG.beginPath();
        ctxBG.strokeStyle = 'rgba(0,0,255,0.1)';
        ctxBG.lineWidth = 1;
        ctxBG.moveTo(0, i);
        ctxBG.lineTo(400, i);
        ctxBG.moveTo(i, 0)
        ctxBG.lineTo(i, 400);
        ctxBG.stroke();
        ctxBG.closePath();
    }
}

const p1 = { x: 1, y: 1 };
const p2 = { x: 1, y: 1 };
let antallPunkt = 0;
const regPunkt = e => {
    p1.x = p2.x; p1.y = p2.y;
    const { offsetX, offsetY } = e;
    p2.x = Math.round(offsetX/10)*10;
    p2.y = Math.round(offsetY/10)*10;
    antallPunkt++;
    if(antallPunkt === 2){
        const event = new Event('toPunkt');
        dispatchEvent(event);
        antallPunkt = 0;
    }
}

const setup = () => {
    const bakgrunn = select("#bakgrunn");
    const ark = select("#ark");
    const deleteAll = select("#deleteAll");
    const voltInpt = select("#voltInpt");
    const tegnebrett = select("#tegnebrett");
    const type = /**@type {HTMLInputElement} */ (select("#type"));
    const ctxBG = bakgrunn.getContext("2d");
    const ctxArk = ark.getContext("2d");

    ark.addEventListener("click", regPunkt);
    type.addEventListener("change", () => type.value === "batteripol" ? voltInpt.classList.remove("hidden"):0 || type.value !== "volt" ? voltInpt.classList.add("hidden"):0);
    deleteAll.addEventListener("click", () => {
        if(confirm("Er du sikker på at du vil slette tegningen din?")){
            ctxArk.clearRect(0, 0, 400, 400);
            tegnebrett.childNodes.forEach(n => n.className === "numberInPath" ? tegnebrett.removeChild(n):0);
        }
    })
    tegnRutenett(ctxBG);

    addEventListener("toPunkt", () => {
        switch(type.value){
            case "resistor":{
                resistor(ctxArk, p1, p2)
                break;
            }
            case "kapasitans":{
                kapasitans(ctxArk, p1, p2);
                break;
            }
            case "spole":{
                spole(ctxArk, p1, p2);
                
                break;
            }
            case "jord":{
                jord(ctxArk, p1, p2);
                break;
            }
            case "batteripol":{
                const volt = String(voltInpt.value);
                batteripol(ctxArk, p1, p2, volt, tegnebrett);
                voltInpt.value = "";
                break;
            }
            case "ledning":{
                ledning(ctxArk, p1, p2);
                break;
            }
            default: break;
        }
    })
}