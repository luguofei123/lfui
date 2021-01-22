<!--
 * @Author: lwz
 * @Date: 2020-12-17 17:08:26
 * @LastEditTime: 2020-12-18 15:38:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfPopover.vue
-->
<template>
  <div ref="popover" class="uf-popover">
    <!-- <div v-if="visible" ref="contentWrapper" class="content-wrapper" :class="{[`position-${position}`]: true}" >
      <slot name="content" :close="close"></slot>
      <div class="uf-content">
        <i v-if="iconClass" :class="['icon',iconClass]"></i>
        <span class="uf-content-t">{{title}}</span>
      </div>
      <div class="uf-popover-b">
        <uf-button type="default" class="mr-10">取消</uf-button>
        <uf-button type="normal" class="btn-confirm">确定</uf-button>
      </div>
    </div> -->
    <!-- 不可以使用stop 会阻止用户的操作 -->
    <transition name='fade'>
      <div v-if="init"
        ref='contentWrapper'
        v-show='show'
        class="content-wrapper"
        :class="options.direction"
        :style="{ // 这里就是控制定位的关键
            top:top+'px',
            left:left+'px'
        }">
        <div class="uf-popover__box">
          <slot name="content"> 
            <div class="uf-content">
            <i v-if="iconClass" :class="['icon',iconClass]"></i>
            <span class="uf-content-t">{{title}}</span>
          </div>
          </slot>
        </div>
        <div class="uf-popover-b">
          <uf-button type="default" class="mr-10">取消</uf-button>
          <uf-button type="normal" class="btn-confirm">确定</uf-button>
        </div>
      </div>
    </transition>
    <!-- span标签增加display: inline-block; 解决包裹元素高度一致的问题 -->
    <span ref="triggerWrapper" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import {on, off} from './UfPopoverUtils';
