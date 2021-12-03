const ws = require('puppeteer');
const fs = require('fs');

(async (url) => {
    const browser = await ws.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const jokes = {};
    var date = 1;
    for (let i = 4; i < 52; i+=2) {
        const [el] = await page.$x(`/html/body/div[5]/div[2]/div[1]/div/div[1]/article/div[5]/p[${i}]`);
        const getText = await el.getProperty("textContent");
        const text = await getText.jsonValue();
        jokes[date] = text;
        date++;
        
    }
    browser.close();
    fs.writeFileSync("jokes.json", JSON.stringify(jokes));
})("https://inews.co.uk/light-relief/jokes/christmas-jokes-funny-best-one-liners-list-219750");