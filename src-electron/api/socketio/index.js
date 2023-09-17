import { BrowserWindow as bw } from 'electron'
import { io } from 'socket.io-client'
import db from '/src-electron/db'
import logger from '/src-electron/logger'
import status, { sendStatus } from '/src-electron/defValues'

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
  try {
    socket = io(`http://${status.serverAddr}/device`, {
      transports: ['websocket'],
      extraHeaders: { apiKey: status.uid },
      withCredentials: true,
      autoConnect: true
    })
    socket.on('connect', () => {
      status.connected = true
      status.socketId = socket.id
      logger.info(`Socket IO Connected ${socket.id}`)
      sendStatus()
    })

    socket.on('devices', (devices) => {
      devices = devices
      console.log('get device: ', devices)
      sendStatus()
    })

    socket.on('disconnect', () => {
      status.connected = false
      status.socketId = null
      logger.info(`Socket IO Disconnect ${socket.id}`)
      sendStatus()
    })
  } catch (error) {
    logger.error(`socket io connectino error: ${error}`)
  }
}

export { socket, chkAddress, connect }
