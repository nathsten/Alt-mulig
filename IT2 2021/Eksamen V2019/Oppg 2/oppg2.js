import { Test, expect } from '../../Test.js';
import { $, new$ } from '../../util.js';

/**
 * @param {number} w 
 * @param {number} h 
 * @returns {number}
 */
const calculate = (w, h) => w*h;

const testPlan = () => {
    // testplan
    expect(calculate(10, 20), "calculate(10, 20)").to.be(200);
    expect(calculate(1080, 1920), "calculate(1080, 1920)").to.be(2073600);
    Test.summary("#summary");
}

const main = () => {
    testPlan();

    const [ ui, output, firkantOut ] = $("ui output firkantOut");

    ui.addEventListener("submit", e => {
        e.preventDefault();
        const [ bredde, høyde ] = Array.from(ui.querySelectorAll("input")).map(e => e.value);
        output.innerHTML = `Størrelse i pixler: ${bredde*høyde} <br> Størrelse i megapixler: ${bredde*høyde/1000000}`;
        firkantOut.innerHTML = ""
        if(bredde > høyde){
            const div = new$("div");
            div.className = "liggende";            
            div.innerHTML= "liggende";
            firkantOut.append(div);
            return;
        }
        if(bredde < høyde){
            const div = new$("div");
            div.className = "stående";            
            div.innerHTML = "stående";
            firkantOut.append(div);
            return;
        }
        const div = new$("div");
            div.className = "kvadrat";            
            div.innerHTML = "kvadrat";
            firkantOut.append(div);
    })
}

export default main;