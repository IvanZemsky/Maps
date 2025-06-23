<script setup lang="ts">
import { useRegionStore } from "@/features/region"
import { formatDate } from "@/shared/lib"
import { NavigationIcon } from "@/shared/ui/icons"
import CompassOutlined from "@vicons/antd/CompassOutlined"
import ProfileOutlined from "@vicons/antd/ProfileOutlined"
import { ref } from "vue"
import TabBtn from "./tab-btn.vue"

const currentDate = formatDate(Date.now())

const regionStore = useRegionStore()

const selectedTemplate = ref()
</script>

<template>
   <header class="header">
      <ui-wrapper>
         <ui-spacing align="center" justify="space-between" fill>
            <ui-spacing class="header-left">
               <ui-spacing align="center" gap="sm">
                  <p>{{ currentDate }}</p>

                  <!-- to features -->
                  <ui-file-picker
                     id="region-selector"
                     variant="ghost"
                     size="sm"
                     accept=".json"
                     @change="regionStore.fileManager.loadRegionFromFile"
                  >
                     <template #start-icon><NavigationIcon /></template>
                     Select region
                  </ui-file-picker>

                  <!-- to const -->
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

                  <ui-button size="sm" @click="regionStore.reset">New</ui-button>
               </ui-spacing>
            </ui-spacing>

            <ui-spacing class="header-right">
               <ui-spacing align="center" gap="sm">
                  <TabBtn type="notes"><profile-outlined /></TabBtn>
                  <TabBtn type="keys"><compass-outlined /></TabBtn>
               </ui-spacing>
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
