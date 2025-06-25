<script setup lang="ts">
import {
   useLeftPanelStore,
   type LeftPanelType,
} from "../../model/stores/left-panel-store"
import { storeToRefs } from "pinia"
import { useRegionStore } from "../../model/stores/store"

const type: LeftPanelType = "keys"

const regionStore = useRegionStore()
const leftPanelStore = useLeftPanelStore()

const { region } = storeToRefs(regionStore)
</script>

<template>
   <div v-if="leftPanelStore.isOpened(type)">
      <p>keys</p>
   </div>
</template>
