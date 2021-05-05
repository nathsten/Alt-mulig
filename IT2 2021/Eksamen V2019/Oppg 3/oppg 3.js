import { $, new$ } from '../../util.js';

const stier = {
    Gjendesheim: [{hytte: "Glitterheim", dist: 22}, {hytte: "Memurubu", dist: 14}],
    Glitterheim: [{hytte: "Gjendesheim", dist: 22}, {hytte: "Memurubu", dist: 18}],
    Memurubu: [{hytte: "Gjendesheim", dist: 14}, {hytte: "Glitterheim", dist: 18}, {hytte: "Gjendebu", dist: 10}],
    Gjendebu: [{hytte: "Memurubu", dist: 10}, {hytte: "Leirvassbu", dist: 19}, {hytte: "Spiterstulen", dist: 24}, {hytte: "Olavsbu", dist: 16}],
    Leirvassbu: [{hytte: "Gjendebu", dist: 19}, {hytte: "Spiterstulen", dist: 15}, {hytte: "Olavsbu", dist: 11}],
    Spiterstulen: [{hytte: "Glitterheim", dist: 17}, {hytte: "Gjendebu", dist: 24}, {hytte: "Leirvassbu", dist: 15}],
    Olavsbu: [{hytte: "Gjendebu", dist: 16}, {hytte: "Leirvassbu", dist: 11}]
}

const valgtSti = [];
const main = () => {
    const [ velgHytte, velgSti, leggTil, oppsummering, vis ] = $("velgHytte velgSti leggTil oppsummering vis");
    velgHytte.innerHTML = Object.keys(stier).map(hytte => `<option>${hytte}</option>`).join("");
    velgHytte.addEventListener("change", () => {
        const valgtHytte = velgHytte.value;
        velgSti.innerHTML = stier[valgtHytte].map(sti => `<option>${sti.hytte}</option>`).join("");
    });
    
    leggTil.addEventListener("click", () => {
        const sti = velgSti.value;
        const valgtHytte = velgHytte.value;
        const [ rute ] = stier[valgtHytte].filter(e => e.hytte === sti);
        valgtSti.push(rute);
        stier[valgtHytte] = stier[valgtHytte].filter(e => e.hytte !== sti);
        velgSti.innerHTML = stier[valgtHytte].map(sti => `<option>${sti.hytte}</option>`).join("");
    })

    vis.addEventListener("click", () => {
        const totalDist = valgtSti.map(e => e.dist).reduce((a,b) => a+b, 0);
        const rute = valgtSti.map((e, i) => `<p>${i+1}. ${e.hytte}</p>`).join("");
        oppsummering.innerHTML = `Din rute: ${rute} <br> Total distanse: ${totalDist}km`;
    })
}

export default main;