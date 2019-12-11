import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { StaticRouter } from 'react-router-dom'
import App from '../src/app'
import { Provider } from 'react-redux'
import store from '../src/store/store'

const app = new express()
app.use(express.static('public'))

app.get('*', (req, res) => {
    // const Page = <App title="Chiu"></App>
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>{App}</StaticRouter>
        </Provider>
    )
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