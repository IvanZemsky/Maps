<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRegionStore } from "../../model/stores/store"
import {
   useLeftPanelStore,
   type LeftPanelType,
} from "../../model/stores/left-panel-store"

const type: LeftPanelType = "notes"

const regionStore = useRegionStore()

const leftPanelStore = useLeftPanelStore()

const { region } = storeToRefs(regionStore)
</script>

<template>
   <div v-if="leftPanelStore.isOpened(type)">
      <div v-for="marker in region.markers" :key="marker.id">
         <p>{{ marker.description }}</p>
      </div>
   </div>
</template>

<style scoped></style>
