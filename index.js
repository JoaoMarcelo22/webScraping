const puppeteer = require('puppeteer');

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
  
    // Navigate the page to a URL
    await page.goto('https://www.duolingo.com/profile/JUBILEU.P', {waitUntil: 'networkidle2'});

    await page.waitForSelector('.-TMd4._1CL8A')

    const resultado = await page.evaluate(() => {
        const element = document.querySelector('.-TMd4._1CL8A');
        return element ? element.innerText : null;
    });
    
    console.log(resultado);
  })();
