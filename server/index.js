import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { StaticRouter, matchPath, Route } from 'react-router-dom'
import routes from '../src/app'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'
import axios from 'axios'

const app = new express()
const store = getServerStore()
app.use(express.static('public'))

app.use('/api', (req, res) => {
    axios.request({
        method: req.method,
        baseURL: 'http://localhost:9090/api',
        url: req.url,
        data: req.body
    }).then(response => res.json(response.data))
        .catch(err => console.log(err))
})
app.get('*', (req, res) => {
    if (req.url === '/favicon.ico') return
    const promises = []
    routes.some(route => {
        const match = matchPath(req.path, route)
        if (match) {
            const { loadData } = route.component
            promises.push(
                new Promise(resolve => {
                    loadData(store)
                        .then(resolve)
                        .catch(err => {
                            console.log(err.response.status);
                            resolve(err)
                        })
                })
            )
        }
    })
    // routes.some(route => {
    //     const match = matchPath(req.path, route)
    //     if (match) promises.push(route.loadData(match))
    //     return match
    // })
    // const Page = <App title="Chiu"></App>
    Promise.all(promises).then(() => {
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <Header></Header>
                    {routes.map(route => <Route {...route}></Route>)}
                </StaticRouter>
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
                <script>
                    window.__context = ${JSON.stringify(store.getState())}
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
        `)
    }).catch(() => res.send('报错页面'))
})

app.listen(9093)