import { BroserWindow as bw } from 'electron'
import db from '../db'
import logger from '../logger'
import chkOnline from './chkOnline'
import onPromise from './promise'

chkOnline()

onPromise()
// import('./promise')
import('./windows')

export function ipcOnline(args) {
  bw.fromId(1).webContents.send('online', { ...args })
}
