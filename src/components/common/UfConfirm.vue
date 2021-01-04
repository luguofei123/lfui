<!--
 * @Author: lwz
 * @LastEditTime: 2020-12-22 14:23:09
 * @LastEditors: Please set LastEditors
 * @Description: 确认弹窗
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfConfirm.vue
-->
<template>
  <div class="modal-warp" v-show="visible" :style="{ background:'rgba(0, 0, 0, 0.5)', 'z-index': zIndex }">
    <div class="modal" :id="id">
      <div class="header">
        <h2 class="title"><i :class="['icon', `icon-${type}`]"></i> {{ title }}</h2>
        <i class="icon icon-close close" @click.stop="handleAction('no')"></i>
      </div>
      <div class="confirm-content" v-if="content">{{content}}</div>
      <div class="footer">
        <div class="footer-btns">
          <slot name="footerBtns">
            <uf-button class="mr-10" @click="handleAction('no')">{{cancelBtnText}}</uf-button>
            <uf-button type="primary" @click="handleAction('yes')">{{yesBtnText}}</uf-button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UfConfirm',
  data() {
    return {
      modalEl: '', //保存的modal元素实例
      visible: false,
      title:'',
      content:'',
      yesBtnText:'确定',
      cancelBtnText:'取消',
      type:'',
      promiseStatus:null,
      maskClosable:true,
      zIndex:10,
      id:''
    }
  },
  watch: {

  },
  methods: {
    confirm(){
      let that = this;
      this.visible = true;
      return new Promise(function(resolve,reject){
        that.promiseStatus = {resolve,reject};
      })
    },
    handleAction(action){
      this.visible = false;
      if(action === 'yes'){
        this.promiseStatus && this.promiseStatus.resolve();
      }else{
        this.promiseStatus && this.promiseStatus.reject();
      }
      //关闭确认框时移除dom,并销毁实例
      this.remove();
    },
    mousedown(event) {
      this.modalEl = document.getElementById(this.id)
      // console.log(this.id)
      let div1 = this.modalEl
      this.modalEl.style.cursor = 'move'
      this.isDowm = true
      let distanceX = event.clientX - this.modalEl.offsetLeft
      let distanceY = event.clientY - this.modalEl.offsetTop
      //   console.log(distanceX)
      //   console.log(distanceY)
      document.onmousemove = function(ev) {
        let oevent = ev || event
        div1.style.left = oevent.clientX - distanceX + 'px'
        div1.style.top = oevent.clientY - distanceY + 'px'
      }
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
        div1.style.cursor = 'default'
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.modal-warp {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 0;
  border-radius: 4px;
  width:240px;
}
.header {
  background-color: white;
  color: #333;
  padding: 10px 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: #f3f3f3; */
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.header:hover {
  cursor: move;
}
.close {
  font-size: 16px;
}
.close:hover {
  cursor: pointer;
}
.title {
  font-size: 14px;
  color: #333;
  margin-bottom:0;
  .icon-warning{
    font-size: 16px;
    color:#ffcb00!important;
  }
}
.confirm-content{
  padding: 10px 15px;
}
.footer {
  padding: 10px 15px;
  text-align: right;
}
.footer-btns {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
