const express = require('express')
const axios = require('axios')
const app = express()
const puppeteer = require('puppeteer')

async function test() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://kaikeba.com')
    await page.screenshot({ path: 'kaikeba.png' })
    await browser.close()
}

// test()
const urlCache = {}
app.get('*', async (req, res) => {
    console.log(req.url)
    if (req.url === 'favicon') {
        return res.send({ code: 0 })
    }
    if (urlCache[req.utl]) {
        return res.send(urlCache[req.url])
    }
    const url = 'http://localhost:9093' + req.url
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: ['networkidle0']
    })

    const html = await page.content()
    console.log(html);
    urlCache[req.url] = html
    res.send(html)
})

app.listen(8081, () => console.log('ssr server start http://localhost:8081'))