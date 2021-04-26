// @ts-check
/**
 * @param { {any: Array} } examList 
 * @param {string} søkeord 
 */
const searchExam = (examList, søkeord) => {
    const yearList = Object.keys(examList);
    const matching = [];
    yearList.forEach((year, i) => {
        var exam = examList[year];
        if(exam.length === 4) exam = exam.slice(2, 4);
        const del1 = exam[0];
        Object.keys(del1).forEach(oppg => {
            if(del1[oppg].includes(søkeord)) matching.push({year, oppg});
        })
        if(exam[1]){
            const del2 = exam[1];
            Object.keys(del2).forEach(oppg => {
                if(del2[oppg].includes(søkeord)) matching.push({year, oppg});
            })
        }
    });
    return matching.filter(e => e.oppg !== "Oppgave 0");
}

module.exports = { searchExam };