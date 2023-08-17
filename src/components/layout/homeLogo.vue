<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $r = useRouter()
const onlineColor = ref('red')
</script>

<template>
  <div class="row no-wrap">
    <div class="row no-wrap cursor-pointer" @click="$r.push('/')">
      <q-icon class="self-center" name="home" size="1.2rem" color="primary" />
      <span class="ubuntumono-font text-bold q-ml-sm" style="font-size: 19px">
        Bridge Q-SYS
      </span>
    </div>
    <div class="online">offline</div>
  </div>
</template>

<style scoped>
.online {
  color: v-bind(onlineColor);
  font-size: 10px;
  border: 1px solid v-bind(onlineColor);
  border-radius: 4px;
  height: 16px;
  padding: 0px 1px 0px 1px;
  margin-left: 5px;
}
</style>
