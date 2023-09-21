<script setup>
import { ref, onMounted } from 'vue'
// components
import ServerAddress from 'src/components/setup/serverAddr'
import ServerUuid from 'src/components/setup/serverUuid'
import MediaFolder from 'src/components/setup/mediaFolder'
// variables
const serverAddress = ref('http://localhost')

// lifecycle hooks
onMounted(() => {
  API.getStatus()
})
</script>

<template>
  <div class="body-padding row justify-center">
    <div class="setup-card q-gutter-y-sm">
      <ServerAddress />
      <ServerUuid />
      <MediaFolder />
    </div>
  </div>
</template>

<style scoped>
.setup-card {
  width: 90%;
  min-width: 80%;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px 25px;
  background: #fafafa;
}
</style>
