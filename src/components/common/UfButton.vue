<!--
 * @Author: sunch
 * @Date: 2020-07-15 10:24:27
 * @LastEditTime: 2020-12-24 17:23:10
 * @LastEditors: Please set LastEditors
 * @Description: （未完成）自定义按钮
 * @FilePath: 
-->
<template>
  <a :class="['uf-btn', getTypeStr(type), icon ? 'uf-btn-icon' : '', size, disabled ? 'disabled' : '']"  ref="btn" href="javascript:;" @click="onClick">
    <div class="uf-btn-inner">
      <i v-if="showIcon && icon" :class="['icon ' + icon, hasContent ? 'mr-5' : '']"></i>
      <span ref="content" class="text">
        <slot></slot>
      </span>
      <i v-if="type === 'combox'||type === 'comboxlink'" class="uf-select-allow ml-5 icon icon-angle-bottom" :class="open ? 'transTop' : ''"></i>
      <i v-if="type === 'more'" class="uf-select-allow icon icon-angle-bottom" style="margin-left: 2px;" :class="open ? 'transTop' : ''" @click="onClickMore"></i>
    </div>

    <div v-if="type === 'combox'||type === 'comboxlink'" class="ufOptionsPanel" :style="{width: panelWidth+'px', top: panelTop + 'px',height: open?`${minPanelH}px`:'0', opacity: open?'1':'0',border: open?'1px solid #888888':'0' }">
        <div class="ufSelectPanelItem" :style="{height: `${panelItemH}px`,lineHeight: `${panelItemH}px` }" v-for="item in options" :key="item.value" @click.stop="onBtnItemClick(item, $event)">{{item.title}}</div>
    </div>
  </a>
</template>
<script>
const types = ['primary', 'default', 'normal', 'combox', 'comboxlink', 'more', 'radio', 'link', 'iconlink']
export default {
  name: 'uf-button',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default', //small large
    },
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      content: '',
      hasContent: false,
      open: false,
      panelWidth: 0,
      panelTop: 32
    }
  },
  computed: {
    showIcon() {
      return this.type === 'primary' || this.type === 'default' || this.type === 'normal' || this.type === 'iconlink'
    },
    panelItemH(){
      let h = 30
      switch(this.size){
        case 'small':
          h = 24
          break;
        case 'large':
          h = 40
          break;
        default:
          h = 30
      }
      return h
    },
    minPanelH(){
      return 3*this.panelItemH + 2
    }
  },
  mounted() {
    this.content = this.$refs.content.innerHTML
    setTimeout(()=>{
      this.panelWidth = this.$refs.btn.offsetWidth
      if(this.type === 'combox'){
        this.panelTop = this.$refs.btn.offsetHeight + 1
      }
      if(this.type === 'comboxlink'){
        this.panelTop = this.$refs.btn.offsetHeight + 5
      }
    }, 20)
  },
  watch: {
    content(val) {
      this.hasContent = !!val
    },
    open(boo) {
      this.$emit('visibleChange', boo)
    },
  },
  methods: {
    handleClose(){
      this.open = false
    },
    getTypeStr(type) {
      let classStr = 'uf-btn-normal'
      if (
        types.some((i) => {
          return i === type
        })
      ) {
        classStr = 'uf-btn-' + type
      }
      return classStr
    },
    onClick(e) {
      if (!this.disabled) {
        this.open = !this.open
        this.$emit('click', e)
      }
    },
    onClickMore(e) {
      if (!this.disabled) {
        this.open = !this.open
      }
    },
    onBtnItemClick(item, e){
      if (!this.disabled) {
        this.open = !this.open
        this.$emit('select', item, e)
      }
    }
  },
}
</script>
