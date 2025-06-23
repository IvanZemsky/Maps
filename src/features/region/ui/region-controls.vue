<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRegionStore } from "../model/stores/store"
import KeyCard from "./key-card.vue"
import { type Ref } from "vue"
import type { PointTuple } from "leaflet"
import { useInject } from "@/shared/lib"

const mapCenter = useInject<Ref<PointTuple>>("mapCenter")

const regionStore = useRegionStore()

const { region } = storeToRefs(regionStore)

function setMapCenter() {
   if (mapCenter?.value) {
      regionStore.setMapCenter(mapCenter.value)
   }
}
</script>

<template>
   <ui-wrapper
      class="controls"
      @click.stop
      @mousedown.stop
      @mouseup.stop
      @mousemove.stop
      @wheel.stop
      paddings="both"
   >
      <div class="scroll-area">
         <ui-spacing class="content" vertical fill align="stretch" gap="sm">
            <ui-input
               placeholder="Region name"
               size="sm"
               class="region-name-input"
               v-model="region.name"
            />
            <ui-button size="sm" @click="regionStore.saveToFile">Save region</ui-button>

            <ui-button
               @click="setMapCenter"
               class="key-draw-control-btn"
               size="sm"
               variant="outlined"
            >
               Set map center
            </ui-button>

            <div class="draw-btn-wrap">
               <ui-button
                  :disabled="!regionStore.keys.drawingPolygon"
                  @click="regionStore.keys.stopDrawing"
                  class="key-draw-control-btn"
                  size="sm"
                  variant="outlined"
               >
                  Stop drawing
               </ui-button>
            </div>

            <key-card
               v-for="(key, index) in regionStore.region.keys"
               :id="key.id"
               :key="key.id"
               :number="index + 1"
            />

            <ui-button size="sm" @click="regionStore.keys.create">Add key</ui-button>
         </ui-spacing>
      </div>
   </ui-wrapper>
</template>

<style scoped>
.ui-wrapper.controls {
   position: absolute;
   left: 0;
   bottom: 0;
   width: 300px;
   background-color: var(--primary-contrast);
   height: 100%;
   padding: 0rem 0 1rem 1rem;
   z-index: 500;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   cursor: default;
}

.draw-btn-wrap {
   position: sticky;
   top: 0;
   left: 0;
   padding: 0 0 0.3rem 0;
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
