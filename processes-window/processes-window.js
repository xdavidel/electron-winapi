const { ipcRenderer } = require('electron');
const psList = require('ps-list');

const loadingSpace = document.getElementById('loading-space');
const processesSpace = document.getElementById('processes-space');
const tableBody = document.getElementById('processes')
const searchInput = document.getElementById('search-input');
searchInput.disabled = true;

let timeoutRefresh;

toggleLoading(true);

searchInput.addEventListener('input', (event) => {
    clearTimeout(timeoutRefresh);

    if (processesList) {

        timeoutRefresh = setTimeout(() => {
            for (let item of processesList) {
                if (item.process.name.toUpperCase().indexOf(searchInput.value.toUpperCase()) < 0) {
                    item.visible = false;
                } else {
                    item.visible = true;
                }
            }

            refreshProcess();
        }, 500)
    }
})

let processesList = []

psList().then(data => {
    console.log(data);
    processesList = data.map(p => {
        return {
            process: p,
            visible: true
        }
    });
    //=> [{pid: 3213, name: 'node', cmd: 'node test.js', cpu: '0.1'}, ...]

    searchInput.disabled = false;
    refreshProcess();
});

function debugBtnClick(processId) {
    ipcRenderer.send('process:debug', processId)
}

function refreshProcess() {
    // clear the table first
    tableBody.innerHTML = '';
    toggleLoading(true);

    for (let { process, visible } of processesList) {

        if (visible) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML = process.pid;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerHTML = process.name;
            tr.appendChild(td);

            td = document.createElement('td');
            let btn = document.createElement('button');
            btn.innerText = 'Debug';
            btn.setAttribute('class', 'button is-danger')
            btn.addEventListener('click', () => {
                debugBtnClick(process.pid)
            })
            td.appendChild(btn)
            tr.appendChild(td);

            tableBody.appendChild(tr);
        }
    }

    toggleLoading(false);
}

function toggleLoading(on) {
    if (on) {
        loadingSpace.style.display = 'block';
        processesSpace.style.display = 'none';
    } else {
        loadingSpace.style.display = 'none';
        processesSpace.style.display = 'block';
    }

}