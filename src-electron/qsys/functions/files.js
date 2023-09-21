import https from 'https'
import axios from 'axios'
import db from '/src-electron/db'
import path from 'path'
import fs from 'fs'
import FormData from 'form-data'

const agent = new https.Agent({
  rejectUnauthorized: false
})

async function getToken(args) {
  const r = await axios.post(
    `https://${args.ipaddress}/api/v0/logon`,
    {
      username: args.username,
      password: args.password
    },
    { httpsAgent: agent }
  )
  return r.data
}

async function getFiles(args) {
  const { ipaddress, folder } = args
  const url = `https://${ipaddress}/api/v0/cores/self/media/Audio${
    folder ? '/' + folder : ''
  }`
  const r = await axios.get(url, { httpsAgent: agent })
  return r.data
}

async function uploadFile(args) {
  try {
    // variables
    const { filepath, filename, ipaddress, folder } = args
    // media path from db
    const mediapath = await db.findOne({ key: 'folder' })
    const fileFullPath = path.join(mediapath.value, filepath, filename)
    // file exists
    if (!fs.existsSync(fileFullPath))
      return new Error(`File ${fileFullPath} not exists`)
    // make file stream
    const file = fs.createReadStream(fileFullPath)
    // make form data
    const formdata = new FormData()
    formdata.append('media', file)
    // make url
    const url = `https://${ipaddress}/api/v0/cores/self/media/Audio${
      folder ? '/' + folder : ''
    }`
    // request
    const r = await axios.post(url, formdata, {
      headers: { ...formdata.getHeaders() },
      httpsAgent: agent
    })
    return r.data
  } catch (err) {
    return err
  }
}

async function deleteFile(args) {
  try {
    // variables
    const { ipaddress, folder, filename } = args
    const url = `https://${ipaddress}/api/v0/cores/self/media/Audio${
      folder ? '/' + folder : ''
    }/${encodeURI(filename)}`
    console.log
    const r = await axios.delete(url, { httpsAgent: agent })
    return 'OK'
  } catch (err) {
    return err
  }
}

export { getToken, getFiles, uploadFile, deleteFile }
