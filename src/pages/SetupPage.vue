<script setup>
import { ref, onMounted } from 'vue'

// variables
const serverAddress = ref('http://localhost')

// lifecycle hooks
onMounted(() => {})
</script>

<template>
  <div class="body-padding row justify-center">
    <div class="setup-card">
      <div class="row no-wrap justify-between items-center">
        <div class="text-bold sans-font">Server Address</div>
        <q-input
          v-model="serverAddress"
          style="width: 35%"
          outlined
          dense
          hide-bottom-space
        >
          <template #append>
            <q-icon name="check_circle" />
          </template>
        </q-input>
      </div>
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
