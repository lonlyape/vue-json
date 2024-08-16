<template>
  <div class="lonlyape-json" ref="lonlyapeJsonRef">
    <div class="content_box">
      <div class="scroll_box">
        <a class="button_item total_btn" @click.prevent="setBaseAliveValue">
          全局
        </a>
        <div>{</div>
        <item :data="modelValue" :level="1" />
        <div>}</div>
      </div>
    </div>
    <handle :value="aliveValue" ref="handleRef" :width="hw"></handle>
  </div>
</template>
<script setup lang="ts">
import { nextTick, onBeforeMount, onMounted, provide, Ref, ref, watch, withDefaults } from 'vue';
import item from './view-item.vue'
import handle from './handle.vue'
type Props = {
  imgKeys?: string[],
  expandLevel?: number,
  handleSpan?: number
}
const handleRef = ref()
const mainKey = 'LONLYAPE-JSON'
const modelValue = defineModel()

const props = withDefaults(defineProps<Props>(), {
  handleSpan: 12
})

const totalSpan = 24
const lonlyapeJsonRef = ref()
const hw: Ref<string> = ref('')
onMounted(() => {
  nextTick(() => {
    let tw = lonlyapeJsonRef?.value.clientWidth
    let rhw = props.handleSpan / totalSpan * (tw - 40)
    hw.value = rhw + 'px'
  })
})

provide('imgKeys', props.imgKeys)
provide('topProps', props)
provide('mainKey', mainKey)

const aliveValue: Ref<any> = ref()

function setAliveValue(value: any) {
  aliveValue.value = value
  handleRef.value && (handleRef.value.hiddenB = false)
}

function setBaseAliveValue() {
  let data = {} as any
  data[mainKey] = modelValue.value
  setAliveValue(data)
  setTimeout(() => {
    handleRef.value.hiddenB = false
  })
}

onBeforeMount(() => {
  setBaseAliveValue()
})
watch(modelValue, () => {
  setBaseAliveValue()
})

provide('setAliveValue', setAliveValue)
</script>
<style lang="scss" bundle scoped='false'>
.lonlyape-json {
  width: 100%;
  min-height: 300px;
  height: 100%;
  display: flex;
  font-size: 14px;
  color: #232323;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgba($color: #ffffff, $alpha: .85);

  .content_box {
    flex: 1;
    overflow: hidden;

    .scroll_box {
      height: 100%;
      overflow-y: scroll;
      margin-right: -24px;
      padding-right: 20px;

      .total_btn {
        float: right;
      }
    }
  }

  .button_item {
    cursor: pointer;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 4px;
    color: #232323;
    display: inline-block;
    border: 1px solid #979797;

    &:hover {
      $color: #7095fa;
      border-color: $color;
      background-color: $color;
      color: #fff;
    }
  }
}
</style>