<script setup lang="ts">
import { regionProvideKeys, type Region, type RegionKeyMarker } from "@/entities/region"

import { computed, provide, type Ref } from "vue"
import { storeToRefs } from "pinia"
import { useInject } from "@/shared/lib"
import NoteDate from "./note-date.vue"
import MarkerIconControls from "./marker-icon-controls.vue"
import NoteDesc from "./note-desc.vue"
import { useRegionStore } from "@/features/region/model/stores/store"

const region = useInject<Ref<Region>>(regionProvideKeys.region)

const { marker } = defineProps<{ marker: RegionKeyMarker }>()

const regionStore = useRegionStore()

const { selected: selectedMarker } = storeToRefs(regionStore.markers)

const isSelected = computed(() => regionStore.markers.selected?.id === marker.id)
const isFocused = computed(() => regionStore.markers.focused?.id === marker.id)

provide(regionProvideKeys.noteControls, {
   marker,
   isSelected,
   selectedMarker,
})

function handleBlockClick() {
   regionStore.markers.select(marker.id)
}
</script>

<template>
   <ui-card
      :class="['card', { selected: isSelected }]"
      hoverable
      @click="handleBlockClick"
      :key="marker.id"
      size="sm"
      :style="{
         borderColor: isFocused ? marker.color : 'var(--neutral-main)',
      }"
   >
      <ui-spacing vertical gap="sm" align="stretch">
         <NoteDate />
         <NoteDesc />
         <MarkerIconControls />

         <ui-button
            class="place-btn"
            v-if="isSelected"
            :disabled="regionStore.markers.isPlacing"
            @click="regionStore.markers.startPlacing"
            size="sm"
         >
            Place
         </ui-button>

         <ui-select
            v-if="isSelected"
            class="key-select"
            size="sm"
            placeholder="Key"
            v-model="selectedMarker!.keyId"
         >
            <ui-select-option
               v-for="regionKey in region.keys"
               :key="regionKey.id"
               :value="regionKey.id"
               :label="regionKey.name || 'Nameless'"
            />
            <ui-select-option :value="null" label="No key" />
         </ui-select>
      </ui-spacing>
   </ui-card>
</template>

<style scoped>
div.card.selected {
   border-color: var(--primary-main);
}

button.ui-button.place-btn:disabled {
   background-color: var(--neutral-main);
}

.datetime-input {
   flex-grow: 1;
}

.key-select :deep(button.ui-select__button.size-sm) {
   border-color: var(--primary-main);
}

.ui-textarea.size-md.note-textarea :deep(textarea) {
   font-size: 0.8rem;
}
</style>
