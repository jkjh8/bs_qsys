import { ipcMain } from 'electron'
import db from '/src-electron/db'
import logger from '/src-electron/logger'

ipcMain.on('windowSizePosition', async (e, args) => {
  try {
    const r = await db.update(
      { key: 'windowSize' },
      { $set: { ...args } },
      { upsert: true }
    )
    console.log(r)
  } catch (err) {
    logger.error('IPC on request failed with error: ' + err)
  }
})
