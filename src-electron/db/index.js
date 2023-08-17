import { app } from 'electron'
import path from 'path'
import Datastore from 'nedb-promises'
import logger from '/src-electron/logger'

let db
let dbPath

const dbInit = (file) => {
  dbPath = path.resolve(app.getPath('userData'), 'bs_qsys', file)
  return new Datastore({
    filename: dbPath,
    timestampData: true,
    autoload: true
  })
}
try {
  db = dbInit('datastore')
  logger.info(`DB initialization DB path: ${dbPath}`)
} catch (err) {
  logger.error(`DB not initialized ${err}`)
}

export default db
