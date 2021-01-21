<!--
 * @Author: luguofei
 * @Date: 2020-12-16 14:28:42
 * @LastEditTime: 2020-12-16 15:03:57
 * @LastEditors: Please set LastEditors
 * @Description: 全局消息
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/UfMessage.vue
-->
<template>
  <div>
    <h3>全局message</h3>
    <uf-button @click="showMessage4">默认显示消息</uf-button>&emsp;&emsp;
    <uf-button @click="showMessage1">成功显示消息</uf-button>&emsp;&emsp;
    <uf-button @click="showMessage2">失败显示消息</uf-button>&emsp;&emsp;
    <uf-button @click="showMessage3">警告显示消息</uf-button>&emsp;&emsp;
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource1 = !showSource1">显示代码</a>
    </div>
    <pre v-if="showSource1">
      <code>{{pagerText1}}</code>
    </pre>
  </div>

</template>
<script>
export default {
  name: '',
  data() {
    return {
      showSource1: false,
      pagerText1: `<div>
    <h3>全局message</h3>
    <uf-button @click="showMessage4">默认显示消息</uf-button>&emsp;&emsp;
    <uf-button @click="showMessage1">成功显示消息</uf-button>&emsp;&emsp;
    <uf-button @click="showMessage2">失败显示消息</uf-button>&emsp;&emsp;
    <uf-button @click="showMessage3">警告显示消息</uf-button>&emsp;&emsp;
  </div>
<script>
  methods: {
    showMessage1() {
      this.$UfMessage({
  　　  type:'success',
  　　  content:'这是一条自定义成功消息',
        duration:5000,
        isClose: true
      })
    },
    showMessage2() {
      this.$UfMessage({
  　　  type:'error',
  　　  content:'这是一条自定义失败消息'
      })
    },
    showMessage3() {
      this.$UfMessage({
  　　  type:'warning',
  　　  content:'这是一条自定义警告消息'
      })
    },
    showMessage4 () {
      this.$UfMessage({
  　　  content:'这是一条自定义警告消息'
      })
    }
  },
      `
    }
  },
  mounted() {},
  methods: {
    showMessage1() {
      this.$UfMessage({
  　　  type:'success',
  　　  content:'这是一条自定义成功消息',
        duration:5000,
        isClose: true
      })
    },
    showMessage2() {
      this.$UfMessage({
  　　  type:'error',
  　　  content:'这是一条自定义失败消息'
      })
    },
    showMessage3() {
      this.$UfMessage({
  　　  type:'warning',
  　　  content:'这是一条自定义警告消息'
      })
    },
    showMessage4 () {
      this.$UfMessage({
  　　  content:'这是一条自定义警告消息'
      })
    }
  },
}
</script>
<style></style>
