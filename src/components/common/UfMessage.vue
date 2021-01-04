<!--
 * @Author: luguofei
 * @Date: 2020-12-12 09:01:35
 * @LastEditTime: 2020-12-12 10:23:30
 * @LastEditors: Please set LastEditors
 * @Description: 全局消息提示公共组件 未做完
 * @FilePath: /agla-fe-8.50/vuedev/src/components/UfMessage.vue
-->
<template>
    <transition name="fade">
        <div class="message" :class="type" v-show="visible" @mouseover="hover = true" @mouseleave="hover = false">
             <i :class="['icon',iconClass]"></i>
             <p class="content">{{content}}</p>
             <i v-if="isClose" class="delete-icon icon-close" @click="onCancle"></i>
        </div>
    </transition>
</template>

<script>
const UfMessage = {
  name:'UfMessage',
　data () {
　  return {
     visible:false,
     type:'default',
     content:'提示信息',
     duration: 3000,
     isClose: false,
     hover: false,
     time: null
　　}
　},
  computed: {
    iconClass () {
      if (this.type === 'success') {
        return 'icon-check-circle'
      } else if (this.type === 'error') {
        return 'icon-cross-circle'
      } else if (this.type === 'warning') {
        return 'icon-warning'
      } else {
        return 'icon-warning default'
      }
    }
  },
// 　install (Vue) {
// 　  Vue.prototype.$UfMessage = (config)=>{   //通过原型注册一个方法
// 　    const MessageConstructor = Vue.extend(UfMessage);  //生成一个Vue子类，子类就是这个组件
// 　　  const instance = new MessageConstructor({data:config});   //生成该子类的实例
// 　　  instance.vm = instance.$mount();  //将该实例手动挂载
// 　　  document.body.appendChild(instance.vm.$el);    //将实例挂载到body上
// 　　  instance.vm.visible = true;  
// 　  }
// 　},
　watch:{
　  visible (v) {
　　  if (v && !this.hover) {
　　　  this.time = setTimeout(() => {
　　　　  this.onClose()
　　　　 }, this.duration)
　　　}
　　},
　  hover (v) {
　　  if (v) {
        clearTimeout(this.time)
　　　} else {
    　  this.time =setTimeout(() => {
　　　　  this.onClose()
　　　　 }, this.duration)
      }
　　}
　},
 methods:{
　  onClose () {
　　  this.visible = false
      if (this.$el.parentNode) {
          setTimeout(() => {
            // this.$el.parentNode.removeChild(this.$el)
            this.remove();
          }, 1000)
      }
　　},
　　show () {
　　  this.visible = true
　　},
　　onCancle () {
// 　　  if( this.cancelBtn ) {
// 　　    this.cancelBtn.apply(this.content)
// 　　  };
　　  this.onClose();
　　}
　},
 
}
export default UfMessage
</script>

<style scoped lang='scss'>
  .message {
      position: fixed;
      left: 50%;
      top: 5%;
      transform: translate3d(-50%,-50%,0);
      background: rgba(0,0,0, 0.6);
      z-index: 1000;
      min-width: 288px;
    //   height: 32px;
      vertical-align: middle;
      display:table-cell;
      box-sizing: border-box;
      .icon{
          display: inline-block;
          position: absolute;
          width: 16px;
          height: 16px;
          left:6px;
          top:9px;
          }
      &.default{
          background: #EBF8F2;
          border: 1px solid #EBF8F2;
          border-radius: 4px;
          .icon-check-circle{
            color: gray!important;
          }
      }
      &.success {
          background: #EBF8F2;
          border: 1px solid #A7E1C4;
          border-radius: 4px;
          .icon-check-circle{
            color: green!important;
          }
        }
      &.warning {
          background: #FFFAEB;
          border: 1px solid #FCCCA7;
          border-radius: 4px;
          .icon-warning{
            color:orange!important;
          }
          }
      &.error {
          background: #FEF3EB;
          border: 1px solid #FFE9A7;
          border-radius: 4px;
          .icon-cross-circle{
            color:red!important;
          }
      }
      .content{
          display: inline-block;
          font-size: 12px;
          color: rgba(0,0,0,0.65);
          letter-spacing: 0;
          line-height: 28px;
          margin-left: 8px;
          padding:3px 20px;
          margin-bottom:0;
      }
      .delete-icon{
          display: block;
          width: 10px;
          height: 10px;
          position:absolute;
          top:12px;
          right:12px;
          font-size:18px;
          line-height: 10px;
          cursor: pointer;
          color: #000;
          opacity: .43;
      }
}
.fade-enter-active {
  animation: fade-in 0.3s ease;
}
.fade-leave-active {
  animation: fade-out 0.3s ease;
}
@keyframes fade-in {
  0% {
    top: -40px;
    opacity: 0;
  }
  100% {
    top: 5%;
    opacity: 100%;
  }
}
@keyframes fade-out {
  0% {
    top: 5%;
    opacity: 100%;
  }
  100% {
    top: -40px;
    opacity: 0;
  }
}
</style>
