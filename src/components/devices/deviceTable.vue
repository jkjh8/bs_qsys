<script setup>
import { storeToRefs } from 'pinia'
import { useDeviceStore } from 'src/stores/devices.js'

const { devices } = storeToRefs(useDeviceStore())
</script>

<template>
  <q-table
    :columns="[
      {
        name: 'name',
        label: 'Name',
        align: 'center',
        field: 'name',
        sortable: true
      },
      {
        name: 'deviceId',
        label: 'Device ID',
        align: 'center',
        field: 'deviceId',
        sortable: true
      },
      {
        name: 'ipaddress',
        label: 'IP Address',
        align: 'center',
        field: 'ipaddress',
        sortable: true
      },
      {
        name: 'deviceType',
        label: 'Type',
        align: 'center',
        field: 'deviceType',
        sortable: true
      }
    ]"
    :rows="devices"
  >
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
      </q-tr>
    </template>
  </q-table>
</template>

<style scoped></style>
