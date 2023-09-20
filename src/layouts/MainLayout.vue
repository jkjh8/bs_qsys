<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { useQuasar } from 'quasar'
// components
import HomeLogo from 'src/components/layout/homeLogo'
import ToolbarLinks from 'src/components/layout/toolbarLinks'
// composables
import useStatus from 'src/composables/useStatus.js'
// initalization
const $q = useQuasar()
const { statusRtChannel } = useStatus()

// lifecycle hooks
onBeforeMount(() => {
  statusRtChannel()
})
onMounted(() => {
  // API.getStatus()
  const r = API.commandPromise({ command: 'initVal' })
  console.log(r)
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <div class="row no-wrap full-height justify-between items-center">
        <HomeLogo />
        <ToolbarLinks />
      </div>
    </q-header>
    <q-page-container>
      <router-view class="view_page" />
    </q-page-container>
  </q-layout>
</template>

<style scope>
.view_page {
  padding: 5% 5%;
}
</style>
