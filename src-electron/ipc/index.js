import { BrowserWindow as bw, ipcMain } from 'electron'
import db from '../db'
import logger from '../logger'
import { socket, initSocket, connect } from '/src-electron/api/socketio'
import status, { initAppFromDb, sendStatus } from '/src-electron/defValues'
import { addQsys, getPa } from '../qsys'

ipcMain.on('getStatus', () => {
  sendStatus()
})

ipcMain.handle('onData', async (e, args) => {
  try {
    await db.update(
      { key: args.key },
      { $set: { value: args.value } },
      { upsert: true }
    )
    return initAppFromDb()
  } catch (error) {
    logger.error(`Data from frontend update failed: ${error}`)
  }
})

ipcMain.handle('getData', async (e, args) => {
  try {
    const r = await db.findOne({ key: args.key })
    return r
  } catch (error) {
    logger.error(`get data from database failed: ${error}`)
  }
})

// command
ipcMain.handle('command', async (e, args) => {
  let rt = null
  switch (args.command) {
    case 'online':
      if (socket) {
        rt = socket.connected
      }
      break
    case 'getDevices':
      socket.emit('getDevices')
      break
    case 'connectQsys':
      addQsys(JSON.parse(args.value))
      break
    case 'getPa':
      getPa(JSON.parse(args.value))
      break
    case 'initVal':
      rt = await initAppFromDb()
      break
    case 'connect':
      try {
        await initSocket(status.serverAddr, status.uid)
        rt = status
      } catch (error) {
        logger.error(`socket io connection error: ${error}`)
      }
      break
  }
  if (rt) {
    return rt
  }
})

ipcMain.handle('getDevices', () => {
  console.log('getDevices')

  socket.emit('getDevices')
})
