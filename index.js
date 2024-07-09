const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');


const app = express();
const port = 3050;
app.use(cors());

app.get('/scrape', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto('https://www.duolingo.com/profile/JUBILEU.P', { waitUntil: 'networkidle2' });

        // Aguarde o seletor ser carregado
        await page.waitForSelector('.-TMd4');

        // Extraia os dados
        const elements = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.-TMd4')).map(el => el.innerText);
        });

        await browser.close();

        console.log('Dados extraídos:', elements); // Verifique os dados extraídos

        res.json({ elements }); // Envie os dados extraídos para o cliente
    } catch (error) {
        console.error('Erro ao raspar:', error);
        return res.status(500).json({ error: 'Falha ao raspar os dados' });
    }
});

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}/scrape `);
});
