<script setup lang="ts">
import { useNewRegionStore } from "@/features/new-region"
import { LPolygon } from "@vue-leaflet/vue-leaflet"

const newRegionStore = useNewRegionStore()
</script>

<template>
   <div v-for="key in newRegionStore.region.keys" :key="key.id">
      <div v-for="polygon in key.polygons" :key="polygon.id">
         <l-polygon
            v-if="newRegionStore.drawingPolygonId !== polygon.id"
            :id="polygon.id"
            :lat-lngs="polygon.latlngs"
            :color="key.color"
            :weight="key.weight"
         />
      </div>
   </div>
</template>
