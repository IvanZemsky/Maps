<script setup lang="ts">
import { ref, watch } from "vue"
import { useRegionStore } from "../model/stores/store"
import { NavigationIcon } from "@/shared/ui/icons"

const regionStore = useRegionStore()

const isToastOpen = ref(false)

watch(() => regionStore.fileManager.errorMessage, (errorMessage) => {
  if (errorMessage) {
    isToastOpen.value = true
  }
})
</script>

<template>
   <ui-file-picker
      id="region-selector"
      variant="ghost"
      size="sm"
      accept=".json"
      @change="regionStore.fileManager.loadRegionFromFile"
   >
      <template #start-icon><NavigationIcon /></template>
      Select region
   </ui-file-picker>

   <ui-toast color="critical" v-model="isToastOpen" :timeout="3000">
      Error occured while loading region
   </ui-toast>
</template>
