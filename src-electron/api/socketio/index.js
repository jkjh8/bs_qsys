import { BrowserWindow as bw } from 'electron'
import { io } from 'socket.io-client'
import db from '/src-electron/db'
import logger from '/src-electron/logger'
import { ipcOnline } from '/src-electron/ipc'

let socket

const chkAddress = async () => {
  const r = await db.findOne({ key: 'serveraddress' })
  const addr = '127.0.0.1'
  if (r && r.value) {
    return r.value
  } else {
    await db.update(
      { key: 'serveraddress' },
      { $se: { value: addr } },
      { upset: true }
    )
    return addr
  }
}

const connect = async () => {
  const addr = await chkAddress()
  const apiKey = await db.findOne({ key: 'id' })
  try {
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
  } catch (error) {
    logger.error(`socket io connectino error: ${error}`)
  }
}

export { socket, chkAddress, connect }
