<!--
 * @Author: sunch
 * @Date: 2020-12-09 16:23:43
 * @LastEditTime: 2020-12-14 14:26:43
 * @LastEditors: Please set LastEditors
 * @Description: body内的提示组件 不直接使用
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/Ufvtooltip.vue
-->
<template>
  <div class="uf-vtooltip-wrap" :class="(visible && content)?'show':''" ref="tooltip" :style="{top,left}">
    <i v-show="type === 'bottom'" class="uf-vtooltip-allowtop"></i>
    <div class="uf-vtooltip">
      {{ content }}
    </div>
    <i v-show="type === 'top'" class="uf-vtooltip-allowbottom"></i>
  </div>
</template>
<script>
export default {
  name: 'uf-vtooltip',
  data() {
    return {
      width: 0,
      height: 0,
      type: 'bottom',
      visible: false,
      content: '',
      top: 0,
      left: 0
    }
  },
  watch: {
    content: {
      handler(cnt){
        if(cnt){
          this.$nextTick(() => {
            this.width = this.$refs.tooltip.offsetWidth
            this.height = this.$refs.tooltip.offsetHeight
          })
        }
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.uf-vtooltip-wrap {
  position: relative;
  display: inline-block;
  max-width: 300px;
  position: fixed;
  z-index: 9;
  padding: 4px 0;
  box-sizing: border-box;
  opacity: 0;
  transition: opacity ease .3s;
}
.uf-vtooltip {
  display: inline-block;
  max-width: 300px;
  height: 26px;
  border-radius: 4px;
  background: #eee;
  color: #666;
  font-size: 12px;
  line-height: 27px;
  padding: 0 5px;
  box-sizing: border-box;
}
.uf-vtooltip-allowtop {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #eee;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.uf-vtooltip-allowbottom {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #eee;
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);
}
.show {
  opacity: 1;
}
</style>
