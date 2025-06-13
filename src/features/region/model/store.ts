import {
   getDefaultRegion,
   getDefaultRegionKey,
   getDefaultRegionKeyPolygon,
   type Region,
   type RegionKey,
   type RegionKeyPolygon,
} from "@/entities/region"
import { useRegionFileManagerStore } from "./region-file-manager-store"

import type { LeafletMouseEvent } from "leaflet"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useNewRegionStore = defineStore("region", () => {
   const loadStore = useRegionFileManagerStore()

   const region = ref<Region>(getDefaultRegion())
   const isDrawing = ref(false)
   const drawingPolygon = ref<RegionKeyPolygon | null>(null)
   const drawingKey = ref<RegionKey>(region.value.keys[0])

   async function loadRegionFromFile(event: Event) {
      loadStore.loadRegionFromFile(event).then((loadedRegion) => {
         if (loadedRegion) {
            region.value = loadedRegion
            drawingKey.value = region.value.keys[0]
            isDrawing.value = true
         }
      })
   }

   function saveRegionToFile() {
      loadStore.saveRegionToFile(region.value)
   }

   function createKey() {
      const newKey = getDefaultRegionKey()
      newKey.polygons.push(getDefaultRegionKeyPolygon())
      region.value.keys.push(newKey)
   }

   function setRegionName(name: string) {
      region.value.name = name
   }

   function setKeyName(keyId: number, name: string) {
      const key = findKeyById(keyId)
      key.name = name
   }

   function startDrawing(keyId: number, polygonId: number) {
      drawingKey.value = findKeyById(keyId)
      const polygon = findPolygonByDrawingId(polygonId)
      if (polygon) {
         drawingPolygon.value = polygon
      }
   }

   function stopDrawing() {
      drawingPolygon.value = null
   }

   function handleDraw(event: LeafletMouseEvent) {
      if (drawingPolygon.value) {
         let latlngs = drawingPolygon.value.latlngs

         latlngs = [...latlngs, [event.latlng.lat, event.latlng.lng] as [number, number]]
         drawingPolygon.value.latlngs = latlngs
      }
   }

   function setColor(id: number, color: string) {
      region.value = {
         ...region.value,
         keys: region.value.keys.map((key) => {
            if (key.id === id) {
               return { ...key, color }
            }
            return key
         }),
      }
   }

   function setDrawingKey(polygonId: number): RegionKey | undefined {
      const key = findKeyById(polygonId)
      drawingKey.value = key
      return key
   }

   function createPolygon(id: number) {
      const key = findKeyById(id)
      key.polygons.push(getDefaultRegionKeyPolygon())
   }

   function removePolygon(id: number) {
      region.value = {
         ...region.value,
         keys: region.value.keys.map((key) => ({
            ...key,
            polygons: key.polygons.filter((polygon) => polygon.id !== id),
         })),
      }
      stopDrawing()
   }

   function removeKey(id: number) {
      region.value = {
         ...region.value,
         keys: region.value.keys.filter((key) => key.id !== id),
      }
      stopDrawing()
   }

   function findKeyById(id: number) {
      const key = region.value.keys.find((key) => key.id === id)
      if (!key) {
         throw new Error("Key not found")
      }
      return key
   }

   function findPolygonByDrawingId(id: number) {
      return drawingKey.value.polygons.find((polygon) => polygon.id === id)
   }

   return {
      region,
      isDrawing,
      drawingKey,
      loadRegionFromFile,
      saveRegionToFile,
      drawingPolygon,
      setRegionName,
      setKeyName,
      createKey,
      startDrawing,
      stopDrawing,
      setDrawingKey,
      handleDraw,
      setColor,
      findKeyById,
      createPolygon,
      removePolygon,
      removeKey,
   }
})
