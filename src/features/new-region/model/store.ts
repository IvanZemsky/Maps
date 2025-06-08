import type { Region, RegionPolygon } from "@/entities/region"
import type { LeafletMouseEvent } from "leaflet"
import { defineStore } from "pinia"
import { ref } from "vue"

const defaultRegion: Region = {
   name: "",
   keys: [
      {
         id: Date.now(),
         name: "",
         color: "#000000",
         weight: 0,
         polygons: [
            {
               id: Date.now() + 1,
               latlngs: [],
            },
         ],
      },
   ],
}

export const useNewRegionStore = defineStore("newRegion", () => {
   const region = ref<Region>(defaultRegion)
   const isDrawing = ref(false)
   const drawingPolygonId = ref<number | null>(null) // TODO: drawingPolygon???
   const drawingKey = ref<RegionPolygon>(region.value.keys[0])

   function createKey() {
      const newKey: RegionPolygon = {
         id: Date.now(),
         name: "",
         color: "#123456",
         weight: 0,
         polygons: [
            {
               id: Date.now() + 1,
               latlngs: [],
            },
         ],
      }

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
      drawingPolygonId.value = polygonId
   }

   function stopDrawing() {
      drawingPolygonId.value = null
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

   function handleDraw(event: LeafletMouseEvent) {
      if (drawingPolygonId.value) {
         let latlngs = findPolygonByDrawingId(drawingPolygonId.value)?.latlngs || [] // TODO: drawingPolygon???

         latlngs = [...latlngs, [event.latlng.lat, event.latlng.lng, undefined]]

         drawingKey.value = {
            ...drawingKey.value,
            polygons: updatePolygons(drawingPolygonId.value, latlngs),
         }

         region.value = {
            ...region.value,
            keys: updateRegionKeys(),
         }
      }
   }

   function updatePolygons(
      drawingPolygonId: number,
      latlngs: [number, number, number | undefined][],
   ) {
      return drawingKey.value.polygons.map((polygon) => {
         if (polygon.id === drawingPolygonId) {
            return { ...polygon, latlngs }
         }
         return polygon
      })
   }

   function updateRegionKeys() {
      return region.value.keys.map((key) => {
         if (key.id === drawingKey.value.id) {
            return drawingKey.value
         }
         return key
      })
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

   function setDrawingKey(polygonId: number): RegionPolygon | undefined {
      const key = findKeyById(polygonId)
      drawingKey.value = key
      return key
   }

   function createPolygon(id: number) {
      const key = findKeyById(id)
      key.polygons.push({
         id: Date.now() + 1,
         latlngs: [],
      })
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

   return {
      region,
      drawingPolygonId,
      isDrawing,
      drawingKey,
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
