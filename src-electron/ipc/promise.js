import { ipcMain } from 'electron'
import db from '../db'
import { socket, socketIoConnect } from '/src-electron/api/socketio'

export default function () {
  ipcMain.handle('onPromise', async (e, args) => {
    let rt = null

    switch (args.command) {
      case 'getServerAddress':
        rt = await db.findOne({ key: 'serveraddress' })
        break
      case 'updateServerAddress':
        if (socket.connected) {
          socket.disconnect()
        }
        rt = await db.update(
          { key: 'serveraddress' },
          { $set: { value: args.value } },
          { upsert: true }
        )
        await socketIoConnect()
        break
      case 'getId':
        rt = await db.findOne({ key: 'id' })
        break
      case 'updateId':
        if (socket.connected) {
          socket.disconnect()
        }
        rt = await db.update(
          { key: 'id' },
          { $set: { value: args.value } },
          { upsert: true }
        )
        socketIoConnect()
        break
      // case 'socketConnect':
      //   await socketIoConnect()
      //   break
      default:
        console.log('not defined command ' + args.command)
        break
    }

    return rt
  })
}
