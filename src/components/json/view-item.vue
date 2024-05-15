<template>
  <div class="json_item" :class="{'line':line}">
    <KeyCom :keyStr="k" :value="data[k]" v-for="k in keys"></KeyCom>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import KeyCom from './key.vue'

type Props = { data: any , line?: boolean}
const props = defineProps<Props>()

const keys = computed(() => {
  return Object.keys(props.data)
})
</script>
<style lang="scss" scoped="json_item">
.json_item {
  padding-left: 14px;
  position: relative;
  &.line{
    &::before{
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -0;
    bottom: 0;
    border-left: 1px dashed #797979;
  }
  }
}
</style>