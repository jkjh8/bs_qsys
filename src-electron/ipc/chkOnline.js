import { ipcMain } from 'electron'
import { socket } from '/src-electron/api/socketio'

export default function () {
  ipcMain.handle('checkOnlinePromise', async () => {
    if (socket && socket.connected) {
      return { value: socket.connected, id: socket.id }
    } else {
      return { value: false, id: null }
    }
  })
}
