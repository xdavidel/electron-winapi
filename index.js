const user32 = require('./scripts/user32');
const kernel32 = require('./scripts/kernel32');
const { PROCESSOR_ARCHITECTUR } = require('./scripts/enums');


//
const shell = require('electron').shell

const os = require('os')

const fileManagerBtn = document.getElementById('open-file-manager')

fileManagerBtn.addEventListener('click', function (event) {
    shell.showItemInFolder(os.homedir())
})

const selectFileBtn = document.getElementById('select-directory')

selectFileBtn.addEventListener('click', function (event) {
    const remote = require('electron').remote;
    let res = remote.dialog.showOpenDialog([])

    if (res) {
        document.getElementById('selected-directory').innerHTML = res;


        let startupInfo = kernel32.getStartupInfo();
        kernel32.createProcess(res[0], startupInfo);
    }

})

//------------------------------



//


let wind = user32.findWindow("Snipping Tool");
console.log("hWnd: " + wind);

let { threadId, processId } = user32.getWindowThreadProcessId(wind);
console.log("Thread ID: " + threadId)
console.log("Proccess ID: " + processId)


let processHandle = kernel32.openProcess(processId);
console.log("hProcess: " + processHandle);

let sysInfo = kernel32.getSystemInfo();
console.log(PROCESSOR_ARCHITECTUR[sysInfo.wProcessorArchitecture]);

let startupInfo = kernel32.getStartupInfo();
console.log(startupInfo);

        // kernel32.getOpenFileName();