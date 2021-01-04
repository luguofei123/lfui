<!--
 * @Author: sunch
 * @Date: 2020-12-14 16:19:28
 * @LastEditTime: 2020-12-14 16:37:59
 * @LastEditors: Please set LastEditors
 * @Description: 文字提示指令 v-tooltip
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/vtooltipExp.vue
-->
<template>
  <div>
    <h3>文字提示指令 v-tooltip</h3>
    <h4>写法：</h4>
    <p>v-tooltip:对齐类型="表达式(字符串类型)"</p>
    <p>例：v-tooltip:leftTop="'人员属性分类'"</p>
    <p><span v-tooltip:leftTop="'人员属性分类'">人员属性分类：</span></p>
    <p>对齐类型：不填默认leftBottom，其他：leftTop, rightTop, centerTop, rightBottom, centerBottom</p>
    <h4>默认：</h4>
    <uf-label v-tooltip="'姓名'">姓名：</uf-label>
    <h4>对齐方式：</h4>
    <h3 v-tooltip:centerBottom="'这种事我只能说懂的都懂'" style="text-align: center;">这种事我只能说懂的都懂</h3>
    <h3 v-tooltip:rightTop="'这个世界与我不欢而散'" style="text-align: right;">这个世界与我不欢而散</h3>
  </div>
</template>
<script>
export default {
  name: 'vtooltip-exp',
  data() {
    return {
      
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>
<style>
</style>