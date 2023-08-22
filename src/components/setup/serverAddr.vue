<script setup>
import { ref, onMounted } from 'vue'
// composables
import useNotify from 'src/composables/useNotify'
import useRules from 'src/composables/usrRules'

const { notifyInfo, notifyError } = useNotify()
const { required } = useRules()

const current = ref('http://localhost')
const serverAddress = ref('http://localhost')

const updateServerAddress = async () => {
  try {
    if (current.value !== serverAddress.value) {
      const r = await API.onPromise({
        command: 'updateServerAddress',
        value: current.value
      })
      if (r) {
        serverAddress.value = current.value
        notifyInfo('updated server address')
      }
    }
  } catch (err) {
    console.error(err)
    notifyError('update server address failed')
  }
}

onMounted(async () => {
  const addr = await API.onPromise({ command: 'getServerAddress' })
  if (addr) {
    current.value = addr.value
    serverAddress.value = addr.value
  }
})
</script>

<template>
  <div class="row no-wrap justify-between">
    <div class="text-bold sans-font q-mt-sm">Server Address</div>
    <q-input
      v-model="current"
      style="width: 35%; min-width: 200px"
      outlined
      dense
      :rules="[required]"
      lazy-rules
    >
      <template #append>
        <q-icon
          :class="current === serverAddress ? 'disabled' : 'cursor-pointer'"
          name="check_circle"
          color="primary"
          @click="updateServerAddress"
        />
      </template>
    </q-input>
  </div>
</template>

<style scoped></style>
