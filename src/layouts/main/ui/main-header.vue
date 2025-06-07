<script setup lang="ts">
import { useRegionStore } from "@/features/load-region"
import { useNewRegionStore } from "@/features/new-region"
import { formatDate } from "@/shared/lib"
import { FileSelector } from "@/shared/ui"
import { NavigationIcon } from "@/shared/ui/icons"

const currentDate = formatDate(Date.now())

const regionStore = useRegionStore()

const newRegionStore = useNewRegionStore()

function openControls() {
  regionStore.region = null
  newRegionStore.isDrawing = true
}
</script>

<template>
   <header class="header">
      <ui-wrapper>
         <ui-spacing class="header-left">
            <ui-spacing align="center" gap="sm">
               <p>{{ currentDate }}</p>

               <div class="selected-region" v-if="regionStore.region">
                  {{ regionStore.region?.name }}
               </div>

               <FileSelector
                  id="region-selector"
                  variant="ghost"
                  size="sm"
                  accept=".json"
                  @change="regionStore.loadRegionJSON"
               >
                  <template #start-icon><NavigationIcon /></template>
                  Select region
               </FileSelector>

               <ui-button size="sm" @click="openControls">
                  New region
               </ui-button>
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
</style>
