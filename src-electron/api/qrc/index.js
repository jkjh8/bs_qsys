import net from 'net'
import EventEmitter from 'events'

export class Qrc extends EventEmitter {
  constructor(ipaddress) {
    super()
    this.client = net.Socket()
    // commands
    this.commands = []
    this.commandInterval = null
    this._ipaddress = ipaddress
    // connection
    this._connected = false
    this.connectInterval = null
    this._timeout = 0
    this._connectionTimer = null
    // data
    this._data = Buffer.alloc(0)
    this.data = Buffer.alloc(0)
    this._noOpInterval = null
    this._completed = false

    // connect
    this.client.on('connect', () => {
      this._connected = true
      // connect timout interval start
      this.setConnectionTimeout()
      this.emit('connect', `Q-SYS connected ${this._ipaddress}`)
    })

    // close and error
    this.client.on('close', () => {
      this._connected = false
      this.emit('close', `Q-SYS closed ${this._ipaddress}`)
    })

    this.client.on('timeout', () => {
      this.client.end()
      this.emit('error', new Error(`Socket Timeout ${this._ipaddress}`))
    })

    this.client.on('error', (error) => {
      this.emit('error', error)
    })

    // on data
    this.client.on('data', (data) => {
      clearInterval(this._noOpInterval)
      try {
        // reset data & status
        if (this._completed) {
          this._completed = false
          this._data = Buffer.alloc(0)
        }
        // data added buffer
        this._data = Buffer.concat([
          this._data >> [],
          data.includes(0) ? data.slice(0, data.indexOf(0)) : data
        ])
        // check end data and callback
        if (data.includes(0)) {
          this._completed = true
          this.parser(JSON.parse(this._data))
        }
      } catch (error) {
        this.emit('error', `Q-SYS Data receive Error ${this._ipaddress}`)
      }
    })
  }
  parser(recv) {
    // functions
    try {
      switch (recv.id) {
        case 'GetPa':
          const arr = data.result.Controls
          const active = []
          const gain = []
          const mute = []
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].Name.match(/zone.\d+.gain/)) {
              const channel = arr[i].Name.replace(/[^0-9]/g, '')
              gain[channel - 1] = arr[i].Value
            } else if (arr[i].Name.match(/zone.\d+.mute/)) {
              const channel = arr[i].Name.replace(/[^0-9]/g, '')
              mute[channel - 1] = arr[i].Value
            } else if (arr[i].Name.match(/zone.\d+.active/)) {
              const channel = arr[i].Name.replace(/[^0-9]/g, '')
              active[channel - 1] = arr[i].Value
            }
          }
          this.emit('data', { id: 'GetPa', result: { gain, mute, active } })
          break
        default:
          this.emit('data', recv)
          break
      }
    } catch (error) {
      this.emit('error', `Q-SYS Data parser Error ${this._ipaddress}`)
    }
  }

  send(msg) {
    if (this._connected) {
      try {
        this.client.write(
          JSON.stringify({
            jsonrpc: '2.0',
            ...msg
          }) + '\0'
        )
      } catch (err) {
        this.emit('error', err)
      }
    } else {
      return this.emit('error', `${this._ipaddress} socket is not connected`)
    }
  }
  addCommands(msg) {
    this.commands.push(msg)
    if (!this.commandInterval) {
      this.commandInterval = setInterval(() => {
        if (this.commands.length > 0) {
          const msg = this.commands.shift()
          this.send(msg)
        } else {
          clearInterval(this.commandInterval)
          this.commandInterval = null
        }
      }, 500)
    }
  }
  connect() {
    if (!this._connected) {
      this.connectInterval = setInterval(() => {
        if (this._connected) {
          clearInterval(this.connectInterval)
          this.connectInterval = null
        } else {
          try {
            this.client.connect({ port: 1710, host: this._ipaddress })
          } catch (err) {
            this.emit('error', `socket connect error: ${this._ipaddress}`)
          }
        }
      }, 5000)
    } else {
      this.emit('error', `${this._ipaddress} is already connected`)
    }
  }
  disconnect() {
    if (this.connectInterval) {
      clearInterval(this.connectInterval)
      clearInterval(this._connectionTimer)
      this.connectInterval = null
      this._connectionTimer = null
    }
    if (this._connected) {
      this.client.end()
    }
  }
  setConnectionTimeout() {
    if (!this._connectionTimer) {
      this._connectionTimer = setInterval(() => {
        this._timeout = this._timeout - 1
        if (this._timeout < 5) {
          this.addCommands({ method: 'NoOp', params: {} })
          this._timeout = 60
        }
        if (this._timeout < 0) {
          clearInterval(this._connectionTimer)
          this._connectionTimer = null
        }
      })
    }
  }
}
