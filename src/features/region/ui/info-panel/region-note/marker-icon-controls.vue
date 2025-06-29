<script setup lang="ts">
import { ref } from "vue"

import { MARKER_ICONS } from "@/entities/region"
import MarkerIconSelectModal from "./marker-icon-select-modal.vue"
import MarkerPreview from "./marker-preview.vue"
import { MColorInput } from "@/shared/ui"
import { useNoteControls } from "../../../model/composables/use-note-controls"

const { selectedMarker, isSelected } = useNoteControls()

const isOpen = ref(false)

function handleOpenModalClick() {
   isOpen.value = true
}
</script>

<template>
   <ui-spacing v-if="isSelected" align="center" gap="sm">
      <ui-button class="open-marker-modal-btn" @click="handleOpenModalClick">
         Select icon
      </ui-button>
      <MarkerPreview
         :color="selectedMarker!.color"
         :icon="MARKER_ICONS[selectedMarker!.type].icon"
      />
      <MColorInput
         v-if="isSelected"
         :disabled="selectedMarker!.keyId"
         class="color-select"
         v-model="selectedMarker!.color"
      />
   </ui-spacing>
   <MarkerIconSelectModal v-model="isOpen" />
</template>

<style scoped>
.color-select {
   width: 40px;
   height: 40px;
   border-radius: 0.5rem;
   flex-shrink: 0;
}
.open-marker-modal-btn {
   flex-grow: 1;
}
</style>
