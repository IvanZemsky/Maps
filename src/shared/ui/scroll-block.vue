<script setup lang="ts">
const { position } = defineProps<{ position: "left" | "right" }>()
</script>

<template>
   <ui-wrapper
      class="controls"
      @click.stop
      @mousedown.stop
      @mouseup.stop
      @mousemove.stop
      @wheel.stop
      paddings="both"
      :style="`${position}: 0;`"
   >
      <div class="scroll-area">
         <ui-spacing class="content" vertical fill align="stretch" gap="sm">
            <slot />
         </ui-spacing>
      </div>
   </ui-wrapper>
</template>

<style scoped>
.ui-wrapper.controls {
   position: absolute;
   bottom: 0;
   width: 300px;
   background-color: var(--primary-contrast);
   height: 100%;
   padding: 0rem 0 1rem 1rem;
   z-index: 500;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
   cursor: default;
}

.scroll-area {
   overflow-y: scroll;
   padding-right: 0.5rem;
   flex: 1 1 auto;
}

.content {
   display: flex;
   padding: 3px;
}
</style>
