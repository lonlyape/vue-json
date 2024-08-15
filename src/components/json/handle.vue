<template>
  <div class="handle_view" :class="{ 'hidden': hiddenB }" v-if="key">
    <span class="close_span" @click.prevent="toggleHidden">
      <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="971">
        <path
          d="M862 162C765.4 65.3 638.7 17 512 17S258.6 65.3 162 162c-193.3 193.3-193.3 506.7 0 700 96.7 96.7 223.3 145 350 145s253.4-48.3 350-145c193.3-193.3 193.3-506.7 0-700z m-28.3 671.7c-43.4 43.5-94.1 77.1-150.5 100C628.7 955.8 571.1 967 512 967s-116.7-11.2-171.2-33.3c-56.4-22.9-107-56.5-150.5-100-43.5-43.4-77.1-94.1-100-150.5C68.2 628.7 57 571.1 57 512s11.2-116.7 33.3-171.2c22.9-56.4 56.5-107.1 100-150.5 43.4-43.4 94.1-77.1 150.5-100C395.3 68.2 452.9 57 512 57s116.7 11.2 171.2 33.3c56.4 22.9 107 56.5 150.5 100 43.5 43.4 77.1 94.1 100 150.5C955.8 395.3 967 452.9 967 512s-11.2 116.7-33.3 171.2c-22.9 56.4-56.5 107.1-100 150.5z"
          fill="#999999" p-id="972"></path>
        <path
          d="M698.5 669.8c7.9 7.9 7.9 20.8 0 28.7-3.9 4-9.1 5.9-14.3 5.9s-10.4-2-14.4-5.9L512 540.7 354.2 698.5c-4 4-9.2 5.9-14.4 5.9s-10.4-2-14.3-5.9c-7.9-7.9-7.9-20.8 0-28.7L483.3 512 325.5 354.2c-7.9-7.9-7.9-20.8 0-28.7 3.9-3.9 9.1-5.9 14.3-5.9s10.4 2 14.4 5.9L512 483.3l157.8-157.8c4-3.9 9.2-5.9 14.4-5.9s10.4 2 14.3 5.9c7.9 7.9 7.9 20.8 0 28.7L540.7 512l157.8 157.8z"
          fill="#999999" p-id="973"></path>
      </svg>
    </span>
    <div class="label_value ml-10 mb-10" v-if="key != mainKey">
      <span>key : </span>
      <span>{{ key }}</span>
    </div>
    <div class="ml-10 mb-10">value : </div>
    <div class="value_box ml-10" contenteditable>
      <div class="border_box">
        <div class="content_box">
          <pre><code data-language="JSON" ref="codeCom" :class="{ 'break': !isObject }">{{ showValue }}</code></pre>
        </div>
      </div>
    </div>
    <div class="button_box ml-10">
      <a class="button_item" @click.prevent="copyFun">
        复制
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, ref } from 'vue';

const mainKey = inject('mainKey')
const codeCom = ref()

const hiddenB = ref(false)

const props = defineProps<{
  value: any,
  width: string
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
  let value = props.value[key.value]
  if (value === null || value === undefined) {
    value = JSON.stringify(value)
  }
  return value
})

const isObject = computed(() => {
  if (!props.value) {
    return false
  }
  let value = props.value[key.value]
  return typeof value === 'object' && value !== null
})


function copyFun() {
  let text = codeCom.value.innerText
  if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
  } else {
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
  }
}

function toggleHidden() {
  hiddenB.value = !hiddenB.value;
}

defineExpose({
  hiddenB,
  toggleHidden
})

</script>
<style lang="scss" bundle scoped='false'>
.lonlyape-json {
  .handle_view {
    display: flex;
    width: v-bind(width);
    color: #232323;
    position: relative;
    box-sizing: border-box;
    flex-direction: column;
    transition: width 0.4s ease-in-out;
    overflow: hidden;

    &.hidden {
      width: 0px;
    }

    .close_span {
      position: absolute;
      right: 0;
      cursor: pointer;
    }

    .ml-10 {
      margin-left: 10px;
    }

    .mb-10 {
      margin-bottom: 10px;
    }

    .value_box {
      flex: 1;
      width: calc(100% - 30px);
      overflow: hidden;
      border-radius: 4px;
      box-sizing: border-box;
      box-shadow: 0 0 4px 0 #979797;

      .border_box {
        padding: 10px;
        overflow: hidden;
        height: calc(100% - 20px);
      }

      .content_box {
        height: 100%;
        padding: 0 10px 0 6px;
        overflow: hidden;
        overflow-y: scroll;
        margin-right: -34px;

        pre {
          margin: 0;
        }
      }

      code {
        height: 100%;
        overflow: hidden;

        &.break {
          word-break: break-all;
          white-space: pre-wrap;
        }
      }
    }

    .button_box {
      padding: 10px 0;
      .button_item{
        cursor: pointer;
      }
    }
  }
}
</style>