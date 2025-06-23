<script setup lang="ts">
import type { Region, RegionKeyMarker } from "@/entities/region"
import { useRegionStore } from "../../model/stores/store"
import { computed, type Ref } from "vue"
import { formatDate, useInject } from "@/shared/lib"

const { marker } = defineProps<{ marker: RegionKeyMarker }>()

const regionStore = useRegionStore()

const selected = computed(() => regionStore.markers.selected?.id === marker.id)
const region = useInject<Ref<Region>>("region")

function handleBlockClick() {
   regionStore.markers.select(marker.id)
}
</script>

<template>
   <ui-card
      :class="['card', { selected }]"
      hoverable
      @click="handleBlockClick"
      :key="marker.id"
      size="sm"
   >
      <ui-spacing vertical gap="sm" align="stretch">
         <ui-spacing align="center" gap="sm">
            <ui-input
               v-if="selected"
               v-model="regionStore.markers.selected!.datetime"
               type="date"
               placeholder="Datetime"
            />
            <p v-else>
               {{ marker.datetime ? formatDate(marker.datetime) : "No datetime" }}
            </p>
         </ui-spacing>
         <ui-textarea
            v-if="selected"
            class="note-textarea"
            placeholder="Description"
            v-model="regionStore.markers.selected!.description"
         />
         <p v-else class="note-text">{{ marker.description || "No description" }}</p>

         <ui-select
            v-if="selected"
            class="key-select"
            size="sm"
            placeholder="Key"
            v-model="regionStore.markers.selected!.keyId"
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
.key-select :deep(button.ui-select__button.size-sm) {
   border-color: var(--primary-main);
}
.ui-textarea.size-md.note-textarea :deep(textarea) {
   font-size: 0.8rem;
}
</style>
