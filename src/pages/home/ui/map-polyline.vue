<script setup lang="ts">
import { useNewRegionStore } from "@/features/new-region"
import { LPolyline } from "@vue-leaflet/vue-leaflet"

const newRegionStore = useNewRegionStore()
</script>

<template>
   <div v-for="key in newRegionStore.region.keys" :key="key.id">
      <div v-for="polyline in key.polygons" :key="polyline.id">
         <l-polyline
            v-if="newRegionStore.drawingPolygonId === polyline.id"
            :id="polyline.id"
            :lat-lngs="polyline.latlngs"
            :color="key.color"
            :weight="1"
         />
      </div>
   </div>
</template>
