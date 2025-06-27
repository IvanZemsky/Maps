<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
   <input class="color-input" type="color" v-model.lazy="model"/>
</template>

<style scoped>
.color-input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
   cursor: pointer;
   width: 100%;
   border: none;
   outline: none;
   overflow: hidden;
   box-shadow: none;
   padding: 0;
   border: 1px solid var(--neutral-main) ;
}
.color-input::-webkit-color-swatch-wrapper {
   padding: 0;
   border: none;
   outline: none;
   box-shadow: none;
}

.color-input::-webkit-color-swatch{
  border: 0;
  border-radius: 0;
}
</style>
