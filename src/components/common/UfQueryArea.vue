<!--
 * @Author: your name
 * @Date: 2020-05-15 15:02:09
 * @LastEditTime: 2020-05-15 15:13:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ufgov-vue/src/components/uf-queryarea.vue
 -->
<template>
    <div class="query-wrap">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'uf-queryarea'
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.query-wrap {
  background-color: $uf-query-area-background-color;
  padding: 10px;
  clear: both;
  border: 1px solid $uf-query-area-border;
}
</style>