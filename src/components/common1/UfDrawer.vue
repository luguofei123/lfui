<!--
 * @Author: sunch
 * @Date: 2020-06-16 09:43:15
 * @LastEditTime: 2020-11-11 11:30:39
 * @LastEditors: Please set LastEditors
 * @Description: 抽屉组件
 * @FilePath: /agla-fe-8.50/vuedev/src/components/UfDrawer.vue
-->
<template>
  <div class="drawer-wrap" v-show="value" :style="{'z-index': zIndex }" @click="onClickMask">
    <div class="drawer" :style="{'width': width + 'px', right: showDrawer ? '0' : -width + 'px'}">
      <div class="drawerInner myscrollbar" :style="{'overflow-y': scrollable ? 'auto' : 'hidden'}">
        <slot></slot>
      </div>
      <div class="drawer-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'uf-drawer',
  data(){
    return {
      showDrawer: false
    }
  },
  props: {
    value: Boolean,
    zIndex:{
      type: Number,
      default: 2
    },
    width: {
      type: Number,
      default: 400
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  watch:{
    value(val){
      if(val){
        setTimeout(() => {
            this.showDrawer = val
        }, 30)
      }else{
        this.showDrawer = val
      }
    }
  },
  methods: {
      onClickMask(){
        // this.$emit('onClickMask')
        if(this.maskClosable){
          this.showDrawer = false
          setTimeout(() => {
            this.$emit('drawerClose')
          }, 300)
        }
      }
  }
}
</script>
<style lang="scss" scoped>
.drawer-wrap{
  font-size: 12px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.drawer {
  position: absolute;
  top: 45px;
  bottom: 0;
  transition: right 0.3s ease;
  background: #fff;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: auto;
}
.drawerInner{
  box-sizing: border-box;
  padding-bottom: 50px;
  width: 100%;
  height: 100%;
}
.drawer-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  left: 0;
  padding: 0 15px;
  border-top: 1px solid #d9d9d9;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
