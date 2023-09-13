import { useOnlineStore } from 'src/stores/online'
import { storeToRefs } from 'pinia'

export default function useOnline() {
  const { online, id } = storeToRefs(useOnlineStore())

  API.online((args) => {
    console.log('ipc_online', args)
    online.value = args.value
    id.value = args.id
  })
  async function chkOnline() {
    const r = await API.checkOnlinePromise()
    online.value = r.value
    id.value = r.id
  }
  return { chkOnline }
}
