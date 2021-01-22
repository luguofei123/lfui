<!--
 * @Author: sunch
 * @Date: 2020-12-24 13:53:04
 * @LastEditTime: 2020-12-24 15:02:34
 * @LastEditors: Please set LastEditors
 * @Description: 下拉菜单的选项
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfOption.vue
-->
<template>
  <div class="ufSelectPanelItem" :value="value" @click.stop="$emit('click', $event)">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'uf-option',
  props: {
    value: String,
  },
}
</script>