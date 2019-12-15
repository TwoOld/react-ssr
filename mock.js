const express = require('express')
const app = new express()

app.get('/api/course/list', (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Content-Type', 'application/json;charse=utf-8')
    res.json({
        code: 0,
        list: [
            { name: 'micheal', id: 1 },
            { name: 'kobe', id: 1 },
            { name: 'shaque', id: 1 },
            { name: 'ming', id: 1 },
        ]
    })
})
app.get('/api/user/info', (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Content-Type', 'application/json;charse=utf-8')
    res.json({
        code: 0,
        data: {
            name: 'archie',
            best: 'chiu'
        }
    })
})

app.listen(9090)