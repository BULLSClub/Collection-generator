// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, globalShortcut } = require('electron')
const path = require('path');
const { shell } = require('electron')
const fs = require('fs')
const fsPromise = require('fs/promises')


const isDev = require('electron-is-dev')


let win
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1100,
    height: 600,
    icon: './icon.png',
    resizable: false,
    fullscreenable: false,
    fullscreen: false,
    autoHideMenuBar: true,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
      contextIsolation: false,
      devTools: isDev
    }
  })

  ipcMain.handle('openFolder', async (event, path) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
      filePaths: [path]
    });

    return result.filePaths.length ? result.filePaths[0] : ""
  })

  ipcMain.handle('initDirectory', async (event) => {
    const defaultNftPath = path.join(app.getPath('desktop'), "NFT")
    const defaultMetadataPath = path.join(defaultNftPath, "Metadata")
    const folderExist = statPath(defaultMetadataPath)
    if (folderExist) {
      return [defaultNftPath, defaultMetadataPath]
    }
    if (!statPath(defaultNftPath)) {
      await fsPromise.mkdir(defaultNftPath)
    }
    if (!statPath(defaultMetadataPath)) {
      await fsPromise.mkdir(defaultMetadataPath)
    }
    return [defaultNftPath, defaultMetadataPath]
  })

  function statPath(path) {
    try {
      return fs.statSync(path).isDirectory();
    } catch (ex) { }
    return false;
  }



  ipcMain.handle('outputFolder', async (event, path) => {
    shell.openPath(path)
    return true
  })



  ipcMain.handle('saveFile', async (event, path) => {
    try { fs.writeFileSync(`${path.nftPath}/${path.index + 1}.${path.format.toString().toLowerCase()}`, path.file) }
    catch (e) {
      console.log(e)
    }
    try { fs.writeFileSync(`${path.metadataPath}/${path.index + 1}.json`, JSON.stringify(path.metadata)) }
    catch (e) {
      console.log(e)
    }
  })

  const appUrl = isDev ? 'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`

  // and load the index.html of the app.
  win.loadURL(appUrl)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (!isDev) {
    globalShortcut.register('CommandOrControl+R', () => { })
    globalShortcut.register('CommandOrControl+Shift+R', () => { })
    globalShortcut.register('F5', () => { })
  }
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.