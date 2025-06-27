<script setup lang="ts">
defineProps<{
   icon: string
   color: string
}>()
</script>

<template>
   <div class="marker-preview" :style="{ backgroundColor: color }">
      <img :src="icon" alt="Icon" />
   </div>
</template>

<style scoped>
.marker-preview {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 40px;
   height: 40px;
   border-radius: 50%;
}
.marker-preview img {
   width: 30px;
   height: 30px;
}
</style>
