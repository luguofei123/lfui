<!-- 选择框 -->
<template>
  <div>
    <lf-input ref="reference" type="text" name="cede" v-model="currentValue" @handleFocus="handleFocus"></lf-input>
    <!-- 模仿vue做了一个下拉 -->
    <transition>
      <el-select-menu ref="popper" :append-to-body="popperAppendToBody" v-show="visible !== false">
        <ul>
          <li>1111</li>
          <li>2222</li>
          <li>3333</li>
          <li>4444</li>
          <li>5555</li>
        </ul>
      </el-select-menu>
    </transition>
  </div>
</template>
<script lang="javascript">
import LfInput from '../input/index'
import Emitter from '../utils/mixins/emitter'
import ElSelectMenu from './select-dropdown.vue'
export default {
  mixins: [Emitter],
  name: 'lf-checkbox',
  data() {
    return {
      visible: false,
      popperAppendToBody: true,
      currentValue: '',
      popperClass: {}
    }
  },
  provide() {
    return {
      select: this
    }
  },
  watch: {
    visible(val) {
      if (!val) {
        this.broadcast('ElSelectDropdown', 'destroyPopper')
      } else {
        this.broadcast('ElSelectDropdown', 'updatePopper')
      }
    }
  },
  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = ''
    }
    //  addResizeListener(this.$el, this.handleResize)

    // const reference = this.$refs.reference
    // if (reference && reference.$el) {
    //   const sizeMap = {
    //     medium: 36,
    //     small: 32,
    //     mini: 28
    //   }
    //   const input = reference.$el.querySelector('input')
    //   this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize]
    // }
    // if (this.remote && this.multiple) {
    //   this.resetInputHeight()
    // }
    // this.$nextTick(() => {
    //   if (reference && reference.$el) {
    //     this.inputWidth = reference.$el.getBoundingClientRect().width
    //   }
    // })
    // this.setSelected()
  },
  methods: {
    handleFocus(e) {
      this.visible = true
    }
  },
  components: {
    ElSelectMenu,
    LfInput
  }
}
</script>
<style lang="scss" src="./select.scss"></style>
