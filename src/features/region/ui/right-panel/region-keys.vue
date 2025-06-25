<script setup lang="ts">
import {
   useRightPanelStore,
   type rightPanelType,
} from "../../model/stores/right-panel-store"
import { storeToRefs } from "pinia"
import { useRegionStore } from "../../model/stores/store"

const type: rightPanelType = "keys"

const regionStore = useRegionStore()
const rightPanelStore = useRightPanelStore()

const { region } = storeToRefs(regionStore)
</script>

<template>
   <div v-if="rightPanelStore.isOpened(type)">
      <p>keys</p>
   </div>
</template>
