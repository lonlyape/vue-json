<template>
  <div class="key_com" :class="{ 'flex_box': isEndVal }">
    <span class="icon_span" v-show="helf" @click.prevent="toggleOpend" :class="{ 'down': isOpend }">
      <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4017">
        <path
          d="M219.428571 933.741714V90.258286A40.96 40.96 0 0 1 287.378286 59.465143l482.011428 421.741714a40.96 40.96 0 0 1 0 61.586286l-482.011428 421.741714A40.96 40.96 0 0 1 219.428571 933.741714z"
          fill="#2E4666" p-id="4018"></path>
      </svg>
    </span>
    <span class="key_span" @click.prevent="keyClick">{{ keyStr }}</span>
    <span class="key_span">:</span>
    <Value :value="value" :isOpend="isOpend" :isImgKey="isImg"  :level="level" />
  </div>
</template>
<script setup lang="ts">
import Value from './value.vue'
import { _typeof } from './utils.ts'
import { computed, inject, Ref, ref, watch } from 'vue';

type Props = { keyStr: string, value: any, level: number }
const props = defineProps<Props>()
const imgKeys: string[] | undefined = inject('imgKeys')
const topProps:any = inject('topProps')
const setAliveValue: ((value: any) => void) | undefined = inject('setAliveValue')

const helf = computed(() => {
  let tbTypes = ['Object', 'Array']
  let t = _typeof(props.value)
  return tbTypes.includes(t)
})


const expandLevel:Ref<number> = computed(() => topProps.expandLevel)
const isOpend = ref(expandLevel.value ? (props.level <= expandLevel.value) : false)

watch( expandLevel, () => {
  isOpend.value = expandLevel ? (props.level <= expandLevel.value) : false
})

function toggleOpend() {
  isOpend.value = !isOpend.value
}
const isEndVal = computed(() => {
  const isTextTypes = ['String', 'Number', 'Boolean', 'Null', 'Undefined']
  return isTextTypes.includes(_typeof(props.value))
})
const isImg = computed(() => {
  return imgKeys ? imgKeys.includes(props.keyStr) : false
})

function keyClick() {
  let data: any = {}
  data[props.keyStr] = props.value
  setAliveValue && setAliveValue(data)
}

</script>
<style lang="scss" scoped="key_com" bundle>
$ms: 4px;

.key_com {
  padding-left: 10px;

  &.flex_box {
    display: flex;
  }

  .icon_span {
    cursor: pointer;
    font-size: 12px;
    margin-left: -16px;
    margin-right: $ms;

    &.down {
      .icon {
        transform: rotateZ(90deg);
      }
    }
  }

  .key_span {
    cursor: pointer;
    color: #8f8403;
    margin-right: $ms;

  }
}
</style>