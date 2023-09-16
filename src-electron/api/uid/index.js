import { v4 as uuidv4 } from 'uuid'
import db from '/src-electron/db'

async function getUid() {
  const r = await db.findOne({ key: 'uid' })
  if (r && r.value) {
    return r.value
  } else {
    const uid = uuidv4()
    await updateUid(uid)
    return uid
  }
}

async function updateUid(uid) {
  await db.update({ key: 'uid' }, { $set: { value: uid } }, { upsert: true })
}

export { getUid, updateUid }
