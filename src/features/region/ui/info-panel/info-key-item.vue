<script setup lang="ts">
import type { RegionKey } from "@/entities/region";

defineProps<{data: RegionKey}>()
</script>

<template>
  <ui-spacing align="center" gap="sm">
    <div class="key-color-circle" :style="{backgroundColor: data.color}"></div>
    <p>{{data.name || "No name"}}</p>
  </ui-spacing>
</template>

<style scoped>
.key-color-circle{
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}
</style>
