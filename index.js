const puppeteer = require('puppeteer');
const express = require('express');

const app = express();
const port = 3050;

app.get('/scrape', async(req, res) => {
    let elements;

    try{
        const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto('https://www.duolingo.com/profile/JUBILEU.P', {waitUntil: 'networkidle2'});

    await page.waitForSelector('.-TMd4')

    const elements = await page.evaluate(() => {
       return Array.from(document.querySelectorAll('.-TMd4')).map(el => el.innerText);
    });
    }catch(error){
        console.error('Error scraping:', error);
        return res.status(500).json({ error: 'Failed to scrape the data' });
    }
    res.json({ elements });
});
app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}/`);
});
