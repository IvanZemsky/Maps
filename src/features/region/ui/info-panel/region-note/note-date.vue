<script setup lang="ts">

import { useRegionStore } from "../../../model/stores/store"
import { useNoteControls } from "../../../model/composables/use-note-controls"
import { formatDatetime } from "@/shared/lib"
import DeleteFilled from "@vicons/antd/DeleteFilled"
import { computed } from "vue"


const { selectedMarker, isSelected, marker } = useNoteControls()

const regionStore = useRegionStore()

const datetime = computed(() =>
   marker.datetime ? formatDatetime(marker.datetime) : "No datetime",
)

</script>

<template>
   <ui-spacing align="center" gap="sm">
      <ui-input
         size="sm"
         class="datetime-input"
         v-if="isSelected"
         v-model="selectedMarker!.datetime"
         type="datetime-local"
         placeholder="Datetime"
      />
      <p v-else>
         {{ datetime }}
      </p>
      <ui-button
         v-if="isSelected"
         size="sm"
         variant="outlined"
         color="critical"
         @click.stop="regionStore.markers.remove(marker.id)"
      >
         <delete-filled />
      </ui-button>
   </ui-spacing>
</template>

<style scoped>
:deep(.ui-input).datetime-input input {
   width: 100%;
   min-width: 0;
   flex-shrink: 1;
}
</style>
