import { getDefaultRegion, type Region } from "@/entities/region"

import type { PointTuple } from "leaflet"
import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue"
import { createRegionFileManagerStore } from "./region-file-manager-store"
import { createKeyDrawingStore } from "./key-drawing-store"

export const useRegionStore = defineStore("region", () => {
   const region = ref<Region>(getDefaultRegion())

   const drawingStore = createKeyDrawingStore(region)()
   const loadStore = createRegionFileManagerStore(region)()
   
   const {drawingKey, drawingPolygon, isDrawing} = storeToRefs(drawingStore)

   function saveRegionToFile() {
      loadStore.saveRegionToFile(region.value)
   }

   function setRegionName(name: string) {
      region.value.name = name
   }

   function setMapCenter(center: PointTuple) {
      region.value.center = center
   }

   return {
      region,
      setMapCenter,
      saveRegionToFile,
      setRegionName,
      loadRegionFromFile: loadStore.loadRegionFromFile,
      isDrawing,
      drawingKey,
      drawingPolygon,
      setPolygonWeight: drawingStore.setPolygonWeight,
      setKeyName: drawingStore.setKeyName,
      createKey: drawingStore.createKey,
      startDrawing: drawingStore.startDrawing,
      stopDrawing: drawingStore.stopDrawing,
      handleDraw: drawingStore.handleDraw,
      removePolygon: drawingStore.removePolygon,
      createPolygon: drawingStore.createPolygon,
      removeKey: drawingStore.removeKey,
      findKeyById: drawingStore.findKeyById,
      findKeyPolygonById: drawingStore.findKeyPolygonById,
      findPolygonByDrawingId: drawingStore.findPolygonByDrawingId,
   }
})
