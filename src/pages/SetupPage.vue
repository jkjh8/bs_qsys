<script setup>
import { ref, onMounted } from 'vue'
// components
import ServerAddress from 'src/components/setup/serverAddr'
import ServerUuid from 'src/components/setup/serverUuid'
// variables
const serverAddress = ref('http://localhost')

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div class="body-padding row justify-center">
    <div class="setup-card q-gutter-y-sm">
      <ServerAddress />
      <ServerUuid />
    </div>
  </div>
</template>

<style scoped>
.setup-card {
  max-width: 90%;
  min-width: 70%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 25px;
  background: #f3f3f3;
}
</style>
