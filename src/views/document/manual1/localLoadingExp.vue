<!--
 * @Author: sunch
 * @Date: 2020-12-16 14:28:42
 * @LastEditTime: 2020-12-16 15:03:57
 * @LastEditors: Please set LastEditors
 * @Description: 局部Loading组件
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/localLoading.vue
-->
<template>
  <div>
    <h3>局部Loading uf-local-loading</h3>
    <p>父级容器需要 position: relative; 或绝对定位</p>
    <uf-button @click="showLoading">显示Loading</uf-button>
    <div style="position: relative;width: 300px;height:200px;border: 1px solid #333;margin-top: 20px;">
      <uf-local-loading v-model="show"></uf-local-loading>
    </div>
    <h4 style="margin-top: 20px;">属性</h4>
    <p>value 类型：Boolean 设置是否显示</p>
    <p>text 类型：String 设置显示内容</p>
  </div>
</template>
<script>
export default {
  name: 'uf-local-loading-exp',
  data() {
    return {
      show: false,
      text: '不要不要不要关掉...',
    }
  },
  mounted() {},
  methods: {
    showLoading() {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 2000)
    },
  },
}
</script>
<style></style>
