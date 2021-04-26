const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ws = require('puppeteer');
const Datastore = require('nedb');
const { getPdfObject } = require('./readPdf');
const { writeFileSync, readFileSync } = require('fs');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/", express.static('public'));
const db = new Datastore({filename: './exam.db', autoload: true});
// test database
const jsondb = JSON.parse(readFileSync('db.json'));

app.listen(PORT, e => e ? console.log(e) : console.log(`Listening on port:${PORT}`))

// teste ut nedb.
app.get('/db/:n', (req, res) => {
    const d = req.params.n;
    db.insert({test: d, date: new Date().toISOString()}, (err, doc) => {
        console.log(doc);
    });
    res.send({d});
})

app.get('/gtdb', (req, res) => {
    db.find({test: 'hei'}, (err, doc) => {
        if(!err) res.json(doc);
    })
})

app.get('/upddb/:ny', (req, res) => {
    db.update({test: req.params.ny},{test: 'jaja'}, (err, n, b) => {
        console.log(err, n, b);
    });
    res.send("ja")
})

// Henter alle eksamensett og oppdaterer databasen. 
// endre til post. 
app.get('/oppdaterEksamensoppgaver', async (req, res) => {
    var fag = "s2";
    // const { fag } = req.body;
    const browser = await ws.launch();
    const page = await browser.newPage();
    await page.goto(`https://matematikk.net/side/${fag}_Hovedside`);
    const [el] = await page.$x("/html/body/div[5]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl");
    const getText = await el.getProperty("textContent");
    const text = await getText.jsonValue();
    const antallOppg = await Math.floor(text.split(/\n/).length/3);
    const eksamenFag = await text.split(/\n/);
    const alleEksamenForFag = {
        // [fag]: {}
    }
    let fagnr = 0;
    for(let i = 1; i < antallOppg*2; i+=2){
        const [elLink] = await page.$x(`/html/body/div[5]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl/dd[${i}]/a`);
        const getLink = await elLink.getProperty("href");
        const link = await getLink.jsonValue();
        const readPdf = await getPdfObject(link);
        const år = await eksamenFag[fagnr];
        fagnr += 3;
        alleEksamenForFag[år] = await readPdf;
    }
    jsondb[fag] = alleEksamenForFag;
    writeFileSync('db.json', JSON.stringify(jsondb, null, 2));
    res.send(alleEksamenForFag);
    console.log(alleEksamenForFag);
    browser.close();
})