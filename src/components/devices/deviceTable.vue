<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import columns from './columns.js'
// stores
import { useDeviceStore } from 'src/stores/devices'
// initialize
const { devices } = storeToRefs(useDeviceStore())
// functions
function qsysConnect(args) {
  API.command({ command: 'connectQsys', value: JSON.stringify(args) })
}

function qsysGetPa(args) {
  API.command({ command: 'getPa', value: JSON.stringify(args) })
}

function qsysUpload(args) {
  API.command({ command: 'upload', value: JSON.stringify(args) })
}
onMounted(() => {
  // API.getStatus()
})
</script>

<template>
  <q-table :columns="columns" :rows="devices">
    <template #body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="deviceId" :props="props">
          {{ props.row.deviceId }}
        </q-td>
        <q-td key="ipaddress" :props="props">
          <a :href="`http://${props.row.ipaddress}`" target="_blank">{{
            props.row.ipaddress
          }}</a>
        </q-td>
        <q-td key="deviceType" :props="props">
          <div>{{ props.row.deviceType.deviceType }}</div>
          <div class="caption">{{ props.row.deviceType.model }}</div>
        </q-td>
        <q-td key="actions" :props="props">
          <div>
            <q-btn
              round
              flat
              icon="link"
              color="primary"
              @click="qsysConnect(props.row)"
            ></q-btn>
            <q-btn
              round
              flat
              icon="refresh"
              color="primary"
              @click="qsysGetPa(props.row)"
            ></q-btn>
            <q-btn
              round
              flat
              icon="upload"
              color="primary"
              @click="qsysUpload(props.row)"
            />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped></style>
