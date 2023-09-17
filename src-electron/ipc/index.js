import { BrowserWindow as bw, ipcMain } from 'electron'
import db from '../db'
import logger from '../logger'
import chkOnline from './chkOnline'
import onPromise from './promise'
import { socket, connect } from '/src-electron/api/socketio'
import status, { sendStatus } from '/src-electron/defValues'

chkOnline()

onPromise()
// import('./promise')
import('./windows')

ipcMain.on('getStatus', () => {
  sendStatus()
})

ipcMain.handle('onData', async (args) => {
  try {
    const r = await db.update(
      { key: args.key },
      { $set: { value: args.value } },
      { upsert: true }
    )
    console.log(r)
    if (r) {
      status.serverAddr = args.value
    }
    // sendStatus()
    return r
  } catch (error) {
    logger.error(`Data from frontend update failed: ${error}`)
  }
})

// command
ipcMain.on('command', (args) => {
  switch (args.command) {
    case 'getDevices':
      socket.emit('getDevices')
      break
  }
})

ipcMain.handle('getDevices', () => {
  console.log('getDevices')

  socket.emit('getDevices')
})
