const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ws = require('puppeteer');
const { getPdfObject } = require('./readPdf');
const { searchExam } = require('./search');
const { writeFileSync, readFileSync } = require('fs');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/", express.static('public'));
// bruker json til database da det er raskest for denne typen query (og gratis..)
const db = JSON.parse(readFileSync('db.json'));

app.listen(PORT, e => e ? console.log(e) : console.log(`Listening on port:${PORT}`))

// Henter alle eksamensett og oppdaterer databasen. 
app.get('/oppdaterEksamensoppgaver/:fag', async (req, res) => {
    const fag = req.params.fag;
    const browser = await ws.launch();
    const page = await browser.newPage();
    // går til valgt matte sin hovedside
    await page.goto(`https://matematikk.net/side/${fag}_Hovedside`);
    // liste over alle eksamenene som er gitt
    const [el] = await page.$x("/html/body/div[5]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl");
    const getText = await el.getProperty("textContent");
    const text = await getText.jsonValue();
    // antall eksamensett som finnes
    const antallOppg = await Math.floor(text.split(/\n/).length/3);
    // Navn på alle eksamenssett. 
    const eksamenFag = await text.split(/\n/);
    const alleEksamenForFag = {}
    let fagnr = 0;
    for(let i = 1; i < antallOppg*2; i+=2){
        const [elLink] = await page.$x(`/html/body/div[5]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl/dd[${i}]/a`);
        const getLink = await elLink.getProperty("href");
        const link = await getLink.jsonValue();
        const readPdf = await getPdfObject(link);
        // legge med link på et vis. 
        const år = await eksamenFag[fagnr];
        fagnr += 3;
        alleEksamenForFag[år] = await {link, readPdf};
    }
    db[fag] = alleEksamenForFag;
    writeFileSync('db.json', JSON.stringify(db, null, 2));
    res.send(alleEksamenForFag);
    browser.close();
})

app.get('/finnEksamensOppgaver/:fag/:sokeord', (req, res) => {
    const fag = req.params.fag;
    const søkeord = req.params.sokeord;
    const oppgs = searchExam(db[fag], søkeord);
    res.send(oppgs);
})