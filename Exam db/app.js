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
app.post('/oppdaterEksamensoppgaver', async (req, res) => {
    const alleFag = "S1 S2 R1 R2 1P 2P 1T".split(" ");
    var { month, year } = req.body;
    month = +month;
    year = +year;
    const updates = JSON.parse(readFileSync('update.json'));
    const [ h, v ] = updates.updates.filter(e => e.year === year);
    try{
        let uppdateNeeded = false;
        // etter vår eksamen er gitt, og vår er ikke notert.
        if(month >= 6 && month <= 11 && !v) uppdateNeeded = true;
        // etter høst eksamen er gitt, og høst er ikke notert.
        if(month >= 0 && month <= 5 && !h) uppdateNeeded = true;
        if(!uppdateNeeded){
            res.send({status: "Trenger ikke å oppdatere database"})
            return;
        }
    } catch(e){ /** Må oppdateres */ }

    // noterer oppdatering
    updates.updates.push({month, year, updated: true});
    writeFileSync('update.json', JSON.stringify(updates, null, 2));

    const browser = await ws.launch();
    for(const fag of alleFag) {
        console.log(fag);
        const page = await browser.newPage();
        // går til valgt matte sin hovedside
        await page.goto(`https://matematikk.net/side/${fag}_Hovedside`);
        // liste over alle eksamenene som er gitt
        const xpath = fag !== "1T" ? "/html/body/div[5]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl" : "/html/body/div[6]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl"
        const [el] = await page.$x(xpath);
        const getText = await el.getProperty("textContent");
        const text = await getText.jsonValue();
        // antall eksamensett som finnes
        var antallOppg = await Math.floor(text.split(/\n/).length/3);
        // Filer etter -antall er ødelagte.
        if(fag == "1P") antallOppg = antallOppg-4;
        if(fag == "2P") antallOppg = antallOppg-11;
        // Navn på alle eksamenssett. 
        const eksamenFag = await text.split(/\n/);
        const alleEksamenForFag = {}
        let fagnr = 0;
        for(let i = 1; i < antallOppg*2; i+=2){
            const år = await eksamenFag[fagnr];
            if(fag === "1T" && år === "Høst 2020") {
                fagnr += 5;
                continue;
            }
            if(fag === "1T" && år === "Høst 2010") break;
            console.log(`Fag: ${fag}, år: ${år}`);
            const x = fag !== "1T" ? `/html/body/div[5]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl/dd[${i}]/a` : `/html/body/div[6]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl/dd[${i}]/a`
            const [elLink] = await page.$x(x);
            const getLink = await elLink.getProperty("href");
            const link = await getLink.jsonValue();
            const readPdf = await getPdfObject(link);
            fagnr += 3;
            alleEksamenForFag[år] = await {link, readPdf};
        }
        db[fag] = alleEksamenForFag;
    }
    browser.close();
    // skriver til databasen
    writeFileSync('db.json', JSON.stringify(db, null, 2));
    res.send({status: "Database oppdatert"})
    console.log("Database oppdatert");
})

// debugging
app.get('/oppdaterEksamensoppgaver/:fag', async (req, res) => {
    const fag = req.params.fag;
    const browser = await ws.launch();
    const page = await browser.newPage();
    // går til valgt matte sin hovedside
    await page.goto(`https://matematikk.net/side/${fag}_Hovedside`);
    // liste over alle eksamenene som er gitt
    const xpath = fag !== "1T" ? "/html/body/div[5]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl" : "/html/body/div[6]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl"
    const [el] = await page.$x(xpath);
    const getText = await el.getProperty("textContent");
    const text = await getText.jsonValue();
    // antall eksamensett som finnes
    const antallOppg = await Math.floor(text.split(/\n/).length/3);
    // Navn på alle eksamenssett. 
    const eksamenFag = await text.split(/\n/);
    const alleEksamenForFag = {}
    let fagnr = 0;
    for(let i = 1; i < antallOppg*2; i+=2){
        const år = await eksamenFag[fagnr];
        if(år === "Høst 2020") {
            fagnr += 5;
            continue;
        }
        if(år === "Høst 2010") break;
        console.log(år);
        const x = fag !== "1T" ? `/html/body/div[5]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl/dd[${i}]/a` : `/html/body/div[6]/div/div[1]/div[1]/div[2]/div[1]/div/div[1]/dl/dd[${i}]/a`
        const [elLink] = await page.$x(x);                   
        const getLink = await elLink.getProperty("href");
        const link = await getLink.jsonValue();
        const readPdf = await getPdfObject(link);
        fagnr += 3;
        alleEksamenForFag[år] = await {link, readPdf};
    }
    db[fag] = alleEksamenForFag;
    writeFileSync('tdb.json', JSON.stringify(db, null, 2));
    res.send(alleEksamenForFag);
    browser.close();
})


app.get('/finnEksamensOppgaver/:fag/:sokeord', (req, res) => {
    const fag = req.params.fag;
    const søkeord = req.params.sokeord;
    const oppgs = searchExam(db[fag], søkeord);
    res.send(oppgs);
})