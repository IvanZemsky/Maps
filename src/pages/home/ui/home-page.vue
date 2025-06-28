<script setup lang="ts">
import {
   useRegionStore,
   RegionControls,
   InfoPanel,
   useInfoPanelStore,
   useWatchFocusedMarker,
} from "@/features/region"
import {
   MapMain,
   MapControls,
   MapPolylines,
   MapPolygons,
   MapMarkers,
   useInitMapCenter,
} from "@/features/map"
import { computed } from "vue"
import type { PointTuple } from "leaflet"
import { RegionKeys, RegionNotes } from "@/features/region"
import { storeToRefs } from "pinia"

const regionStore = useRegionStore()
const rightPanelStore = useInfoPanelStore()

const isDrawing = computed(() => regionStore.keys.drawingPolygon !== null)
const focusedMarker = storeToRefs(regionStore.markers).focused
const focusedMarkerId = useWatchFocusedMarker(focusedMarker)

useInitMapCenter(regionStore.region.center as PointTuple)
</script>

<template>
   <map-main
      :class="{
         'cursor-pointer': isDrawing,
         'cross-pointer': regionStore.markers.isPlacing,
      }"
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
.cross-pointer :deep(.leaflet-container), .cross-pointer :deep(.leaflet-interactive) {
   cursor: crosshair;
}
</style>
