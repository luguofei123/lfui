<!--
 * @Author: sunch
 * @Date: 2020-12-16 14:14:54
 * @LastEditTime: 2020-12-16 14:22:07
 * @LastEditors: Please set LastEditors
 * @Description: 全局loading
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/loadingExp.vue
-->
<template>
  <div>
    <h3>全页面加载中 uf-Loading</h3>

    <p>10秒自动隐藏</p>

    <uf-button @click="showLoading">显示Loading</uf-button>
    <h4 style="margin-top: 20px;">方法</h4>
    <p>$showLoading()  显示Loading</p>
    <p>$hideLoading()  隐藏Loading</p>
  </div>
</template>
<script>
export default {
  name: 'loading-exp',
  data() {
    return {}
  },
  mounted() {},
  methods: {
    showLoading() {
      this.$showLoading()
      setTimeout(() => {
        this.$hideLoading()
      }, 2000)
    },
  },
}
</script>
<style></style>
