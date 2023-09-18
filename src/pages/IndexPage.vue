<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
// components
import DeviceTable from 'src/components/devices/deviceTable'
// initialize
const $r = useRouter()

async function getDevices() {
  $r.go()
}

onMounted(() => {
  API.getStatus()
})
</script>
<template>
  <div>
    <div class="row no-wrap justify-between">
      <div class="text-bold sans-font" style="font-size: 1.2rem">
        Q-SYS List
      </div>
      <q-btn round flat icon="refresh" color="primary" @click="getDevices" />
    </div>
    <DeviceTable />
  </div>
</template>
