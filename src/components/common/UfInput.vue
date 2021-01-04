<!--
 * @Author: sunch
 * @Date: 2020-12-07 09:56:18
 * @LastEditTime: 2020-12-24 16:20:43
 * @LastEditors: Please set LastEditors
 * @Description: input输入框组件
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfInput.vue
-->
<template>
  <uf-input-el-wrap :inputValue="inputValue" :focus="focus" :allowClear="allowClear" :noborder="noborder" :size="size"
    :disabled="disabled" :beforeIcon="beforeIcon" :afterIcon="afterIcon" @clear="clear" 
    @clickBeforeIcon="$emit('clickBeforeIcon')"
    @clickAfterIcon="$emit('clickAfterIcon')">
    <input type="text" class="uf-input" v-model="inputValue" v-bind="$attrs" :disabled="disabled" :placeholder="placeholder" @input="onInput" @keyup="onKeyup" @focus="onFocus" @blur="onBlur" />
  </uf-input-el-wrap>
</template>
<script>
import UfInputElWrap from './UfInputElWrap'
export default {
  name: 'uf-input',
  inheritAttrs: false,
  components: {
    'uf-input-el-wrap': UfInputElWrap,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    noborder: {
      type: Boolean,
      default: false,
    },
    size: {
      //尺寸
      type: String,
      default: ''
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    beforeIcon: {
      type: String,
      default: '',
    },
    afterIcon: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputValue: this.value ? this.value : '',
      focus: false,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.inputValue = val
      },
      immediate: true,
    },
  },
  methods: {
    clear() {
      let clearVal = this.inputValue
      this.inputValue = ''
      this.$emit('input', '')
      this.$emit('clear', clearVal)
    },
    onInput(e) {
      this.$emit('change', e.target.value)
      this.$emit('input', e.target.value)
      this.$parent.$emit('valid');
    },
    onFocus(e) {
      this.focus = true
      this.$emit('focus', e)
    },
    onBlur(e) {
      this.focus = false
      this.$emit('blur', e)
    },
    onKeyup(e) {
      this.$emit('keyup', e)
    },
  },
}
</script>
