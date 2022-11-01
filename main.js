const { ipcMainManager } = import('./src/main/ipc')

const { app, BrowserWindow ,Menu} = require('electron')
const path = require('path')

Menu.setApplicationMenu(null)

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 760,
        webPreferences: {
            nodeIntegration: true, // 是否集成 Nodejs
            enableRemoteModule: true,
            contextIsolation: false,
            preload: path.join(__dirname, './src/main/preload.ts')
        },
    })

    win.loadFile('./src/render/html/index.html')
}

app.whenReady().then(() => {
    //分发render消息
    ipcMainManager.handle()
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})