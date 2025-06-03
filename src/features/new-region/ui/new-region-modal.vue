<script setup lang="ts">
import MModal from "@/shared/ui/m-modal.vue"
import { useNewRegionStore } from "../model/store"

const newRegionStore = useNewRegionStore()

const { startDrawing, stopDrawing } = newRegionStore
</script>

<template>
   <m-modal id="new-region" teleport="#modal">
      <ui-card>
         <ui-spacing vertical>
            <h2>New Region</h2>
            <ui-button
               @click="startDrawing"
               :disabled="newRegionStore.isDrawing"
               variant="outlined"
            >
               Start Drawing
            </ui-button>
            <ui-button
               @click="stopDrawing"
               :disabled="!newRegionStore.isDrawing"
               variant="outlined"
            >
               Stop Drawing
            </ui-button>
         </ui-spacing>
      </ui-card>
   </m-modal>
</template>

<style scoped></style>
