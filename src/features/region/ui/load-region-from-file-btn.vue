<script setup lang="ts">
import { useRegionStore } from "../model/stores/store";
import {NavigationIcon} from "@/shared/ui/icons";

const regionStore = useRegionStore()
</script>

<template>
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
</template>
