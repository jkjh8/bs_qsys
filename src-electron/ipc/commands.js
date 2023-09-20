import { ipcMain } from 'electron'
import { initAppFromDb } from 'src-electron/defValues'

export default function () {
  ipcMain.handle('commandPromise', async (args) => {
    let rt
    switch (args.command) {
      case 'initVal':
        rt = await initAppFromDb()
        break
      case 'connectSocket':
        rt = await connect()
        break
    }
    return rt
  })
}
