<script setup lang="ts">
import { useNewRegionStore, NewRegionControls } from "@/features/region"
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

const newRegionStore = useNewRegionStore()

const region = computed(() => newRegionStore.region)
const isDrawing = computed(() => newRegionStore.drawingPolygon !== null)

const mapCenter = ref<PointTuple>()

provide("mapCenter", mapCenter)

onMounted(() => {
   mapCenter.value = (newRegionStore.region.center as PointTuple) || DEFAULT_MAP_CENTER
})
</script>

<template>
   <map-main
      :class="{ 'cursor-pointer': isDrawing }"
      @click="newRegionStore.handleClick"
      v-model:region="region"
   >
      <NewRegionControls />

      <MapControls />
      <MapPolylines :drawing-polygon-id="newRegionStore.drawingPolygon?.id" />
      <MapPolygons :drawing-polygon-id="newRegionStore.drawingPolygon?.id" />
      <MapMarkers />
   </map-main>
</template>

<style scoped>
.cursor-pointer :deep(.leaflet-container) {
   cursor: pointer;
}
</style>
