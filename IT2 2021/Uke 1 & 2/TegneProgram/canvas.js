// @ts-check

const π = Math.PI; // kjekk å ha

/**
 * Beregner avstand mellom to punkt a og b
 * @param {{ x: number; y: number; }} a
 * @param {{ x: number; y: number; }} b
 */
function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy)
}
/**
* @param {{ x: number; y: number; }} p1
* @param {{ x: number; y: number; }} p2
*/
function vinkel(p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / π;
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: number; y: number; }} p
 * @param {number} r
 */
function sirkel(ctx, p, r) {
  // tegner en sirkel
  ctx.beginPath();
  ctx.arc(p.x, p.y, r, 0, 2 * π);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.stroke();
}

/**
 * Tegn en firkant
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: number; y: number; }} p1
 * @param {{ x: number; y: number; }} p2
 */
function firkant(ctx, p1, p2) {
  // tegner en firkant
  const w = p2.x - p1.x;
  const h = p2.y - p1.y;
  ctx.beginPath();
  ctx.strokeRect(p1.x, p1.y, w, h);
  // ctx.stroke();
}

/**
 * Tegn en trekant
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: number; y: number; }} p1
 * @param {{ x: number; y: number; }} p2
 */
function trekant(ctx, p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p1.x, p2.y);
  ctx.fillStyle = "#FF0000";
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

const p1 = { x: 1, y: 1 };
const p2 = { x: 1, y: 1 };
let antallPunkt = 0;

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: number; y: number; }} p1
 * @param {{ x: number; y: number; }} p2
 */
function resistor(ctx,p1, p2) {
  ctx.beginPath();
  let p = new Path2D(
    `M ${p1.x} ${p1.y} h ${Math.abs(dist(p1,p2)/2)} l 2 5  l 4 -10  l 4 10  l 4 -10  l 4 10  l 4 -10  l 2 5 h ${Math.abs(dist(p1,p2)/2)}`);
  //------/\/\/-----
  ctx.save();
  ctx.translate(p1.x, p1.y);
  ctx.rotate(vinkel(p1,p2)*π/180);
  ctx.translate(-p1.x, -p1.y);
  ctx.stroke(p);
  ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: number; y: number; }} p1
 * @param {{ x: number; y: number; }} p2
 */
function kapasitans(ctx, p1, p2){
  ctx.beginPath();
  let p = new Path2D(`
  M ${p1.x} ${p1.y} h ${Math.abs(dist(p1,p2)/2)} v 10 -20 10 h10 v10 -20 10 h ${Math.abs(dist(p1,p2)/2)}
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
 * @param {{ x: number; y: number; }} p1
 * @param {{ x: number; y: number; }} p2
 */
function spole(ctx, p1, p2){
  ctx.beginPath();
  let p = new Path2D(
    `M ${p1.x} ${p1.y} h ${Math.abs((dist(p1,p2))/2)} t 2 -5 , 4 0 , 4 0, 4 0, 4 0, 4 0, 4 0, 4 0 l 2 5 h ${Math.abs((dist(p1,p2))/2)}`);
  ctx.save();
  ctx.translate(p1.x, p1.y);
  ctx.rotate(vinkel(p1,p2)*π/180);
  ctx.translate(-p1.x, -p1.y);
  ctx.stroke(p);
  ctx.restore();
}

/**
 * @param {MouseEvent} e
 */
function registrerPunkt(e) {
  p2.x = p1.x; p2.y = p1.y;
  const { offsetX, offsetY } = e;
  p1.x = Math.round(offsetX/10)*10;
  p1.y = Math.round(offsetY/10)*10;
  antallPunkt++;
  if (antallPunkt === 2) {
    const event = new Event('toPunkt');
    dispatchEvent(event);
    antallPunkt = 0;
  }
}

let viskBtnClicked = false;

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 */
const visk = (ctx, x, y) => {
  if(viskBtnClicked !== false){
    ctx.clearRect(x, y, 40, 40);
    antallPunkt = 0;
  }
}

function setup() {
  const canvas = /** @type {HTMLCanvasElement} */
    (document.getElementById("tegning"));
  const ctx = canvas.getContext("2d");
  // kobling til tegnings-kontekst for canvas ctx = context

  const selType = /** @type {HTMLInputElement} */ (document.getElementById("type"));
  const viskBtn = document.getElementById("visk");
  const deleteAllBtn = document.getElementById("deleteAll");

  canvas.addEventListener("click", registrerPunkt);

  addEventListener("toPunkt", tegn);
  function tegn() {
    if(viskBtnClicked !== true){
      const type = selType.value;
      if (type === "spole") {
        spole(ctx,p1,p2);
      }
      if (type === "kapasitans") {
        kapasitans(ctx,p1, p2);
      }
      if (type === "resistor") {
        resistor(ctx,p1, p2);
      }
      if (type === "sirkel") {
        const radius = dist(p1, p2);
        sirkel(ctx,p1,radius);
      }
      if (type === "firkant") {
        firkant(ctx,p1,p2);
      }
      if (type === "trekant") {
        trekant(ctx,p1,p2);
      }
    }
  }

  viskBtn.addEventListener("click", () => {
    if(viskBtnClicked === false){
      viskBtn.innerHTML = "Avbryt";
      canvas.addEventListener("click", e => {
        const x = e.offsetX - 20;
        const y = e.offsetY - 20;
        visk(ctx, x, y);
      });
      viskBtnClicked = true;
    }
    else{
      viskBtn.innerHTML = "Visk";
      viskBtnClicked = false;
    }
  });

  deleteAllBtn.addEventListener("click", () => {
    if(confirm("Er du sikker på at du vil slette tegningen din?")){
      ctx.clearRect(0, 0, 400, 400);
    }
  })
  // clearRect(x,y,w,h)
}
