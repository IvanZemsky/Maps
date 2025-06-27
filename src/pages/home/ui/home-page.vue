<script setup lang="ts">
import {
   useRegionStore,
   RegionControls,
   InfoPanel,
   useRightPanelStore,
} from "@/features/region"
import {
   MapMain,
   MapControls,
   MapPolylines,
   MapPolygons,
   MapMarkers,
} from "@/features/map"
import { computed, onMounted, ref, watch } from "vue"
import type { PointTuple } from "leaflet"
import { DEFAULT_MAP_CENTER } from "@/entities/region"
import { RegionKeys, RegionNotes } from "@/features/region"

const regionStore = useRegionStore()
const rightPanelStore = useRightPanelStore()

const isDrawing = computed(() => regionStore.keys.drawingPolygon !== null)
const focusedMarkerId = computed(() => regionStore.markers.focused?.id || null)
const mapCenter = ref<PointTuple>()

onMounted(() => {
   mapCenter.value = (regionStore.region.center as PointTuple) || DEFAULT_MAP_CENTER
})

// организовать
document.addEventListener("keydown", (event) => {
   if (event.ctrlKey && event.key === "z") {
      regionStore.keys.removeLastPolygonCoords()
   }
})

watch(focusedMarkerId, () => {
  if (regionStore.markers.focused) {
     rightPanelStore.open("notes")
  }
})
</script>

<template>
   <map-main
      :class="{ 'cursor-pointer': isDrawing }"
      @click="regionStore.handleMapClick"
      v-model:region="regionStore.region"
   >
      <RegionControls />

      <InfoPanel v-if="rightPanelStore.opened">
         <RegionKeys />
         <RegionNotes />
      </InfoPanel>

      <MapControls />
      <MapPolylines :drawing-polygon-id="regionStore.keys.drawingPolygon?.id" />
      <MapPolygons :drawing-polygon-id="regionStore.keys.drawingPolygon?.id" />
      <MapMarkers
         :focused-marker-id="focusedMarkerId"
         @focus="regionStore.markers.focus"
      />
   </map-main>
</template>

<style scoped>
.cursor-pointer :deep(.leaflet-container) {
   cursor: pointer;
}
</style>