const list = [
  'top-end',
  'left-end',
  'top-start',
  'right-end',
  'top-middle',
  'bottom-end',
  'left-start',
  'right-start',
  'left-middle',
  'right-middle',
  'bottom-start',
  'bottom-middle'
];
  export default {
    name: "uf-popover",
    components: {},

    props: {
      title:{
        type:String,
        default:'是否确认删除？'
      },
      iconClass:{
        type:String,
        default:''
      },
      position: {
        type: String,
        default: 'top',
        validator(value) {
          let dator = /^(top|bottom|left|right)(-start|-end|-middle)?$/g.test(
            value
          );
          return dator;
        }
      },
      trigger: {
        type: String,
        default: "click",
        // 这里为了扩展所以这样写
        // 只有两种情况可以优化为只要不是click就默认给hover
        validator: value => ["click", "hover"].indexOf(value) > -1
        
        // validator(value) {
        //   return ['click', 'hover', 'focus'].indexOf(value) >= 0
        // }
      },
    },

    data() {
      return {
        init: false,
        top:0,
        left:0,
        options:{},
      }
    },

    computed: {},
    watch: {
      // 我们会监控v-if的情况, 第一次渲染的时候才做这里的操作, 而且只执行一次
      init() {
        this.$nextTick(() => {
          let trigger = this.trigger,
            dom = this.$refs.contentWrapper,
            content = this.$refs.contentWrapper;
            // 这里有人会有疑问, 这什么鬼写法
            // 这里是因为append操作属于剪切, 所以不会出现两个元素
            // 其实这个元素出现之后就一直存在与页面上了, 除非销毁本组件
            // 组件销毁的时候, 我们会document.body.removeChild(content);
          document.body.appendChild(dom);
          if (trigger === "click") {
            on(content, "click", this.handleClick);
          }
        });
      },
      // 这个才是每次显示隐藏都会触发的方法
      show() {
      // 判断只有显示提示框的时候才会去计算位置
        if (this.show) {
          this.$nextTick(() => {
            let { popover, contentWrapper } = this.$refs,
              { left, top, options } = this.getPopoverposition(
                popover,
                contentWrapper,
                this.position
              );
            // 有了坐标, 就可以很开心的定位了
            this.left = left;
            this.top = top;
            // 这个配置是决定 '小三角' 的位置的
            this.options = options;
          });
        }
      }
    },

    mounted() {
      this.$nextTick(()=>{
        //获取用户定义的事件类型
        let trigger = this.trigger,
            popover = this.$refs.popover; //本次选择操作DOM
        if(trigger === 'click'){
          on(popover,"click",this.handleClick);
        }else if(trigger === 'hover'){
          on(popover,"mouseenter",this.handleMouseEnter);
          on(popover,"mouseleave",this.handleMouseLeave);
        }

      });
      // const popover = this.$refs.popover
      // if (this.trigger === 'click') {
      //   popover.addEventListener('click', this.onClick)
      // } else if (this.trigger === 'hover') {
      //   popover.addEventListener('mouseenter', this.open)// 添加hover监听事件
      //   popover.addEventListener('mouseleave', this.close)// 取消hover监听事件
      // } else {
      //   popover.addEventListener('mousedown', this.open)// 添加hover监听事件
      //   popover.addEventListener('mouseup', this.close)// 取消hover监听事件
      // }
    },

    destroyed() { // 页面销毁的时候去掉监听
      let { popover, contentWrapper } = this.$refs;
      off(contentWrapper, "mouseleave", this.handleMouseLeave);
      off(popover, "mouseleave", this.handleMouseLeave);
      off(contentWrapper, "mouseenter", this.handleMouseEnter);
      off(popover, "mouseenter", this.handleMouseEnter);
      off(document, "click", this.close);
      document.body.removeChild(contentWrapper);
    },

    methods: {
      handleClick(){
        //不管怎么样，都要触发一次，这个值就会把v-if永远置成true;
        this.init = true;
        //在他本身被css隐藏的时候
        if (this.$refs.contentWrapper && this.$refs.contentWrapper.style.display === "none") {
          // 必须这样强制写, 
          // 否则与之后的代码配合时, 有bug无法消失
          this.$refs.contentWrapper.style.display = "block";
          this.show = true;
        } else {
        // 除了第一次之外, 之后都只是变换这个this.show的'真假'
          this.show = !this.show;
        }
        // 不要监听body, 因为可能height不是100%;
        // 这个document其实也可以由用户指定
        // 放入让popover消失的函数, 这样方便之后的移除事件操作
        this.show && document.addEventListener("click", this.close);
      },
      close(e){
        //判断事件源是不是咱们的popover组件
        if(this.isPopover(e)){
          this.show = false;
          //点击完就可以移除了，下次操作再绑定即可，因为如果往document绑定太多，会非常卡
          document.removeEventListener("click",this.close);
          //
        }
      },
      /** 
       * 1. 判断点击的元素是不是popover组件
       * 2. 点击popover弹出层里面的元素，也算是点击popover，因为用户可能会通过slot传入一些结构，这种情况不能关闭
       */
      isPopover(e){
        let dom = e.target,
          popover = this.$refs.popover,
          content = this.$refs.contentWrapper;
          // 1: 点击popover包裹的元素, 关闭popover
          // 2: 点击popover内容区元素, 不关闭popover
        return !(popover.contains(dom) || content.contains(dom));
      },
      /** 
       * CONTANT 常数: 物体距离目标的间隙距离, 单位px;
       */
      getPopoverPosition(popover, content, direction,CONTANT ) {
        // 这个show本次用不到, 为以后的组件做准备
        let result = { show: true };
        // 1: 让这个函数去初始化'参与运算的所有参数';
        // 把处理好的值, 赋给result对象
        this.getOptions(result, popover, content, direction,CONTANT );
        // 2: 拿到屏幕的偏移
        let { left, top } = getScrollOffset();
        // 3: return出去的坐标, 一定是针对当前可视区域的
        result.left += left;
        result.top += top;
        return result;
      },
      getOptions(result, popover, content, direction,CONTANT = 10) {
        // 1: 可能会反复的调用, 所以来个深复制
        let myList = list.concat(),
          client = popover.getBoundingClientRect();// 获取popover的可视区距离
        // 2: 每次使用一种模式, 就把这个模式从list中干掉, 这样直到数组为空, 就是所有可能性都尝试过了
        myList.splice(list.indexOf(direction), 1);
        // 3: 把参数整理好, 传给处理函数
        this.getDirection(result, {
          myList,
          direction,
          CONTANT,
          top: client.top,
          left: client.left,
          popoverWidth: popover.offsetWidth,
          contentWidth: content.offsetWidth,
          popoverHeight: popover.offsetHeight,
          contentHeight: content.offsetHeight
        });
      },
      getDirection(result, options) {
        let {
          top,
          left,
          CONTANT,
          direction,
          contentWidth,
          popoverWidth,
          contentHeight,
          popoverHeight
        } = options;
        result.options = options;
        let main = direction.split('-')[0],
          around = direction.split('-')[1];
        if (main === 'top' || main === 'bottom') {
          if (around === 'start') {
            result.left = left;
          } else if (around === 'end') {
            result.left = left + popoverWidth - contentWidth;
          } else if (around === 'middle') {
            result.left = left + popoverWidth / 2 - contentWidth / 2;
          }
          if (main === 'top') {
            result.top = top - contentHeight - CONTANT;
          } else {
            result.top = top + popoverHeight + CONTANT;
          }
        } else if (main === 'left' || main === 'right') {
          if (around === 'start') {
            result.top = top;
          } else if (around === 'end') {
            result.top = top + popoverHeight - contentHeight;
          } else if (around === 'middle') {
            result.top = top + popoverHeight / 2 - contentHeight / 2;
          }
          if (main === 'left') {
            result.left = left - contentWidth - CONTANT;
          } else {
            result.left = left + popoverWidth + CONTANT;
          }
        }

        this.testDirection(result, options);
      },
      testDirection(result, options) {
        let { left, top } = result,
          width = document.documentElement.clientWidth,
          height = document.documentElement.clientHeight;
        if (
          top < 0 ||
          left < 0 ||
          top + options.contentHeight > height ||
          left + options.contentWidth > width
        ) {
          // 还有可以循环的
          if (options.myList.length) {
            options.direction = options.myList.shift();
            getDirection(result, options);
          } else {
            // 实在不行就在父级身上
            result.left = options.left;
            result.right = options.right;
          }
        } else {
          result.show = true;
        }
      },
      // 移入
      handleMouseEnter() {
        clearTimeout(this.time);
        this.init = true;
        this.show = true;
      },
      // 移出
      handleMouseLeave() {
        clearTimeout(this.time);
        this.time = setTimeout(() => {
          this.show = false;
        }, 200);
      }

      
    }
  }
</script>

<style lang="scss" scoped>
.content-wrapper{
  width:240px;
  height:110px;
  background:#fff;
  // border: 1px solid #ccc;
  box-shadow:rgba(169, 169, 169, 0.5) 1px 1px 4px 2px;
  padding:15px;
  position:fixed;
  z-index:10;
  .uf-content{
    padding-bottom:20px;
    .icon{
      margin-right:10px;
      font-size:16px;
      color:#ffcb00;
    }
    .uf-content-t{
      font-size:14px;
      color: #666;
      display:inline-block;
      vertical-align:middle;
    }
  }
  &::after{
    position:absolute;
    z-index:11;
    width:0;
    height:0;
    content:'';
    border:solid 10px transparent;
    border-top:solid 10px #fff;
    bottom:-20px;
    left:45px;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .2));
  }
  &::before{
    position: absolute;
    bottom: -10px;
    left: 45px;
    content: '';
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid rgba(255, 255, 255, .1);
  }
  .uf-popover-b{
    text-align:right;
  }

}

.position-top{
  bottom:20px;
  left:0;
}
</style>
