<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

const folder = ref('')

async function openFileDialog() {
  const r = await API.command({ command: 'getFolder' })
  if (r) {
    folder.value = r
  }
}

function openFolder() {
  API.command({ command: 'openFolder', value: folder.value })
}

onMounted(async () => {
  const r = await API.getData({ key: 'folder' })
  if (r) {
    folder.value = r.value
  } else {
    folder.value = await API.command({ command: 'getDefaultFolder' })
  }
})
</script>

<template>
  <div class="row no-wrap justify-between items-center">
    <div class="text-bold sans-font">Media Folder</div>
    <div class="row items-center q-gutter-x-sm">
      <q-icon
        class="cursor-pointer"
        name="folder"
        color="yellow"
        @click="openFolder"
      />
      <div>{{ folder }}</div>
      <q-btn
        round
        flat
        size="sm"
        icon="edit"
        color="primary"
        @click="openFileDialog"
      ></q-btn>
    </div>
  </div>
</template>

<style scoped></style>
