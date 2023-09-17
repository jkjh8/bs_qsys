<script setup>
import { onBeforeMount, onMounted } from 'vue'
// components
import HomeLogo from 'src/components/layout/homeLogo'
import ToolbarLinks from 'src/components/layout/toolbarLinks'
// composables
import useStatus from 'src/composables/useStatus.js'
// initalization
const { statusRtChannel } = useStatus()
// lifecycle hooks
onBeforeMount(() => {
  statusRtChannel()
})
onMounted(() => {
  API.getStatus()
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
