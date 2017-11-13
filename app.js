const path = require('path');
const { BrowserWindow, app, ipcMain, dialog, Menu } = require('electron');

const user32 = require('./scripts/user32')
const kernel32 = require('./scripts/kernel32');
const { PROCESSOR_ARCHITECTUR, DEBUG_EVENT_CODES, DEBUG_CONTINUE_STATUS, EXCEPTION_CODES } = require('./scripts/enums');

let mainWindow = null;
let processesWindow = null;

// set ENV
process.env.NODE_ENV = 'dev';

function createWindow() {
    let windowOptions = {
        width: 1080,
        height: 840
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/main-window/main-window.html'))

    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        if (processesWindow) {
            processesWindow.close()
        }
        mainWindow = null
    })

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

}

// ============================= App Menus =================================

// Create menu template
const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Create New Process',
        accelerator: isMac() ? 'Command+N' : 'Ctrl+N',
        click() {
            let selectedFiles = selectFile();
            if (selectedFiles) {
                debugNewProcess(selectedFiles[0])
            }
        }
    }, {
        label: 'Open Active Process',
        accelerator: isMac() ? 'Command+O' : 'Ctrl+O',
        click() {
            createProcessesWindow()
        }
    }, {
        label: 'Exit',
        accelerator: isMac() ? 'Command+Q' : 'Ctrl+Q',
        click() {
            app.quit();
        }
    }]
}];

// if mac -> add empty object to menu
if (isMac()) {
    mainMenuTemplate.unshift({});
}

// add developer tools if not in prod
if (process.env.NODE_ENV != 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
            label: 'Toggle DevTools',
            accelerator: isMac() ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }, {
            role: 'reload'
        }]
    })
}

// check if platform is a mac
function isMac() {
    return process.platform == 'darwin';
}


// ============================= App Events =================================

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})

// ============================= IPC Events =================================

ipcMain.on('process:debug', (e, processId) => {
    if (processesWindow) {
        processesWindow.close();
    }

    if (processId) {
        debugRunningProcess(processId);
    }
})
// ============================= Functions =================================

function createProcessesWindow() {
    processesWindow = new BrowserWindow({
        width: 600,
        height: 680,
        title: 'Running Processes'
    });

    processesWindow.loadURL(path.join('file://', __dirname, '/processes-window/processes-window.html'))

    // for garbage collection
    processesWindow.on('close', () => {
        processesWindow = null;
    })
}

function selectFile() {
    return dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [{ name: 'Executable', extensions: ['exe'] }]
    })
}

function debugNewProcess(file) {
    let startupInfo = kernel32.getStartupInfo();

    let { isOk, processInformation } = kernel32.createProcess(file, startupInfo);

    if (!isOk) {
        Log("Debuge Failed. Error: " + kernel32.getLastError())
        return
    }

    debuggerLoopAsync(processInformation);
}

function debugRunningProcess(processId) {
    console.log("Proccess ID: " + processId)

    let p = kernel32.openProcess(processId)
    console.log(p);

    // if (processId != 0) {
    //     if (kernel32.debugActiveProcess(processId)) {
    //         debuggerLoopAsync({ hProcess: processId, hThread: 0 });
    //     } else {
    //         Log('Process Debug Failed')
    //     }
    // }
    // else {
    //     Log('Cannot find process')
    // }

}

function Log(message) {
    mainWindow.webContents.send('log:msg', message);
}

function debuggerLoopAsync(processInformation) {
    Log("Start Debugging")

    setTimeout(() => {


        let run = true;

        while (run) {
            let { isOk, debugEvent } = kernel32.waitForDebugEvent();

            if (isOk) {
                switch (debugEvent.dwDebugEventCode) {
                    case DEBUG_EVENT_CODES.EXIT_PROCESS_DEBUG_EVENT:
                        Log(debugEvent)
                        Log("The debuggee exits");

                        run = false;
                        break;

                    case DEBUG_EVENT_CODES.CREATE_PROCESS_DEBUG_EVENT:
                        Log("CREATE_PROCESS_DEBUG_EVENT")
                        Log(`Process ${debugEvent.dwProcessId} Created`)

                        break;

                    case DEBUG_EVENT_CODES.EXCEPTION_DEBUG_EVENT:
                        Log("EXCEPTION_DEBUG_EVENT")
                        // console.log(debugEvent)
                        // if (debugEvent.exception.exceptionCode == EXCEPTION_CODES.EXCEPTION_BREAKPOINT) {
                        //     kernel32.continueDebugEvent(debugEvent.dwProcessId, debugEvent.dwThreadId, DEBUG_CONTINUE_STATUS.DBG_CONTINUE);
                        //     continue;
                        // }

                        // console.log(debugEvent.exception.exceptionCode, EXCEPTION_CODES.EXCEPTION_BREAKPOINT)
                        // kernel32.continueDebugEvent(debugEvent.dwProcessId, debugEvent.dwThreadId, DEBUG_CONTINUE_STATUS.DBG_CONTINUE);
                        // if (debugEvent.exception.exceptionCode == EXCEPTION_CODES.EXCEPTION_BREAKPOINT) {
                        //     kernel32.continueDebugEvent(debugEvent.dwProcessId, debugEvent.dwThreadId, DEBUG_CONTINUE_STATUS.DBG_CONTINUE);
                        // }
                        break;

                    case DEBUG_EVENT_CODES.CREATE_THREAD_DEBUG_EVENT:
                        Log("A new thread is created");
                        break;

                    case DEBUG_EVENT_CODES.EXIT_THREAD_DEBUG_EVENT:
                        Log("A thread is destroyed");
                        break;
                    default:
                        break;
                }
            }

            kernel32.continueDebugEvent(debugEvent.dwProcessId, debugEvent.dwThreadId, DEBUG_CONTINUE_STATUS.DBG_EXCEPTION_NOT_HANDLED)

        }

        kernel32.closeHandle(processInformation.hProcess);
        kernel32.closeHandle(processInformation.hThread);
    }, 0)
}

