import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import App from '../src/app'

const app = new express()
app.use(express.static('public'))

app.get('/', (req, res) => {
    // const Page = <App title="Chiu"></App>
    const content = renderToString(App)
    res.send(`
    <html>
        <head>
            <meta charset="urf-8"/>
            <title>react ssr1</title>
        </head>
        <body>
            <div id="app">${content}</div>
            <script src="bundle.js"></script>
        </body>
    </html>
    `)
})

app.listen(9093)