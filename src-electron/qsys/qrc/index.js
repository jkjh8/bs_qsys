import net from 'net'
import EventEmitter from 'events'

export default class Qrc extends EventEmitter {
  constructor(ipaddress) {
    super()
    this.client = net.Socket()
    this.client.setEncoding('utf8')
    // this.client.setTimeout(5000)
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
    this.data = Buffer.alloc(0)
    this._noOpInterval = null
    // this._completed = false

    // connect
    this.client.on('connect', () => {
      this._connected = true
      this.send({
        method: 'Logon',
        params: {
          User: 'Guest',
          Password: ''
        }
      })
      // connect timout interval start
      this.setConnectionTimeout()
      this.emit('connect', `connected`)
    })

    // close and error
    this.client.on('close', () => {
      this._connected = false
      clearInterval(this._connectionTimer)
      this.emit('close', `socket closed`)
    })

    this.client.on('timeout', () => {
      this.client.end()
      this.emit('error', new Error(`Socket Timeout`))
    })

    this.client.on('error', (error) => {
      this.emit('error', error)
    })

    // on data
    this.client.on('data', (data) => {
      try {
        // let start = 0,
        //   end,
        //   idx = 0
        // for (let i = 0; i < data.length; i++) {
        //   if (data[i] === 0) {
        //     console.log(i)
        //   }
        // }
        console.log(data.split(0))
        // console.log(data)
        // console.log(data[data.length - 2])
        // if (data[data.length - 2] === '}') {
        //   this.emit('data', JSON.parse(data.slice(0, data.length - 1)))
        // }
        // this.data = this.data + ' ' + data.slice(0, data.length - 1)
        // if (data.includes(0)) {
        //   this.data = Buffer.concat([this.data, data.slice(0, data.indexOf(0))])
        //   console.log(data[data.length])
        //   this.emit('data', JSON.parse(this.data))
        //   this.data = Buffer.alloc(0)
        //   if (data.length > data.indexOf(0)) {
        //     this.data = Buffer.concat([
        //       this.data,
        //       data.slice(data.indexOf(0), data.length - 1)
        //     ])
        //   }
        // } else {
        //   this.data = Buffer.concat([this.data, data])
        // }
      } catch (err) {
        this.emit('error', `Q-SYS Data receive Error ${err}`)
      }
    })
  }

  send(msg) {
    if (this._connected) {
      try {
        this._timeout = 60
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
      return this.emit('error', `socket is not connected`)
    }
  }
  // command array
  addCommands(msg) {
    if (!this._connected)
      return this.emit('error', `socket is not connected ${msg}`)
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
      try {
        this.client.connect({
          port: 1710,
          host: this._ipaddress
        })
      } catch (err) {
        this.emit('error', `socket connect error ${err}`)
      }
    } else {
      this.emit('error', `already connected`)
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
      }, 1000)
    }
  }
}
