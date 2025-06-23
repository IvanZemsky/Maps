import {
   getDefaultRegionKey,
   getDefaultRegionKeyPolygon,
   type Region,
   type RegionKey,
   type RegionKeyPolygon,
} from "@/entities/region"
import type { LeafletMouseEvent } from "leaflet"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export function createKeyStore(region: Ref<Region>) {
   return defineStore("key", () => {
      const drawingPolygon = ref<RegionKeyPolygon | null>(null)
      const drawingKey = ref<RegionKey>(region.value.keys[0])

      function handleDraw(event: LeafletMouseEvent) {
         if (drawingPolygon.value) {
            let latlngs = drawingPolygon.value.latlngs

            latlngs = [
               ...latlngs,
               [event.latlng.lat, event.latlng.lng] as [number, number],
            ]
            drawingPolygon.value.latlngs = latlngs
         }
      }

      function createKey() {
         const newKey = getDefaultRegionKey()
         newKey.polygons.push(getDefaultRegionKeyPolygon())
         region.value.keys.push(newKey)
      }

      function setPolygonWeight(keyId: number, polygonId: number, weight: number) {
         const key = findKeyById(keyId)
         key.polygons = key.polygons.map((polygon) => {
            if (polygon.id === polygonId) {
               return {
                  ...polygon,
                  weight,
               }
            }
            return polygon
         })
      }

      function startDrawing(keyId: number, polygonId: number) {
         drawingKey.value = findKeyById(keyId)
         const polygon = findKeyPolygonById(keyId, polygonId)
         if (polygon) {
            drawingPolygon.value = polygon
         }
      }

      function stopDrawing() {
         drawingPolygon.value = null
      }

      function setNameById(keyId: number, name: string) {
         const key = findKeyById(keyId)
         key.name = name
      }

      function setColor(id: number, color: string) {
         region.value.keys = region.value.keys.map((key) => {
            if (key.id === id) {
               return { ...key, color }
            }
            return key
         })
      }

      function setDrawingKey(polygonId: number): RegionKey | undefined {
         const key = findKeyById(polygonId)
         drawingKey.value = key
         return key
      }

      function createPolygon(keyId: number) {
         const key = findKeyById(keyId)
         key.polygons.push(getDefaultRegionKeyPolygon())
      }

      function removePolygon(id: number) {
         region.value.keys = region.value.keys.map((key) => ({
            ...key,
            polygons: key.polygons.filter((polygon) => polygon.id !== id),
         }))
         stopDrawing()
      }

      function removeKey(id: number) {
         region.value.keys = region.value.keys.filter((key) => key.id !== id)
         stopDrawing()
      }

      function findKeyById(id: number) {
         const key = region.value.keys.find((key) => key.id === id)
         if (!key) {
            throw new Error("Key not found")
         }
         return key
      }

      function findKeyPolygonById(keyId: number, polygonId: number) {
         const key = region.value.keys.find((key) => key.id === keyId)
         if (!key) {
            throw new Error("Key not found")
         }
         const polygon = key.polygons.find((polygon) => polygon.id === polygonId)
         if (!polygon) {
            throw new Error("Polygon not found")
         }
         return polygon
      }

      return {
         drawingPolygon,
         drawingKey,
         handleDraw,
         create: createKey,
         remove: removeKey,
         createPolygon,
         removePolygon,
         setPolygonWeight,
         startDrawing,
         stopDrawing,
         setNameById,
         setColor,
         setDrawingKey,
         findById: findKeyById,
         findPolygon: findKeyPolygonById,
      }
   })
}
