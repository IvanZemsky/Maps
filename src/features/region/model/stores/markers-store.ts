import { getDefaltMarker, type Region, type RegionKeyMarker } from "@/entities/region"

import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export function createMarkersStore(region: Ref<Region>) {
   return defineStore("markers", () => {
      const selectedMarker = ref<RegionKeyMarker | null>(null)

      function addMarker() {
         region.value.markers.push(getDefaltMarker())
      }

      function selectMarker(markerId: number) {
         selectedMarker.value = findMarkerById(markerId)
      }

      function setDescToSelected(desc: string) {
         if (selectedMarker.value) {
            selectedMarker.value.description = desc
         }
      }

      function removeMarker(markerId: number) {
         region.value.markers.filter((marker) => marker.id !== markerId)
      }

      function sortMarkersByDatetime(markers: RegionKeyMarker[]) {
         return markers.sort(
            (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
         )
      }

      function findMarkerById(markerId: number) {
         const marker = region.value.markers.find((marker) => marker.id === markerId)
         if (!marker) {
            throw new Error("Marker not found")
         }
         return marker
      }

      return {
         selected: selectedMarker,
         add: addMarker,
         remove: removeMarker,
         sortAllByDatetime: sortMarkersByDatetime,
         select: selectMarker,
         setDesc: setDescToSelected,
         findById: findMarkerById,
      }
   })
}
