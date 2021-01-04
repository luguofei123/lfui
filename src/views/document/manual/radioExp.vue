<template>
  <div>
    <h3>单选 uf-radio</h3>
    
    <h4>按钮类型(默认 type="normal")</h4>
    <div class="mt-10">
      <uf-radio type="normal" :options="radioList1" @click="onChange"></uf-radio>
    </div>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource1 = !showSource1">显示代码</a>
    </div>
    <pre v-if="showSource1">
      <code>{{pagerText1}}</code>
    </pre>

    <h4>按钮类型(默认 不传type默认为normal size="large")</h4>
    <div class="mt-10">
      <uf-radio type="normal" size="large" :options="radioList1" @click="onChange"></uf-radio>
    </div>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource2 = !showSource2">显示代码</a>
    </div>
    <pre v-if="showSource2">
      <code>{{pagerText2}}</code>
    </pre>

    <h4>按钮类型(默认 不传type默认为normal size="small")</h4>
    <div class="mt-10">
      <uf-radio type="normal" size="small" :options="radioList1" @click="onChange"></uf-radio>
    </div>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource3 = !showSource3">显示代码</a>
    </div>
    <pre v-if="showSource3">
      <code>{{pagerText3}}</code>
    </pre>

    <h4>按钮类型(整组禁用)</h4>    
    <div class="mt-10">
      <uf-radio :options="radioList2" :disabled="true"></uf-radio>
    </div>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource4 = !showSource4">显示代码</a>
    </div>
    <pre v-if="showSource4">
      <code>{{pagerText4}}</code>
    </pre>

    <h4>按钮类型(按钮式 type="button" size默认)</h4>
    <div class="mt-10">
      <uf-radio type="button" :options="radioList1" @click="onChange"></uf-radio>
    </div>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource5 = !showSource5">显示代码</a>
    </div>
    <pre v-if="showSource5">
      <code>{{pagerText5}}</code>
    </pre>

    <h4>按钮类型(按钮式 整组禁用 disabled="true")</h4>
    <div class="mt-10">
      <uf-radio type="button" :options="radioList2" :disabled="true"></uf-radio>
    </div>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource6 = !showSource6">显示代码</a>
    </div>
    <pre v-if="showSource6">
      <code>{{pagerText6}}</code>
    </pre>

    <h4>按钮类型(按钮式 size="large")</h4>
    <div class="mt-10">
      <uf-radio type="button" size="large" :options="radioList1" @click="onChange"></uf-radio>
    </div>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource7 = !showSource7">显示代码</a>
    </div>
    <pre v-if="showSource7">
      <code>{{pagerText7}}</code>
    </pre>

    <h4>按钮类型(按钮式 size="small")</h4>
    <div class="mt-10">
      <uf-radio type="button" size="small" :options="radioList1" @click="onChange"></uf-radio>
    </div>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource8 = !showSource8">显示代码</a>
    </div>
    <pre v-if="showSource8">
      <code>{{pagerText8}}</code>
    </pre>

    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource = !showSource">显示代码</a>
    </div>
    <pre v-if="showSource">
      <code>
        说明：
          1. type: 按钮类型(radio式和按钮式) 参数normal/button 可选
          2. size: 按钮尺寸 参数default/small/large 可选
                  radio式控制：行高、字号
                  按钮式控制：行高、字号、按钮整体高度
          3. 因内容不限 组件宽度不可设置
          4. 按钮式没有无边框的样式，插入表格插槽时可用radio样式
          5. disabled: 控制整组是否禁止选择 可选
          5. options: 主要属性 选项 label内容、value值、disabled此项是否禁止选择

        export default {
            data() {
                return {
                  radioList1: [
                    {
                      disabled: false,
                      value: 1,
                      label: "选项1"
                    },
                    {
                      disabled: false,
                      value: 2,
                      label: "选项2"
                    },
                    {
                      disabled: true,
                      value: 3,
                      label: "选项3"
                    },
                    {
                      disabled: false,
                      value: 4,
                      label: "选项4"
                    },
                  ],
                  radioList2: [
                    {
                      value: 1,
                      label: "这是鼠标经过按钮效果"
                    },
                    {
                      value: 2,
                      label: "选项2"
                    },
                    {
                      value: 3,
                      label: "选项3"
                    },
                    {
                      value: 4,
                      label: "选项4"
                    },
                  ],
                }
            },
            methods: {
              onChange(e) {
                console.log(e)
              }
            }
        }
      </code>
    </pre>
  </div>
</template>
<script>
export default {
  name: 'radioExp',
  data() {
    return {
      radioList1: [
        {
          disabled: false,
          value: 1,
          label: "选项1"
        },
        {
          disabled: false,
          value: 2,
          label: "选项2"
        },
        {
          disabled: true,
          value: 3,
          label: "选项3"
        },
        {
          disabled: false,
          value: 4,
          label: "选项4"
        },
      ],
      radioList2: [
        {
          value: 1,
          label: "这是鼠标经过按钮效果"
        },
        {
          value: 2,
          label: "选项2"
        },
        {
          value: 3,
          label: "选项3"
        },
        {
          value: 4,
          label: "选项4"
        },
      ],
      showSource: false,
      showSource1: false,
      showSource2: false,
      showSource3: false,
      showSource4: false,
      showSource5: false,
      showSource6: false,
      showSource7: false,
      showSource8: false,
      pagerText1: '<uf-radio type="normal" :options="radioList1" @click="onChange"></uf-radio>',
      pagerText2: '<uf-radio type="normal" size="large" :options="radioList1" @click="onChange"></uf-radio>',
      pagerText3: '<uf-radio type="normal" size="small" :options="radioList1" @click="onChange"></uf-radio>',
      pagerText4: '<a href="javascript:;" @click="showSource4 = !showSource4">显示代码</a>',
      pagerText5: '<uf-radio type="button" :options="radioList1" @click="onChange"></uf-radio>',
      pagerText6: '<uf-radio type="button" :options="radioList2" :disabled="true"></uf-radio>',
      pagerText7: '<uf-radio type="button" size="large" :options="radioList1" @click="onChange"></uf-radio>',
      pagerText8: '<uf-radio type="button" size="small" :options="radioList1" @click="onChange"></uf-radio>',
    }
  },
  methods: {
    onChange(e) {
      console.log(e)
    }
  }
}
</script>
