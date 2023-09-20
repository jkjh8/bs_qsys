import { BrowserWindow as bw } from 'electron'
export async function commands(args) {
  switch (args.command) {
    case 'devices':
      bw.fromId(1).webContents.send('rtDevices', args.data)
      break
  }
}
