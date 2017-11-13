const { ipcRenderer } = require('electron');

const logsElem = document.getElementById('logs');

ipcRenderer.on('file:selectedFile', (e, selectedFile) => {
    if (selectedFile) {
        document.getElementById('selected-file-path').innerText = selectedFile;
        ipcRenderer.send('file:debug', selectedFile[0]);
    }
})

ipcRenderer.on('log:msg', (e, message) => {
    if (message) {
        if (typeof message == 'object') {
            logsElem.innerText += `\n${JSON.stringify(message)}`;

        } else {

            logsElem.innerText += `\n${message}`;
        }
    }
})