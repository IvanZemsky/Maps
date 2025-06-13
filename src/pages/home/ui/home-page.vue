<script setup lang="ts">
import { computed } from "vue"
import { useNewRegionStore } from "@/features/region"
import NewRegionControls from "@/features/region/ui/new-region-controls.vue"
import {
   MapMain,
   MapControls,
   MapPolylines,
   MapPolygons,
   MapMarkers,
} from "@/features/map"

const newRegionStore = useNewRegionStore()

const isDrawing = computed(() => newRegionStore.drawingPolygon !== null)

const { handleDraw } = newRegionStore
</script>

<template>
   <map-main :is-drawing="isDrawing" :handle-draw="handleDraw">
      <NewRegionControls />
      
      <MapControls />
      <MapPolylines />
      <MapPolygons />
      <MapMarkers />
   </map-main>
</template>
