<template>
  <div class="lonlyape-json">
    <div class="content_box">
      <div class="scroll_box">
        <item :data="modelValue"/>
      </div>
    </div>
    <handle :value="aliveValue"></handle>
  </div>
</template>
<script setup lang="ts">
import { provide, Ref, ref } from 'vue';
import item from './view-item.vue'
import handle from './handle.vue'
type Props = {
  imgKeys?: string[]
}
const modelValue = defineModel()

const props = defineProps<Props>()

provide('imgKeys', props.imgKeys)

const aliveValue:Ref<any> = ref()

function setAliveValue(value:any) {
  aliveValue.value = value
}

provide('setAliveValue', setAliveValue)
</script>
<style lang="scss" scoped="lonlyape-json">
.lonlyape-json{
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  padding-right: 20px;
  font-size: 14px;
  background-color: rgba($color: #ffffff, $alpha: .85);
  overflow-y: auto;
  display: flex;
  box-sizing: border-box;
  .content_box{
    overflow: hidden;
    flex: 1;
    .scroll_box{
      overflow-y: scroll;
      min-height: 100%;
      padding-right: 4px;
      margin-right: -17px;
    }
  }
}
</style>