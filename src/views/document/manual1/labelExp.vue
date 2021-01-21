<!--
 * @Author: sunch
 * @Date: 2020-12-09 14:35:17
 * @LastEditTime: 2020-12-14 15:03:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/labelExp.vue
-->
<template>
  <div>
    <h3>标签 uf-label</h3>

    <h4>默认：</h4>
    <uf-label>姓名：</uf-label>

    <h4>宽度：</h4>
    <uf-label width="140">个人爱好：</uf-label>

    <h4>对齐方式：</h4>
    <uf-label width="140" align="right">姓名：</uf-label>

    <h4>根据宽度省略：（自动补充中英文冒号）</h4>
    <uf-label width="100">我们仍未知道那朵花的名字：</uf-label>
  </div>
</template>
<script>
export default {
  name: 'label-exp',
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