import { ipcMain } from 'electron'
import db from '../db'
import { chkAddress } from '/src-electron/api/socketio'
import { getUid } from '/src-electron/api/uid'
export default function () {
  ipcMain.handle('onPromise', async (e, args) => {
    let rt = null

    switch (args.command) {
      case 'getAddr':
        rt = await chkAddress()
        break
      case 'updateAddr':
        rt = await db.update(
          { key: 'serveraddress' },
          { $set: { value: args.value } },
          { upsert: true }
        )
        break
      case 'getUid':
        rt = await getUid()
        break
      case 'newUid':
        rt = await db.update(
          { key: 'uid' },
          { $set: { value: args.value } },
          { upsert: true }
        )
        break
      // case 'socketConnect':
      //   await connect()
      //   break
      default:
        console.log('not defined command ' + args.command)
        break
    }

    return rt
  })
}
