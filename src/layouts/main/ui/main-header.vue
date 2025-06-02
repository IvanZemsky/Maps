<script setup lang="ts">
import { formatDate } from "@/shared/lib"
import { FileSelector } from "@/shared/ui"
import { NavigationIcon } from "@/shared/ui/icons"

const currentDate = formatDate(Date.now())
</script>

<template>
   <header class="header">
      <ui-wrapper>
         <ui-spacing class="header__left">
            <ui-spacing align="center">
               <p>{{ currentDate }}</p>
               <FileSelector id="region-selector" variant="ghost" size="sm">
                  <template #start-icon><NavigationIcon /></template>
                  Select region
               </FileSelector>
            </ui-spacing>
         </ui-spacing>
      </ui-wrapper>
   </header>
</template>

<style scoped>
.header__left,
.header__right {
   padding: 8px 0;
}
.header__left {
   padding-right: 10px;
   border-right: 1px solid var(--neutral-main);
}
</style>
