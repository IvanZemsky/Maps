<script setup lang="ts">
import {
   useRegionStore,
   RegionControls,
   RightPanel,
   useLeftPanelStore,
} from "@/features/region"
import {
   MapMain,
   MapControls,
   MapPolylines,
   MapPolygons,
   MapMarkers,
} from "@/features/map"
import { computed, onMounted, ref } from "vue"
import type { PointTuple } from "leaflet"
import { DEFAULT_MAP_CENTER } from "@/entities/region"
import { RegionKeys, RegionNotes } from "@/features/region"

const regionStore = useRegionStore()
const leftPanelStore = useLeftPanelStore()

const region = computed(() => regionStore.region)
const isDrawing = computed(() => regionStore.keys.drawingPolygon !== null)
const openedLeftPanelType = computed(() => leftPanelStore.opened)
const mapCenter = ref<PointTuple>()

// организовать
document.addEventListener("keydown", (event) => {
   if (event.ctrlKey && event.key === "z") {
      console.log("ctrlz")
      regionStore.keys.removeLastPolygonCoords()
   }
})

onMounted(() => {
   mapCenter.value = (regionStore.region.center as PointTuple) || DEFAULT_MAP_CENTER
})
</script>

<template>
   <map-main
      :class="{ 'cursor-pointer': isDrawing }"
      @click="regionStore.handleMapClick"
      v-model:region="region"
   >
      <RegionControls />

      <RightPanel v-if="openedLeftPanelType">
         <RegionKeys />
         <RegionNotes />
      </RightPanel>

      <MapControls />
      <MapPolylines :drawing-polygon-id="regionStore.keys.drawingPolygon?.id" />
      <MapPolygons :drawing-polygon-id="regionStore.keys.drawingPolygon?.id" />
      <MapMarkers />
   </map-main>
</template>

<style scoped>
.cursor-pointer :deep(.leaflet-container) {
   cursor: pointer;
}
</style>
