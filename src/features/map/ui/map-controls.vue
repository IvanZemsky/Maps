<script setup lang="ts">
import {
   LControlScale,
   LControlZoom,
   LControlAttribution,
} from "@vue-leaflet/vue-leaflet"
</script>

<template>
   <l-control-scale position="bottomright" :imperial="true" :metric="false" />
   <l-control-zoom position="bottomleft" />
   <l-control-attribution prefix="" position="topright" />
</template>
