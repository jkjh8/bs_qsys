import { ipcMain } from 'electron'
import db from '../db'
import logger from '../logger'

import('./promise')
import('./windows')

ipcMain.on('onRequest', async (e, args) => {
  try {
  } catch (err) {
    logger.error('IPC on request failed with error: ' + err)
  }
})
