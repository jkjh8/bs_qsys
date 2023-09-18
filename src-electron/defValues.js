import { BrowserWindow as bw } from 'electron'
import db from './db'
import logger from './logger'

const status = {
  serverAddr: '127.0.0.1',
  connected: false,
  socketId: '',
  uid: '',
  devices: []
}

async function initAppFromDb() {
  return new Promise(async function (resolve, reject) {
    try {
      const data = await db.find({})
      for (const args of data) {
        switch (args.key) {
          case 'serveraddress':
            logger.info(`Server address: ${args.value}`)
            status.serverAddr = args.value
            break
          case 'uid':
            logger.info(`Device UID: ${args.value}`)
            status.uid = args.value
            break
        }
      }
      resolve(status)
    } catch (error) {
      reject(error)
    }
  })
}

function sendStatus() {
  return bw.fromId(1).webContents.send('rtStatus', status)
}

export default status
export { initAppFromDb, sendStatus }
