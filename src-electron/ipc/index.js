import { BrowserWindow as bw, ipcMain } from 'electron'
import db from '../db'
import logger from '../logger'
import chkOnline from './chkOnline'
import onPromise from './promise'
import { socket, connect } from '/src-electron/api/socketio'

chkOnline()

onPromise()
// import('./promise')
import('./windows')

ipcMain.on('start', () => {
  logger.info('Frontend started')
  // TODO: add started process
  connect()
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

export function ipcOnline(args) {
  bw.fromId(1).webContents.send('online', { ...args })
}
