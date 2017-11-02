const path = require('path');
const { BrowserWindow, app } = require('electron').remote;
let mainWindow;

(function initialize() {
    let shouldQuit = makeSingleInstance()
    if (shouldQuit) { return app.quit() }

    function createWindow() {
        let windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName()
        }

        mainWindow = new BrowserWindow(windowOptions)
        mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

        // Launch fullscreen with DevTools open, usage: npm run debug

        mainWindow.webContents.openDevTools()

        mainWindow.on('closed', function () {
            mainWindow = null
        })

    }

    app.on('ready', function () {
        createWindow()
    })

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
})()

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) { return false }

    return app.makeSingleInstance(function () {
        if (mainWindow) {
            if (mainWindow.isMinimized()) { mainWindow.restore() }
            mainWindow.focus()
        }
    })
}