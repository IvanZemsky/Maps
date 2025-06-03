import type { Region, RegionPolygon } from "@/entities/region"
import type { LeafletMouseEvent } from "leaflet"
import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useNewRegionStore = defineStore("newRegion", () => {
   const region = ref<Region>({
      name: "",
      polygons: [
         {
            id: Date.now(),
            name: "",
            color: "#fffeee",
            weight: 0,
            latlngs: [],
         },
      ],
   })
   const isEditing = ref(false)
   const drawingId = ref<number | null>(null)
   const currentPolygon = ref<RegionPolygon>(region.value.polygons[0])

   function createPolygon() {
      region.value.polygons.push({
         id: Date.now(),
         name: "",
         color: "#123456",
         weight: 0,
         latlngs: [],
      })
   }

   function setRegionName(name: string) {
      region.value = {
         name,
         polygons: region.value?.polygons || [],
      }
   }

   function startDrawing(polygonId: number) {
      console.log("startDrawing")
      setCurrentPolygon(polygonId)
      drawingId.value = polygonId
   }

   function stopDrawing() {
      console.log("stopDrawing")
      drawingId.value = null
   }

   function findPolygonById(id: number) {
      return region.value.polygons.find((polygon) => polygon.id === id)
   }

   function handleDraw(event: LeafletMouseEvent) {
      if (drawingId.value) {
         let latlngs = currentPolygon.value.latlngs
         console.log("latlngs:", latlngs)
         console.log([event.latlng.lat, event.latlng.lng])
         latlngs = [...latlngs, [event.latlng.lat, event.latlng.lng, undefined]]
         currentPolygon.value = { ...currentPolygon.value, latlngs }
         region.value = {
            ...region.value,
            polygons: region.value.polygons.map((polygon) => {
               if (polygon.id === currentPolygon.value.id) {
                  return currentPolygon.value
               }
               return polygon
            }),
         }
      }
   }

   function setColor(id: number, color: string) {
      region.value = {
         ...region.value,
         polygons: region.value.polygons.map((polygon) => {
            if (polygon.id === id) {
               return { ...polygon, color }
            }
            return polygon
         }),
      }
   }

   function setCurrentPolygon(polygonId: number): RegionPolygon | undefined {
      const polygon = findPolygonById(polygonId)
      if (polygon) {
         console.log("polygon selected:", polygon)
         currentPolygon.value = polygon
      }
      return polygon
   }

   return {
      region,
      drawingId,
      isEditing,
      currentPolygon,
      setRegionName,
      createPolygon,
      startDrawing,
      stopDrawing,
      setCurrentPolygon,
      handleDraw,
      setColor,
      findPolygonById,
   }
})
