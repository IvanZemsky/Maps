<script setup lang="ts">
import { useNewRegionStore } from "../model/store"
import KeyCard from "./key-card.vue"

const newRegionStore = useNewRegionStore()

function handleRegionNameChange(event: Event) {
   newRegionStore.setRegionName((event.target as HTMLInputElement).value)
}
</script>

<template>
   <ui-wrapper class="controls" v-if="newRegionStore.isDrawing" paddings="both">
      <div class="scroll-area">
         <ui-spacing class="content" vertical fill align="stretch" gap="sm">
            <ui-input
               placeholder="Region name"
               size="sm"
               class="region-name-input"
               @input="handleRegionNameChange"
            />
            <ui-button
               :disabled="!newRegionStore.drawingPolygonId"
               @click="newRegionStore.stopDrawing"
               class="key-draw-control-btn"
               size="sm"
               variant="outlined"
            >
               Stop drawing
            </ui-button>

            <key-card
               v-for="polygon in newRegionStore.region.keys"
               :id="polygon.id"
               :key="polygon.id"
            />

            <ui-button size="sm" @click="newRegionStore.createKey">Add key</ui-button>
         </ui-spacing>
      </div>
   </ui-wrapper>
</template>

<style scoped>
.ui-wrapper.controls {
   position: absolute;
   left: 0;
   bottom: 0;
   width: 340px;
   background-color: var(--primary-contrast);
   height: 100%;
   padding: 0rem 0 1rem 1rem;
   z-index: 500;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
}

.scroll-area {
   overflow-y: auto;
   padding-right: 1rem;
   flex: 1 1 auto;
}

.content {
   display: flex;
   padding: 3px;
}
</style>
