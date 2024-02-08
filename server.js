const express = require('express');
const app = express();
const fs = require('fs');
const puppeteer = require('puppeteer');

app.get('/upload', async (req, res) => {

    let html = fs.readFileSync('tem3.html', 'utf8');
    const username = req?.query?.name || '';
    htmlContent = html.replace('[username]', username);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    
    const pdfBuffer = await page.pdf({ format: 'A4' });
    
    await browser.close();

    res.set({
        'Content-Type': 'application/pdf'
    });
    
    res.send(pdfBuffer);
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});