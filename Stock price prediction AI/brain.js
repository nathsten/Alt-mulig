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

index.use('/', express.static('public'));

const APIKey = JSON.parse(fs.readFileSync('apikey.json')).APIKey;

nuralNet.train([
    {input: [1,0,0,1], output: [1]},
    {input: [0,1,0,1], output: [0]}
]);

const prediction = nuralNet.run([0,1,1,1]);

index.post('/sendCompanyName', (req, res) => {
    const getStockAPIData = async () => {
        try{
            const ticker = req.body.ticker;
            const getStockData = await nodeFetch(`http://api.marketstack.com/v1/eod?access_key=${APIKey}&symbols=${ticker}`);
            const stockData = await getStockData.json();
            res.json(stockData);
        }
        catch(e){
            res.send(`Failed ${e}`);
        }
    }
    getStockAPIData();
})