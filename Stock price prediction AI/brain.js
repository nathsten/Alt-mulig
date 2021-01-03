const brain = require('brain.js');
const express = require('express');
const nodeFetch = require('node-fetch');
const bodyParser = require('body-parser');
const fs = require('fs');
const index = express();
index.use(bodyParser.urlencoded({"extended": true}));
const nuralNet = new brain.NeuralNetwork();
const port = process.env.PORT || 3000;

index.listen(port, e => {
    if(!e){
        console.log(`Listening og localhost:${port}`);
    };
});

index.use('/open/stockPricePrediction', express.static('stockPricePrediction'));

const APIKey = JSON.parse(fs.readFileSync('apikey.json')).APIKey;

index.get('/getStockData/:ticker', (req, res) => {
    const getStockAPIData = async () => {
        try{
            const ticker = req.params.ticker;
            const getStockData = await nodeFetch(`http://api.marketstack.com/v1/eod?access_key=${APIKey}&symbols=${ticker}`);
            const stockData = await getStockData.json();
            res.send(stockData);
        }
        catch(e){
            res.send(`Failed ${e}`);
        }
    }
    getStockAPIData();
});

const testFile = JSON.parse(fs.readFileSync('testfile.json'));

index.get('/getTestfile', (req, res) => {
    res.send(testFile);
})