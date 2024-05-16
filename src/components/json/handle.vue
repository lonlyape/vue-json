<template>
  <div class="handle_view" v-if="key">
    <div class="label_value">
      <span>key : </span>
      <span>{{ key }}</span>
    </div>
    <div>value : </div>
    <div class="value_box" contenteditable>
      <div class="border_box">
        <div class="content_box">
          <pre><code data-language="JSON" ref="codeCom">{{ showValue }}</code></pre>
        </div>
      </div>
    </div>
    <div class="button_box">
      <a class="button_item" @click.prevent="copyFun">
        复制
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const codeCom = ref()


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
  let value = props.value[key.value]
  if (value === null || value === undefined) {
    value = JSON.stringify(value)
  }
  return value
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

</script>
<style lang="scss" scoped="handle_view">
.handle_view {
  width: 300px;
  display: flex;
  color: #232323;
  flex-direction: column;

  .value_box {
    flex: 1;
    width: 300px;
    overflow: hidden;
    border-radius: 4px;
    word-wrap: break-word;
    word-break: break-all;
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
      overflow-y: scroll;
      margin-right: -28px;

      pre {
        margin: 0;
      }
    }

    code {
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre-wrap;
      height: 100%;
      overflow: hidden;
    }
  }

  .button_box {
    padding: 10px 0;

    .button_item {
      cursor: pointer;
      padding: 4px 8px;
      font-size: 12px;
      border-radius: 4px;
      color: #232323;
      display: inline-block;
      border: 1px solid #979797;

      &:hover {
        $color: #3d70fd;
        border-color: $color;
        background-color: $color;
        color: #fff;
      }
    }
  }
}
</style>