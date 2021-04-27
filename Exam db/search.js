// @ts-check
/**
 * @param { {any: Array} } examList 
 * @param {string} søkeord 
 */
const searchExam = (examList, søkeord) => {
    const yearList = Object.keys(examList);
    const matching = [];
    // få med del1/2
    yearList.forEach((year, i) => {
        var exam = examList[year].readPdf;
        if(exam.length === 4) exam = exam.slice(2, 4);
        const del1 = exam[0];
        Object.keys(del1).forEach(oppg => {
            if(del1[oppg].toLowerCase().includes(søkeord.toLowerCase())) matching.push({year, oppg, link: examList[year].link, del: 1});
        })
        if(exam[1]){
            const del2 = exam[1];
            Object.keys(del2).forEach(oppg => {
                if(del2[oppg].toLowerCase().includes(søkeord.toLowerCase())) matching.push({year, oppg, link: examList[year].link, del: 2});
            })
        }
    });
    return matching.filter(e => e.oppg !== "Oppgave 0");
}

module.exports = { searchExam };