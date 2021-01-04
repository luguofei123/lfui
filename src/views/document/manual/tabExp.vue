<!--
 * @Author: sunch
 * @Date: 2020-12-16 11:17:06
 * @LastEditTime: 2020-12-16 15:41:47
 * @LastEditors: Please set LastEditors
 * @Description: uf-tab组件测试用例
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/tabExp.vue
-->
<template>
  <div>
    <h3>标签菜单 uf-tab</h3>
    <h4>默认</h4>
    <uf-tab :data="tabList1" @click="onClickTabItem1"></uf-tab>
    <p style="margin-top: 20px;">
      {{ msg1 }}
    </p>
    <h4 style="margin-top: 20px;">自定义数据格式</h4>
    <uf-tab
      :data="tabList2"
      :tabIndex="tabIndex"
      :max-show-tab-num="8"
      :active-key-prop="'code'"
      :label-prop="'labelName'"
      @click="onClickTabItem2"
      @clickPrev="onClickPrev"
      @clickNext="onClickNext"
    ></uf-tab>
    <p style="margin-top: 20px;">
      {{ msg2 }}
    </p>
    <h4 style="margin-top: 20px;">属性</h4>
    <p>data 数据类型：Array 默认值：[] tab数组数据</p>
    <p>tabIndex 数据类型：String,Number 默认值：0 初始激活状态的tab的key值</p>
    <p>maxShowTabNum 数据类型：Number 默认值：6 最大显示的tab个数，默认最多显示6个</p>
    <p>activeKeyProp 数据类型：String 默认值："current" 激活状态的key的属性，默认item.current</p>
    <p>labelProp 数据类型：String 默认值："text" 显示tab内容的属性，默认item.text</p>
    <h4 style="margin-top: 20px;">事件</h4>
    <p>@click="(item, current) => {}" 点击tab项事件 item点击项数据，current点击项的key值</p>
    <p>@clickPrev="(state) => {}" 点击“上一个”按钮事件 state 类型：Boolean 返回可点击还是不可点击状态</p>
    <p>@clickNext="(state) => {}" 点击“下一个”按钮事件 state 类型：Boolean 返回可点击还是不可点击状态</p>
  </div>
</template>
<script>
export default {
  name: 'label-exp',
  data() {
    return {
      tabList1: [
        { text: '产品规范' },
        { text: '设计' },
        { text: '开发' },
        { text: '编码' },
        { text: '压力测试' },
        { text: '测试' },
        { text: '审核' },
        { text: '会议摘要' },
        { text: '文档' },
        { text: '流程控制' },
      ],
      tabList2: [
        { labelName: '产品规范', code: 'a' },
        { labelName: '设计', code: 'b' },
        { labelName: '开发', code: 'c' },
        { labelName: '编码', code: 'd' },
        { labelName: '压力测试', code: 'e' },
        { labelName: '测试', code: 'f' },
        { labelName: '审核', code: 'g' },
        { labelName: '会议摘要', code: 'h' },
        { labelName: '文档', code: 'i' },
        { labelName: '流程控制', code: 'j' },
      ],
      tabIndex: 'b',
      msg1: '',
      msg2: '',
    }
  },
  mounted() {},
  methods: {
    onClickTabItem1(item, key) {
      this.msg1 = 'current: ' + key + ' item: ' + JSON.stringify(item)
    },
    onClickTabItem2(item, key) {
      this.tabIndex = key
      this.msg2 = 'code: ' + key + ' item: ' + JSON.stringify(item)
    },
    onClickPrev(state) {
      console.log(state)
    },
    onClickNext(state) {
      console.log(state)
    },
  },
}
</script>
<style></style>
