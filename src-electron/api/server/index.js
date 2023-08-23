import { BrowserWindow as bw } from 'electron'
import { io } from 'socket.io-client'
import db from '/src-electron/db'
import logger from '/src-electron/logger'

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

const socketIoConnect = async () => {
  const addr = await checkServerAddress()
  const apiKey = await db.findOne({ key: 'id' })
  socket = io(`${addr}/device`, {
    transports: ['websocket'],
    extraHeaders: { apiKey: apiKey.value },
    withCredentials: true,
    autoConnect: true
  })

  socket.on('connect', () => {
    bw.fromId(1).webContents.send('onResponse', {
      key: 'socketIoConnect',
      value: true
    })
    logger.info(`Socket IO Connected ${socket.id}`)
  })

  socket.on('disconnect', () => {
    bw.fromId(1).webContents.send('onResponse', {
      key: 'socketIoConnect',
      value: false
    })
  })
}

export { socket, checkServerAddress, socketIoConnect }
