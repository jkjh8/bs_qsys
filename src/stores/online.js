import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOnlineStore = defineStore('online', () => {
  const online = ref(false)
  const id = ref('')

  return { online, id }
})
