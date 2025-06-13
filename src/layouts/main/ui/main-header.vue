<script setup lang="ts">
import { useNewRegionStore } from "@/features/region"
import { formatDate } from "@/shared/lib"
import { NavigationIcon } from "@/shared/ui/icons"
import { ref } from "vue"

const currentDate = formatDate(Date.now())

const newRegionStore = useNewRegionStore()

const { loadRegionFromFile } = newRegionStore

function openControls() {
   newRegionStore.isDrawing = true
}

function handleLoadRegionFromFile(event: Event) {
   loadRegionFromFile(event).then(() => {
      openControls()
   })
}

const selectedTemplate = ref()
</script>

<template>
   <header class="header">
      <ui-wrapper>
         <ui-spacing class="header-left">
            <ui-spacing align="center" gap="sm">
               <p>{{ currentDate }}</p>

               <!-- <div class="selected-region" v-if="regionStore.region">
                  {{ regionStore.region?.name }}
               </div> -->

               <ui-file-picker
                  id="region-selector"
                  variant="ghost"
                  size="sm"
                  accept=".json"
                  @change="handleLoadRegionFromFile"
               >
                  <template #start-icon><NavigationIcon /></template>
                  Select region
               </ui-file-picker>

               <ui-select
                  class="preview-select"
                  size="sm"
                  v-model="selectedTemplate"
                  placeholder="Templates"
               >
                  <ui-select-option value="syria" label="Syria" />
                  <ui-select-option value="iran" label="Iran" />
                  <ui-select-option value="india" label="India" />
                  <ui-select-option value="israel" label="Israel" />
                  <ui-select-option value="usa" label="USA" />
               </ui-select>

               <ui-button size="sm" @click="openControls">New</ui-button>
            </ui-spacing>
         </ui-spacing>
      </ui-wrapper>
   </header>
</template>

<style scoped>
.header {
   width: 100%;
   background-color: var(--secondary-contrast);
}
.header-left,
.header-right {
   padding: 8px 0;
}
.header-left {
   padding-right: 10px;
   border-right: 1px solid var(--neutral-main);
}
.selected-region {
   gap: 0.4rem;
   font-weight: 500;
   border-radius: 0.5rem;
   padding: 0.4rem 0.6rem;
}
.preview-select {
   width: 120px;
}
.preview-select :deep(.ui-select__options) {
   top: calc(100% + 12px);
   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
