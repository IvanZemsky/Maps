import { type Region, type RegionKeyMarker } from "@/entities/region"

import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export function createMarkersStore(region: Ref<Region>) {
   return defineStore("markers", () => {
      const selectedMarker = ref<RegionKeyMarker | null>(null)

      function addMarker(marker: RegionKeyMarker) {
         region.value.markers.push(marker)
      }

      function removeMarker(markerId: number) {
         region.value.markers.filter((marker) => marker.id !== markerId)
      }

      function sortMarkersByDatetime(markers: RegionKeyMarker[]) {
         return markers.sort(
            (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
         )
      }

      return {
         selectedMarker,
         add: addMarker,
         remove: removeMarker,
         sortAllByDatetime: sortMarkersByDatetime,
      }
   })
}
