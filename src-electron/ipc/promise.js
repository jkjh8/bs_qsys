import { ipcMain } from 'electron'
import db from '../db'
ipcMain.handle('onPromise', async (e, args) => {
  let rt = null

  switch (args.command) {
    case 'getServerAddress':
      rt = await db.findOne({ key: 'serveraddress' })
      break
    case 'updateServerAddress':
      rt = await db.update(
        { key: 'serveraddress' },
        { $set: { value: args.value } },
        { upsert: true }
      )
      break
    case 'getId':
      rt = await db.findOne({ key: 'id' })
      break
    case 'updateId':
      rt = await db.update(
        { key: 'id' },
        { $set: { value: args.value } },
        { upsert: true }
      )
      break
    default:
      console.log('not defined command ' + args.command)
      break
  }

  return rt
})
