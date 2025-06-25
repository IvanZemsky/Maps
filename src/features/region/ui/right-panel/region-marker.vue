<script setup lang="ts">
import { MARKER_ICONS, type Region, type RegionKeyMarker } from "@/entities/region"
import { useRegionStore } from "../../model/stores/store"
import { computed, ref, watch, type Ref } from "vue"
import { formatDate, useInject } from "@/shared/lib"
import { MColorInput } from "@/shared/ui"
import MarkerIconSelectModal from "./marker-icon-select-modal.vue"
import MarkerPreview from "./marker-preview.vue"

const { marker } = defineProps<{ marker: RegionKeyMarker }>()

const regionStore = useRegionStore()

const selected = computed(() => regionStore.markers.selected)
const isSelected = computed(() => regionStore.markers.selected?.id === marker.id)
const region = useInject<Ref<Region>>("region")

const isOpen = ref(false)

function handleBlockClick() {
   regionStore.markers.select(marker.id)
}

function handleOpenModalClick() {
   isOpen.value = true
}

watch(
   selected,
   () => {
      if (selected.value?.keyId) {
         selected.value.color = regionStore.keys.findById(selected.value.keyId).color
      }
   },
   { deep: true },
)
// в отдельные компоненты
</script>

<template>
   <ui-card
      :class="['card', { selected: isSelected }]"
      hoverable
      @click="handleBlockClick"
      :key="marker.id"
      size="sm"
   >
      <ui-spacing vertical gap="sm" align="stretch">
         <ui-spacing align="center" gap="sm">
            <ui-input
               class="datetime-input"
               v-if="isSelected"
               v-model="regionStore.markers.selected!.datetime"
               type="date"
               placeholder="Datetime"
            />
            <p v-else>
               {{ marker.datetime ? formatDate(marker.datetime) : "No datetime" }}
            </p>

            <MColorInput
               v-if="isSelected"
               :disabled="selected!.keyId"
               class="color-select"
               v-model="selected!.color"
            />
         </ui-spacing>
         <ui-textarea
            v-if="isSelected"
            class="note-textarea"
            placeholder="Description"
            v-model="selected!.description"
         />
         <p v-else class="note-text">{{ marker.description || "No description" }}</p>

         <ui-spacing v-if="isSelected" align="center" gap="sm">
            <ui-button class="open-marker-modal-btn" @click="handleOpenModalClick">
               Select icon
            </ui-button>
            <MarkerPreview
               :color="selected!.color"
               :icon="MARKER_ICONS[selected!.type].icon"
            />
         </ui-spacing>

         <MarkerIconSelectModal v-model="isOpen" />

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
            v-model="selected!.keyId"
         >
            <ui-select-option
               v-for="regionKey in region.keys"
               :key="regionKey.id"
               :value="regionKey.id"
               :label="regionKey.name"
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

.color-select {
   width: 40px;
   height: 40px;
   border-radius: 50%;
}

button.ui-button.place-btn:disabled {
   background-color: var(--neutral-main);
}

.open-marker-modal-btn,
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
