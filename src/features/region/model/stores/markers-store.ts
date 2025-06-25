import {
   getDefaltMarker,
   MARKER_ICONS,
   type Region,
   type RegionKeyMarker,
} from "@/entities/region"
import type { LeafletMouseEvent } from "leaflet"

import { defineStore } from "pinia"
import { ref, watch, type Ref } from "vue"

export function createMarkersStore(region: Ref<Region>) {
   return defineStore("markers", () => {
      const selectedMarker = ref<RegionKeyMarker | null>(null)
      const isPlacing = ref(false)

      watch(selectedMarker, updateSelectedMarkerColor, { deep: true })

      function updateSelectedMarkerColor() {
         if (selectedMarker.value) {
            const key = region.value.keys.find(
               (key) => key.id === selectedMarker.value!.keyId,
            )
            if (key) {
               selectedMarker.value.color = key.color
            }
         }
      }

      function addMarker() {
         region.value.markers.push(getDefaltMarker())
      }

      function handlePlaceSelectedMarker(event: LeafletMouseEvent) {
         if (selectedMarker.value) {
            selectedMarker.value.latlngs = [event.latlng.lat, event.latlng.lng]
            isPlacing.value = false
         }
      }

      function startPlacing() {
         isPlacing.value = true
      }

      function setIconToSelected(icon: keyof typeof MARKER_ICONS) {
         selectedMarker.value!.type = icon
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
         region.value.markers = region.value.markers.filter(
            (marker) => marker.id !== markerId,
         )
         selectedMarker.value = null
         isPlacing.value = false
      }

      function sortMarkersByDatetime(markers: RegionKeyMarker[]) {
         return [...markers].sort(
            (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
         )
      }

      function getMarkersByKeyId(keyId: number) {
         return region.value.markers.filter((marker) => marker.keyId === keyId)
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
         isPlacing,
         startPlacing,
         add: addMarker,
         handlePlaceSelectedMarker,
         remove: removeMarker,
         sortAllByDatetime: sortMarkersByDatetime,
         setIconToSelected: setIconToSelected,
         select: selectMarker,
         setDesc: setDescToSelected,
         findById: findMarkerById,
         getByKeyId: getMarkersByKeyId,
      }
   })
}
