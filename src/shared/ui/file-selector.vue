<script setup lang="ts">
import { useAttrs } from "vue"

defineOptions({
  inheritAttrs: false
})

const {
   size,
   variant,
   as,
   color,
   rounded,
   weight,
   class: className,
   style,
   ...inputAttrs
} = useAttrs()

const buttonProps = {
   size,
   variant,
   color,
   rounded,
   weight,
   style,
}

const id = inputAttrs.id as string
</script>

<template>
   <ui-button as="label" :class="className" v-bind="buttonProps" :for="id">
    <slot name="start-icon"/>
    <slot/>
    <slot name="end-icon"/>
   </ui-button>
   <input class="input" v-bind="inputAttrs" :id="id" type="file" />
</template>

<style scoped>
.input {
   display: none;
}
</style>
