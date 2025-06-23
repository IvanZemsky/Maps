<script setup lang="ts">
import { useLeftPanelStore } from "@/features/region"
import type { LeftPanelType } from "@/features/region"

const leftPanelStore = useLeftPanelStore()

defineProps<{ type: LeftPanelType }>()
</script>

<template>
   <ui-button
      :class="['tab-btn', { active: leftPanelStore.opened === type }]"
      @click="() => leftPanelStore.open(type)"
      variant="ghost"
   >
      <slot />
   </ui-button>
</template>

<style scoped>
button:has(svg:only-child).size-md.tab-btn {
   padding: 0.4rem;
}
button:has(svg:only-child).size-md svg {
   width: 1.2rem;
   height: 1.2rem;
}
button:has(svg:only-child).size-md.active{
  border-color: var(--primary-main);
}
</style>
