<template>
  <div class="handle_view" v-if="key">
    <div class="label_value">
      <span>key : </span>
      <span>{{ key }}</span>
    </div>
    <div>value : </div>
    <div class="value_box" contenteditable>
      <pre><code data-language="JSON">{{ showValue }}</code></pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
  value: any
}>();

const key = computed(() => {
  if (!props.value) {
    return ''
  }
  return Object.keys(props.value)[0]
})

const showValue = computed(() => {
  if (!props.value) {
    return ''
  }
  return JSON.stringify(props.value[key.value]);
})

</script>
<style lang="scss" scoped="handle_view">
.handle_view {
  color: #232323;
  width: 300px;

  .value_box {
    width: 300px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #797979;
    word-wrap: break-word;
    word-break: break-all;
    border-radius: 4px;

    code {
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
}
</style>