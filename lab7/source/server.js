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
        html += `<button id="videoAdd" onClick="addToTable('Video')">Add video</button><BR><BR>`;
        html += `<button id="videoPlay" onClick="playVideo()">Play Video</button><br><br>`;
    	html += `<button id="videoPause" onClick="pauseVideo()">Pause Video</button><br><br>`;
    }

    if(req.query.audioFile) {
        html += `<audio id="audioPlayer" controls><source src=${req.query.audioFile}></audio><BR><BR>`
        html += `<button id="audioCancel" onClick="cancelAudio()">cancel audio</button><BR><BR>`
        html += `<button id="audioAdd" onClick="addToTable('Audio')">Add audio</button><BR><BR>`;
    }

    if(req.query.imgFile) {
        html += `<img id="posterImage" src=${req.query.imgFile}><BR><BR>`
        html += `<button id="imgAdd" onClick="addToTable('Image')">Add image</button><BR><BR>`;
    }

    html += `
    <table id='playlist_table'>
        <tr>
            <th>No.</th>
            <th>URL</th>
            <th>Type</th>
            <th>Action</th>
        </tr>
    </table>

    <script>
    let counter = 1;
    function addToTable(type) {
        let src;
        if (type == 'Audio')
            src = document.getElementById('audioPlayer').getElementsByTagName("source")[0].src;
        else if (type == 'Video')
            src = document.getElementById('videoPlayer').getElementsByTagName("source")[0].src;
        else if (type == 'Image')
            src = document.getElementById('posterImage').getAttribute('src');

        let table = document.getElementById('playlist_table');
        let newRow = table.insertRow(-1);

        newRow.insertCell(0).innerText = counter;
        newRow.insertCell(1).innerText = src;
        newRow.insertCell(2).innerText = type;
        let newRowAction = newRow.insertCell(3);

        let newButton = document.createElement('button');
        newButton.classList.add('removeRowButton');
        newButton.textContent = 'Delete';
        newButton.addEventListener('click', (event) => {
            let button = event.target;
            let row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
           
            if (table.rows.length == 1)
                counter = 1;
               
            for (let i = 1; i < table.rows.length; i++) {
                table.rows[i].cells[0].innerText = i;
                counter = i + 1;
            }
        });
        newRowAction.appendChild(newButton);

        let upBtn = document.createElement('button');
        upBtn.classList.add('moveRowUpButton');
        upBtn.textContent = 'Up';
        newRowAction.appendChild(upBtn);

        let downBtn = document.createElement('button');
        downBtn.classList.add('moveRowDownButton');
        downBtn.textContent = 'Down';
        newRowAction.appendChild(downBtn);
        
        upBtn.addEventListener('click', (event) => {
            let button = event.target;
            let rowToMove = button.parentNode.parentNode;
            let rowIndex = rowToMove.rowIndex;
            let rows = Array.from(table.rows);
            
            if (rowIndex <= 1) {
                rows.splice(rowIndex,1);
                rows.push(rowToMove);
            } else {
                while (table.rows.length > 0) 
                    table.deleteRow(0);
                    
                [rows[rowIndex], rows[rowIndex-1]] = [rows[rowIndex-1], rows[rowIndex]];
            }
            
            for(let i = 0; i < rows.length; i++)
                table.appendChild(rows[i]);
            
            for (let i = 1; i < table.rows.length; i++) {
                table.rows[i].cells[0].innerText = i;
                counter = i+1;
            }
         
        });
        
        downBtn.addEventListener('click', (event) => {
            let button = event.target;
            let rowToMove = button.parentNode.parentNode;
            let rowIndex = rowToMove.rowIndex;
            let rows = Array.from(table.rows);
            
            if (rowIndex >= rows.length-1) {
                rows.splice(rowIndex,1);
                rows.splice(1, 0, rowToMove);
            } else {
                while (table.rows.length > 0) 
                    table.deleteRow(0);
                [rows[rowIndex], rows[rowIndex+1]] = [rows[rowIndex+1], rows[rowIndex]];
            }
            for(let i = 0; i < rows.length; i++)
                table.appendChild(rows[i]);
            
            for (let i = 1; i < table.rows.length; i++) {
                table.rows[i].cells[0].innerText = i;
                counter = i+1;
            }
         
        });
       
   
        counter++;
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
