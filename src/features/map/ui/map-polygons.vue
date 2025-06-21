<script setup lang="ts">
import type { Region } from "@/entities/region"
import { LPolygon } from "@vue-leaflet/vue-leaflet"
import { inject, type Ref } from "vue"

const props = defineProps<{
   drawingPolygonId?: number
}>()

const region = inject<Ref<Region>>("region")

function isVisible(polygonId: number) {
   return props.drawingPolygonId !== polygonId
}

if (!region?.value) {
   throw new Error("Map region is not provided")
}
</script>

<template>
   <div v-for="key in region.keys" :key="key.id">
      <div v-for="polygon in key.polygons" :key="polygon.id">
         <l-polygon
            v-if="isVisible(polygon.id)"
            :id="polygon.id"
            :lat-lngs="polygon.latlngs"
            :color="key.color"
            :weight="polygon.weight"
         />
      </div>
   </div>
</template>
