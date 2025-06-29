<script setup lang="ts">
import { useNoteControls } from "../../../model/composables/use-note-controls";

const { marker, selectedMarker, isSelected } = useNoteControls()
</script>

<template>
   <ui-textarea
      v-if="isSelected"
      class="note-textarea"
      placeholder="Description"
      v-model="selectedMarker!.description"
   />
   <p v-else class="note-text">{{ marker.description || "No description" }}</p>
</template>

<style scoped></style>
