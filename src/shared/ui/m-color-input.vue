<script setup lang="ts">
const model = defineModel<string>()
</script>

<template>
   <input class="color-input" type="color" v-model.lazy="model"/>
</template>

<style scoped>
.color-input {
   cursor: pointer;
   width: 100%;
   border: none;
   outline: none;
   overflow: hidden;
   box-shadow: none;
   padding: 0;
   border: 1px solid black;
}
.color-input::-webkit-color-swatch-wrapper {
   padding: 0;
   border: none;
   outline: none;
   box-shadow: none;
}
</style>
