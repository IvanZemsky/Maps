<script setup lang="ts">
import { useNewRegionStore } from "@/features/edit-region"
import { LMarker } from "@vue-leaflet/vue-leaflet"
import { getMarkerIcon } from "@/entities/region"

const newRegionStore = useNewRegionStore()

</script>

<template>
   <div v-for="key in newRegionStore.region.keys" :key="key.id">
      <div v-for="marker in key.markers" :key="marker.id">
         <l-marker
            :id="marker.id"
            :lat-lng="marker.latlngs"
            :icon="getMarkerIcon(marker.type) as any"
         />
      </div>
   </div>
</template>
