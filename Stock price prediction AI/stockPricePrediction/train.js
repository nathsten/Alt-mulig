const neuralNet = new brain.NeuralNetwork();
const stockData = [];
const tickerInpt = document.getElementById("ticker");
const submit = document.getElementById("submit");

const getTestFile = async () => {
    try{
        const ticker = tickerInpt.value;
        const getAllData = await fetch(`/getStockData/${ticker}`);
        const allData = await getAllData.json();
        const data = await allData.data;
        Object.keys(data).splice(0, 99).forEach(d => {
            const trainingData = {
                input: [data[d].open, data[d].high, data[d].low],
                output: {"price": data[d].close}
            };
            stockData.push(trainingData);
        })
        neuralNet.train(stockData);
        const newData = [data[99].open, data[99].high, data[99].low];
        const stockPricePrediction = neuralNet.run(newData);
        console.log(stockPricePrediction);
    }
    catch(e){
        console.error(`Dette funket ikke... ${e}`);
    }
}
submit.addEventListener("click", getTestFile);