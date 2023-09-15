import { BrowserWindow as bw } from 'electron'
import { io } from 'socket.io-client'
import db from '/src-electron/db'
import logger from '/src-electron/logger'
import { ipcOnline } from '/src-electron/ipc'

let socket

const checkServerAddress = async () => {
  const r = await db.findOne({ key: 'serveraddress' })
  if (r) {
    return r.value
  } else {
    await db.update(
      { key: 'serveraddress' },
      { $se: { value: 'http://localhost' } },
      { upset: true }
    )
    return 'http://localhost'
  }
}

const connect = async () => {
  const addr = await checkServerAddress()
  const apiKey = await db.findOne({ key: 'id' })
  socket = io(`${addr}/device`, {
    transports: ['websocket'],
    extraHeaders: { apiKey: apiKey.value },
    withCredentials: true,
    autoConnect: true
  })

  socket.on('connect', () => {
    ipcOnline({ value: true, id: socket.id })
    logger.info(`Socket IO Connected ${socket.id}`)
  })

  socket.on('devices', (devices) => {
    bw.fromId(1).webContents.send('devices', devices)
    console.log('get device: ', devices)
  })

  socket.on('disconnect', () => {
    ipcOnline({ value: false, id: null })
    logger.info(`Socket IO Disconnect ${socket.id}`)
  })
}

export { socket, checkServerAddress, connect }
