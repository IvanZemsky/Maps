<script setup lang="ts">
import { useNewRegionStore } from "@/features/region"
import NewRegionControls from "@/features/region/ui/new-region-controls.vue"
import {
   MapMain,
   MapControls,
   MapPolylines,
   MapPolygons,
   MapMarkers,
} from "@/features/map"
import { computed, onMounted, provide, ref } from "vue"
import type { PointTuple } from "leaflet"
import { DEFAULT_MAP_CENTER } from "@/entities/region/model/const"

const newRegionStore = useNewRegionStore()

const isDrawing = computed(() => newRegionStore.drawingPolygon !== null)

const mapCenter = ref<PointTuple>()

provide("mapCenter", mapCenter)

onMounted(() => {
   mapCenter.value = newRegionStore.region.center as PointTuple || DEFAULT_MAP_CENTER
})
</script>

<template>
   <map-main
      :class="{ 'cursor-pointer': isDrawing }"
      @click="newRegionStore.handleClick"
      v-model:center="mapCenter"
   >
      <NewRegionControls />

      <MapControls />
      <MapPolylines />
      <MapPolygons />
      <MapMarkers />
   </map-main>
</template>

<style scoped>
.cursor-pointer :deep(.leaflet-container) {
   cursor: pointer;
}
</style>
