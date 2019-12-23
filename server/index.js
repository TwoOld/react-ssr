import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import routes from '../src/app'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'
import path from 'path'
import fs from 'fs'
const proxy = require('http-proxy-middleware')


const app = new express()
const store = getServerStore()
app.use(express.static('public'))

app.use('/api', proxy({ target: 'http://localhost:9090', changeOrigin: true }));

function csr(res) {
    // 读取文件
    const filename = path.resolve(process.cwd(), 'public/index.csr.html')
    const html = fs.readFileSync(filename, 'utf-8')
    return res.send(html)
}
app.get('*', (req, res) => {
    console.log(req.url);

    // 配置开关开启csr
    // 服务器负载过高开启csr
    if (req.query._mode === 'csr') {
        return csr(res)
    }

    // if (req.url === '/favicon.ico') return res.send()
    const promises = []
    routes.some(route => {
        const match = matchPath(req.path, route)
        if (match) {
            const { loadData } = route.component
            if (loadData) {
                promises.push(loadData(store))
            }
        }
    })
    // routes.some(route => {
    //     const match = matchPath(req.path, route)
    //     if (match) promises.push(route.loadData(match))
    //     return match
    // })
    // const Page = <App title="Chiu"></App>
    // console.log('promise', promises.map(p => p.catch(e => {
    //     if (e && e.config) console.error(`请求${e.config.url}出错`);
    // })));

    Promise.all(promises.map(p => p.catch(e => console.log(`${e.config.url}报错了`)))).then(() => {
        const context = {
            css: []
        }
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Header></Header>
                    <Switch>
                        {routes.map(route => <Route {...route}></Route>)}
                    </Switch>
                </StaticRouter>
            </Provider>
        )
        console.log('context', context);

        if (context.statuscode) {
            res.status(context.statuscode)
        }
        if (context.action === 'REPLACE') {
            res.redirect(301, context.url)
        }
        const css = context.css.join('\n')
        res.send(`
        <html>
            <head>
                <meta charset="urf-8"/>
                <title>react ssr1</title>
                <style>${css}</style>
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