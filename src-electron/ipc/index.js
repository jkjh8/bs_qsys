import { BrowserWindow as bw, ipcMain } from 'electron'
import db from '../db'
import logger from '../logger'
import { socket } from '/src-electron/api/socketio'
import { initAppFromDb, sendStatus } from '/src-electron/defValues'
import { addQsys, getPa } from '../qsys'

ipcMain.on('getStatus', () => {
  sendStatus()
})

ipcMain.handle('onData', async (e, args) => {
  try {
    console.log(args)
    const r = await db.update(
      { key: args.key },
      { $set: { value: args.value } },
      { upsert: true }
    )
    return initAppFromDb()
  } catch (error) {
    logger.error(`Data from frontend update failed: ${error}`)
  }
})

// command
ipcMain.on('command', (e, args) => {
  switch (args.command) {
    case 'getDevices':
      socket.emit('getDevices')
      break
    case 'connectQsys':
      addQsys(JSON.parse(args.value))
      break
    case 'getPa':
      getPa(JSON.parse(args.value))
      break
  }
})

ipcMain.handle('getDevices', () => {
  console.log('getDevices')

  socket.emit('getDevices')
})
