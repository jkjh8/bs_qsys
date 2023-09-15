<script setup>
import { onMounted } from 'vue'
// components
import DeviceTable from 'src/components/devices/deviceTable'
// store
import { useDeviceStore } from 'src/stores/devices.js'

async function getDevices() {
  const r = await API.getDevices()
  useDeviceStore().updateDevices(r)
}

onMounted(() => {})
</script>
<template>
  <div>
    <div>
      <q-btn round flat icon="refresh" color="primary" @click="getDevices" />
    </div>
    <DeviceTable />
  </div>
</template>
