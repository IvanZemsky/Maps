<script setup lang="ts">
import { defaultRegionTemplates } from "../model/const"
import { useLoadTemplate } from "../hooks/use-load-template"

const {selectedTemplate, isError, handleSelect} = useLoadTemplate()
</script>

<template>
   <ui-select
      :class="['preview-select', {'selected': selectedTemplate}]"
      size="sm"
      v-model="selectedTemplate"
      placeholder="Templates"
   >
      <ui-select-option
         v-for="template in defaultRegionTemplates"
         :key="template.id"
         :value="template.value"
         :label="template.label"
         @click="handleSelect(template.value)"
      />
   </ui-select>

   <ui-toast v-model="isError" :timeout="3000">
      Error occured while loading template
   </ui-toast>
</template>

<style scoped>
.preview-select {
   width: 120px;
}
.selected :deep(button.ui-select__button) {
  border: 1px solid var(--primary-main);
}
.preview-select :deep(.ui-select__options) {
   top: calc(100% + 12px);
   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
