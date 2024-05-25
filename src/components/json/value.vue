<template>
  <template v-if="isText">
    <div class="value_span" @mouseover="mouseover" @mouseleave="mouseleave">
      <span :class="isImg ? textType + ' pointer' : textType">
        {{ showText }}
      </span>
      <div v-if="isImg && showImg" class="popper_box">
        <div id="json_arrow" data-popper-arrow></div>
        <img :src="value" />
      </div>
    </div>
  </template>
  <template v-else>
    <span class="bl_c">{</span>
    <item :imgKeys="imgKeys" :data="value" :level="level + 1" line v-if="isOpend" />
    <span class="bl_c " v-else>...</span>
    <span class="bl_c">}</span>
  </template>
</template>
<script setup lang="ts">
import item from './view-item.vue'
import { _typeof } from './utils.ts'
import { computed, ref } from 'vue'
type Props = {
  level: number,
  value: any,
  isOpend: boolean,
  isImgKey?: boolean,
  imgKeys?: string[],
}

const props = defineProps<Props>()
const showImg = ref(false)
const isText = computed(() => {
  const isTextTypes = ['String', 'Number', 'Boolean', 'Null']
  return isTextTypes.includes(_typeof(props.value))
})
const textType = computed(() => {
  return _typeof(props.value).toLowerCase()
})
const showText = computed(() => {
  return String(props.value)
})
const isImg = computed(() => {
  if (_typeof(props.value) == 'String') {
    if (props.isImgKey) {
      return true
    }
    if (/^data\:image/.test(props.value)) {
      return true
    }
    if (/\.png|jpeg|jpg|awebp/.test(props.value)) {
      return true
    }
  }
  return false
})

function mouseover() {
  showImg.value = true
}
function mouseleave() {
  showImg.value = false
}

</script>
<style lang="scss" bundle scoped='false'>
.lonlyape-json {
  .value_span {
    display: inline-block;
    vertical-align: baseline;
    position: relative;

    >span {
      vertical-align: baseline;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
  }

  .bl_c,
  .string {
    color: #232323;
  }

  .pointer {
    cursor: pointer;
  }

  .string {
    display: inline-block;
    word-wrap: break-word;
    word-break: break-all;
  }

  .boolean {
    color: #004cfe;
  }

  .number {
    color: #31b505;
  }

  .null,
  .undefined {
    color: #ff0000;
  }

  // popper
  .popper_box {
    background-color: #ffffff;
    color: #232323;
    position: absolute;
    padding: 10px;
    padding-bottom: 8px;
    top: 24px;
    z-index: 40000;

    img {
      width: 200px;
    }

    #json_arrow {
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      visibility: hidden;
      top: -4px;
      left: 10px;

      &::before {
        position: absolute;
        width: 8px;
        height: 8px;
        background: inherit;
        visibility: visible;
        content: '';
        transform: rotate(45deg);
      }
    }

  }
}
</style>