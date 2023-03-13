const express = require('express')

const app = express()

app.get('/', (req, res) => {
    let html = "<h1>Hello World Player</h1>"
    res.send(html)
})

app.listen(4080)
