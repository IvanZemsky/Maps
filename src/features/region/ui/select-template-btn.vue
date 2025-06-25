<script setup lang="ts">
import { ref } from "vue"
import { defaultRegionTemplates } from "../model/const"

const selectedTemplate = ref()
</script>

<template>
   <ui-select
      class="preview-select"
      size="sm"
      v-model="selectedTemplate"
      placeholder="Templates"
   >
      <ui-select-option
         v-for="template in defaultRegionTemplates"
         :key="template.id"
         :value="template.value"
         :label="template.label"
      />
   </ui-select>
</template>

<style scoped>
.preview-select {
   width: 120px;
}
.preview-select :deep(.ui-select__options) {
   top: calc(100% + 12px);
   box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
