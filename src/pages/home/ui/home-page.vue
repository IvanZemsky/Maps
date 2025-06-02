<script setup lang="ts">
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { ref } from "vue"

const center = ref([51.505, -0.09]) // in region's data
const zoom = ref(6) // in CONSTANT
</script>

<template>
   <ui-spacing fill grow class="page">
      <l-map
         ref="map"
         v-model:zoom="zoom"
         v-model:center="center"
         :useGlobalLeaflet="false"
         :options="{ attributionControl: false }"
      >
         <l-tile-layer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="Stadia Maps Basemap"
         ></l-tile-layer>
      </l-map>
   </ui-spacing>
</template>

<style scoped>
.page {
   flex-shrink: 0;
}
</style>
