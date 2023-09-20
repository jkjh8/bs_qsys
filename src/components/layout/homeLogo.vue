<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const $r = useRouter()
const online = ref(false)

onBeforeMount(() => {
  API.online((value) => {
    online.value = value
  })
})

onMounted(async () => {
  if (!online.value) {
    const r = await API.command({ command: 'online' })
    if (r) {
      online.value = true
    }
  }
})
</script>

<template>
  <div class="row no-wrap">
    <div class="row no-wrap cursor-pointer" @click="$r.push('/')">
      <q-icon class="self-center" name="home" size="1.2rem" color="primary" />
      <span class="ubuntumono-font text-bold q-ml-sm" style="font-size: 19px">
        Bridge Q-SYS
      </span>
    </div>
    <div class="online">{{ online ? 'online' : 'offline' }}</div>
  </div>
</template>

<style scoped>
.online {
  color: v-bind(online ? 'green': 'red');
  font-size: 10px;
  border: 1px solid v-bind(online ? 'green': 'red');
  border-radius: 4px;
  height: 16px;
  padding: 0px 1px 0px 1px;
  margin-left: 5px;
}
</style>
