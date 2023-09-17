import { app, BrowserWindow, nativeTheme } from 'electron'
import path from 'path'
import os from 'os'
import db from './db'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

// import ipc functions
import('./ipc')

let mainWindow

async function createWindow() {
  /**
   * Initial window options
   */
  // const size = await db.findOne({ key: 'windowSize' })
  // const position = await db.findOne({ key: 'windowPosition' })

  // create a main window
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 800,
    height: 600,
    // x: position.x ?? 100,
    // y: position.y ?? 50,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      // More info: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // mainWindow.on('move', async () => {
  //   const position = mainWindow.getPosition()
  //   const r = await db.update(
  //     {
  //       key: 'windowPosition'
  //     },
  //     {
  //       $set: {
  //         x: position[0],
  //         y: position[1]
  //       }
  //     },
  //     { upsert: true }
  //   )
  //   console.log(r)
  // })
}

app.whenReady().then(async () => {
  // before create window

  // load default settings
  // connect socket.io
  // ...etc
  createWindow()
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
