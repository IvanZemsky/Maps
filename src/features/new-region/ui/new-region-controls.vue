<script setup lang="ts">
import { useNewRegionStore } from "../model/store"
import KeyCard from "./key-card.vue"

const newRegionStore = useNewRegionStore()
</script>

<template>
   <ui-wrapper class="controls" v-if="newRegionStore.isEditing" paddings="both">
      <ui-spacing class="content" vertical fill align="stretch" gap="sm">
         <ui-input placeholder="Region name" size="sm" />
         <ui-button
            :disabled="!newRegionStore.drawingId"
            @click="newRegionStore.stopDrawing"
            class="key-draw-control-btn"
            size="sm"
            variant="outlined"
         >
            Stop drawing
         </ui-button>
         <key-card
            v-for="polygon in newRegionStore.region.polygons"
            :id="polygon.id"
            :key="polygon.name"
            :name="polygon.name"
         />

         <ui-button size="sm" @click="newRegionStore.createPolygon">Add key</ui-button>
      </ui-spacing>
   </ui-wrapper>
</template>

<style scoped>
.controls {
   width: 380px;
   background-color: var(--bg);
   height: 100%;
   overflow: hidden;
}
.content {
   overflow-y: scroll;
}
button.key-draw-control-btn:disabled {
   background-color: var(--neutral-main);
}
</style>
