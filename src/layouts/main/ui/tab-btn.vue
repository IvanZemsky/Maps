<script setup lang="ts">
import { useInfoPanelStore } from "@/features/region"
import type { InfoPanelType } from "@/features/region"

const rightPanelStore = useInfoPanelStore()

defineProps<{ type: InfoPanelType }>()
</script>

<template>
   <ui-button
      :class="['tab-btn', { active: rightPanelStore.opened === type }]"
      @click="() => rightPanelStore.open(type)"
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
button:has(svg:only-child).size-md.active {
   border-color: var(--primary-main);
}
</style>
