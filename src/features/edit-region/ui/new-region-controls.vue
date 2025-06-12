<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useNewRegionStore } from "../model/store"
import KeyCard from "./key-card.vue"

const newRegionStore = useNewRegionStore()

const { region } = storeToRefs(newRegionStore)

</script>

<template>
   <ui-wrapper class="controls" v-if="newRegionStore.isDrawing" paddings="both">
      <div class="scroll-area">
         <ui-spacing class="content" vertical fill align="stretch" gap="sm">
            <ui-input
               placeholder="Region name"
               size="sm"
               class="region-name-input"
               v-model="region.name"
            />
            <ui-button size="sm" @click="newRegionStore.saveRegionToFile">
               Save region
            </ui-button>
            <div class="draw-btn-wrap">
               <ui-button
                  :disabled="!newRegionStore.drawingPolygon"
                  @click="newRegionStore.stopDrawing"
                  class="key-draw-control-btn"
                  size="sm"
                  variant="outlined"
               >
                  Stop drawing
               </ui-button>
            </div>

            <key-card
               v-for="(key, index) in newRegionStore.region.keys"
               :id="key.id"
               :key="key.id"
               :number="index + 1"
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

.draw-btn-wrap {
   position: sticky;
   top: 0;
   left: 0;
   padding: 0 0 0.3rem  0;
   background-color: var(--primary-contrast);
   border-radius: 0 0 0.3rem 0.3rem;
   z-index: 501;
}

.draw-btn-wrap .ui-button {
   width: 100%;
}

.scroll-area {
   overflow-y: scroll;
   padding-right: 0.5rem;
   flex: 1 1 auto;
}

.content {
   display: flex;
   padding: 3px;
}
</style>
