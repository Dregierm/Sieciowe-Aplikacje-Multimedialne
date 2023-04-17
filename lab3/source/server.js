const express = require('express')

const app = express()

app.get('/', (req, res) => {
    let html = `
    <!DOCTYPE HTML>
    <html>
    <head>
    <style>
    table, th, td {
        border: 1px solid black;
      }
    </style>
    </head>
    <body>
        <h1>Hello World Player</h1>
    `

    if(req.query.videoFile) {
        html += `<video id="videoPlayer" controls><source src=${req.query.videoFile}></video><BR><BR>`
        html += `<button id="videoCancel" onClick="cancelVideo()">cancel video</button><BR><BR>`
        html += `<button id="videoAdd" onClick="addToTable('video')">Add video</button><BR><BR>`;
    }

    if(req.query.audioFile) {
        html += `<audio id="audioPlayer" controls><source src=${req.query.audioFile}></audio><BR><BR>`
        html += `<button id="audioCancel" onClick="cancelAudio()">cancel audio</button><BR><BR>`
        html += `<button id="audioAdd" onClick="addToTable('audio')">Add audio</button><BR><BR>`;
    }

    if(req.query.imgFile) {
        html += `<img id="posterImage" src=${req.query.imgFile}><BR><BR>`
        html += `<button id="imgAdd" onClick="addToTable('image')">Add image</button><BR><BR>`;

    }

    html += `
    <table id='playlist_table'>
        <tr>
            <th>No.</th>
            <th>URL</th>
            <th>Type</th>
        </tr>
    </table>

    <script>
    function addToTable(type) {
    
    }
    </script>
    `

    html += `<script>
        function cancelVideo() {
            document.getElementById("videoPlayer").src="cancel.mp4";
        }

        function cancelAudio() {
            document.getElementById("audioPlayer").src="cancel.mp3";
        }
    </script>`

    html +=`
    </body>
    </html>
    `
    res.send(html)
})

app.listen(4080)
