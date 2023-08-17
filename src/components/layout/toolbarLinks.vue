<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// components
// stores
// computed
const current = computed(() => router.currentRoute.value)
// variables
const $r = useRouter()
</script>

<template>
  <div class="row no-wrap items-center">
    <div class="btn cursor-pointer" @click="$r.push('/info')">Info</div>
    <div class="btn cursor-pointer" @click="$r.push('/setup')">Setup</div>
  </div>
</template>

<style scoped>
.btn {
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px 4px 10px;
  border-radius: 5px;
}
.btn:hover {
  background: #eee;
}
.btn-selected {
}
.btn-login:hover {
  background: #2e9f6c;
}
</style>
