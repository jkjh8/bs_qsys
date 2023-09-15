import { useOnlineStore } from 'src/stores/online'
import { storeToRefs } from 'pinia'

export default function useOnline() {
  const { online, id } = storeToRefs(useOnlineStore())

  function APIOnline() {
    API.online((args) => {
      console.log('ipc_online', args)
      online.value = args.value
      id.value = args.id
    })
  }

  function chkOnlineInterval() {
    setInterval(async () => {
      await chkOnline()
    }, 1000)
  }

  async function chkOnline() {
    try {
      const r = await API.checkOnlinePromise()
      online.value = r.value
      id.value = r.id
    } catch (error) {
      console.log('online', error)
    }
  }
  return { APIOnline, chkOnline, chkOnlineInterval }
}
