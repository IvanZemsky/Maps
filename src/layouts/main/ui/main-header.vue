<script setup lang="ts">
import { useRegionStore } from "@/features/region"
import { formatDatetime } from "@/shared/lib"
import CompassOutlined from "@vicons/antd/CompassOutlined"
import ProfileOutlined from "@vicons/antd/ProfileOutlined"
import TabBtn from "./tab-btn.vue"
import { SelectTemplateBtn, LoadRegionFromFileBtn } from "@/features/region"

const currentDate = formatDatetime(Date.now(), false)

const regionStore = useRegionStore()
</script>

<template>
   <header class="header">
      <ui-wrapper>
         <ui-spacing align="center" justify="space-between" fill>
            <ui-spacing class="header-left">
               <ui-spacing align="center" gap="sm">
                  <p>{{ currentDate }}</p>

                  <LoadRegionFromFileBtn />
                  <SelectTemplateBtn />

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
</style>
