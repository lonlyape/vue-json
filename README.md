# vue-json-lonlyape

> vue json 组件

## use

```bash
# install
npm install vue-json-lonlyape --save

# main.js
......
import Json from 'vue-json-lonlyape'
app.use(Json)
......

or
# xxx.vue
......
import { Json } from 'vue-json-lonlyape'
......
components: {
  Json
}
......
```


# 参数

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 要展示的json数据 | Object | - |
| imgKeys | 图片字段 | string[] |  [] |
| expandLevel | 初始展开层级 | number |  0 |
| handleSpan | 右侧宽度，1-24，24是整宽度 | number |  12 |