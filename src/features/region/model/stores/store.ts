import { getDefaultRegion, type Region } from "@/entities/region"

import type { PointTuple } from "leaflet"
import { defineStore } from "pinia"
import { ref } from "vue"
import { createRegionFileManagerStore } from "./region-file-manager-store"
import { createKeyStore } from "./key-store"
import { createMarkersStore } from "./markers-store"

export const useRegionStore = defineStore("region", () => {
   const region = ref<Region>(getDefaultRegion())

   const keyStore = createKeyStore(region)()

   const loadStore = createRegionFileManagerStore(region)()
   const markersStore = createMarkersStore(region)()

  function reset() {
    region.value = getDefaultRegion()
  }

   function saveToFile() {
      loadStore.saveRegionToFile(region.value)
   }

   function setName(name: string) {
      region.value.name = name
   }

   function setMapCenter(center: PointTuple) {
      region.value.center = center
   }

   return {
      region,
      setMapCenter,
      saveToFile,
      setName,
      reset,
      loadRegionFromFile: loadStore.loadRegionFromFile,
      keys: keyStore,
      markers: markersStore,
   }
})
