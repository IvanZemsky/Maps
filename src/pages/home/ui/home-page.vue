<script setup lang="ts">
import { useRegionStore, NewRegionControls } from "@/features/region"
import {
   MapMain,
   MapControls,
   MapPolylines,
   MapPolygons,
   MapMarkers,
} from "@/features/map"
import { computed, onMounted, provide, ref } from "vue"
import type { PointTuple } from "leaflet"
import { DEFAULT_MAP_CENTER } from "@/entities/region"

const regionStore = useRegionStore()

const region = computed(() => regionStore.region)
const isDrawing = computed(() => regionStore.drawingPolygon !== null)

const mapCenter = ref<PointTuple>()

provide("mapCenter", mapCenter)

onMounted(() => {
   mapCenter.value = (regionStore.region.center as PointTuple) || DEFAULT_MAP_CENTER
})
</script>

<template>
   <map-main
      :class="{ 'cursor-pointer': isDrawing }"
      @click="regionStore.handleDraw"
      v-model:region="region"
   >
      <NewRegionControls />

      <MapControls />
      <MapPolylines :drawing-polygon-id="regionStore.drawingPolygon?.id" />
      <MapPolygons :drawing-polygon-id="regionStore.drawingPolygon?.id" />
      <MapMarkers />
   </map-main>
</template>

<style scoped>
.cursor-pointer :deep(.leaflet-container) {
   cursor: pointer;
}
</style>
