const output = document.getElementById("output");

const getData = async () => {
    const res = await fetch('ZonAnn.Ts+dSST.csv');
    const data = await res.text();

    const cols = data.split(/\n/);
    const labels = cols[0].split(",");

    const dataArray = [];
    const years = [];

    cols.forEach(e => dataArray.push(e.split(",")));
    dataArray.splice(0,1);
    dataArray.forEach(e => years.push(e[0]));
    dataArray.forEach(e => e.splice(0, 1));
    labels.splice(0, 1);
    const sortedYears = {};

    for(let i=0; i<dataArray.length; i++){
        const dataObject = [];
        let pushed = false;
        dataArray[i].forEach(() => {
            for(let j=0; j<dataArray[i].length; j++){
                if(pushed !== true){
                    dataObject.push({[labels[j]]: dataArray[i][j]});
                }
            }
            pushed = true;
        });

        sortedYears[years[i]] = dataObject;
    }
    return sortedYears;
}

const displaySortedData = async () => {
    const dataSet = await getData();

    const years = Object.keys(dataSet);
    const labelsArr = [];

    years.forEach(e => {
        dataSet[e].forEach(a => {
            const lable = Object.keys(a);
            if(!labelsArr[lable]){
                labelsArr.push(lable[0]);
            }
        })
    });
    const labels = labelsArr.splice(14, 14);

    years.forEach(e => {
        output.innerHTML += `<div>Year:</div> <div>${e}</div>`;
        for(let i=0; i<labels.length; i++){
            output.innerHTML += `<div>${labels[i]}:</div>`;
            output.innerHTML += `<div>${dataSet[e][i][labels[i]]}</div>`;
        }
    })
}
displaySortedData();