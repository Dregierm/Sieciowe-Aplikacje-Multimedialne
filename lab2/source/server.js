const express = require('express')

const app = express()

app.get('/', (req, res) => {
    let html = "<h1>Hello World Player</h1>"
    if(req.query.videoFile) {
        html += `<video id="videoPlayer" controls><source src=${req.query.videoFile}></video><BR><BR>`
    }
    if(req.query.audioFile) {
        html += `<audio id="audioPlayer" controls><source src=${req.query.audioFile}></audio><BR><BR>`
    }
    res.send(html)
})

app.listen(4080)