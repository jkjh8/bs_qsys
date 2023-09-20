import { BrowserWindow as bw } from 'electron'
import { io } from 'socket.io-client'
import db from '/src-electron/db'
import logger from '/src-electron/logger'
import status, { sendStatus } from '/src-electron/defValues'
import { commands } from './commands'

let socket = null

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
  return socket.connect()
}

function initSocket() {
  return new Promise(async (resolve, reject) => {
    if (socket) {
      resolve(socket)
    }
    let addr, uid
    try {
      addr = await db.findOne({ key: 'serveraddress' })
      uid = await db.findOne({ key: 'uid' })
    } catch (error) {
      reject(error)
    }
    if (!uid) {
      reject(new Error('uid not found'))
    }
    socket = io(
      `http://${addr && addr.value ? addr.value : '127.0.0.1'}/qsys`,
      {
        transports: ['websocket'],
        extraHeaders: { uid: uid.value, type: 'qsys' },
        withCredentials: true,
        autoConnect: true
      }
    )

    socket.on('connect', () => {
      bw.fromId(1).webContents.send('online', true)
      logger.info(`Socket IO Connected: ${socket.id}`)
    })

    socket.on('disconnect', (reason) => {
      bw.fromId(1).webContents.send('online', false)
      logger.info(`Socket IO Disconnected: ${reason}`)
    })

    socket.on('data', (data) => {
      commands(data)
    })
    resolve(socket)
  })
}

function sendLogToServer(args) {
  socket.emit('data', {
    command: 'logger',
    value: {
      source: 'Q-Sys Bridge',
      user: 'Q-Sys Bridge',
      level: args.level ?? 'info',
      priority: args.priority,
      message: args.message
    }
  })
}

export { socket, chkAddress, initSocket, connect, sendLogToServer }
