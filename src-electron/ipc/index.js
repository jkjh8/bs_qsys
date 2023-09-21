import { app, ipcMain, dialog, shell } from 'electron'
import db from '../db'
import logger from '../logger'
import { socket, initSocket, connect } from '/src-electron/api/socketio'
import status, { initAppFromDb, sendStatus } from '/src-electron/defValues'
import { addQsys, getPa } from '../qsys'
import { uploadFile, deleteFile } from '/src-electron/qsys/functions/files'

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
    case 'upload':
      const data = JSON.parse(args.value)
      console.log(
        await uploadFile({
          ...data,
          filepath: '',
          folder: 'examples',
          filename: 'Pandas Dream.wav'
        })
      )
      // console.log(
      //   await deleteFile({
      //     ...data,
      //     folder: 'examples',
      //     filename: 'Pandas Dream.wav'
      //   })
      // )

      break
    case 'getFolder':
      const r = dialog.showOpenDialogSync({
        title: 'Select Media Folder',
        properties: ['openDirectory']
      })
      rt = r[0]
      await db.update(
        { key: 'folder' },
        { $set: { value: r[0] } },
        { upsert: true }
      )
      break
    case 'getDefaultFolder':
      rt = app.getPath('documents')
      break
    case 'openFolder':
      shell.openPath(args.value)
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
