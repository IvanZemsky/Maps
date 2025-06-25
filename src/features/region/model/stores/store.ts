import { getDefaultRegion, type Region } from "@/entities/region"

import type { LeafletMouseEvent, PointTuple } from "leaflet"
import { defineStore, storeToRefs } from "pinia"
import { ref } from "vue"
import { createRegionFileManagerStore } from "./region-file-manager-store"
import { createKeyStore } from "./key-store"
import { createMarkersStore } from "./markers-store"

export const useRegionStore = defineStore("region", () => {
   const region = ref<Region>(getDefaultRegion())

   const keyStore = createKeyStore(region)()
   const { drawingPolygon } = storeToRefs(keyStore)

   const fileManagerStore = createRegionFileManagerStore(region)()

   const markersStore = createMarkersStore(region)()
   const { isPlacing: isPlacingMarker } = storeToRefs(markersStore)

   function handleMapClick(event: LeafletMouseEvent) {
      if (markersStore.isPlacing) {
         markersStore.handlePlaceSelectedMarker(event)
         drawingPolygon.value = null
      } else if (keyStore.drawingPolygon) {
         keyStore.handleDraw(event)
         isPlacingMarker.value = false
      }
   }

   function reset() {
      region.value = getDefaultRegion()
   }

   function setName(name: string) {
      region.value.name = name
   }

   function setCenter(center: PointTuple) {
      region.value.center = center
   }

   return {
      region,
      setCenter,
      setName,
      reset,
      handleMapClick,
      fileManager: fileManagerStore,
      keys: keyStore,
      markers: markersStore,
   }
})
