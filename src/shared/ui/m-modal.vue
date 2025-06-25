<script setup lang="ts">
import { useAttrs } from "vue"

const open = defineModel<boolean>({
   required: true,
   default: false,
})

const attrs = useAttrs()
</script>

<template>
   <ui-modal v-model="open" v-bind="attrs" class="modal" teleport="#modal">
      <slot />
   </ui-modal>
</template>
