<template>
  <button type="button" :disabled="disabled" :class="['lf-botton', 'lf-botton--'+size, 'lf-botton--'+type, disabled ? 'is-disabled' : '']" @click="onClick">
    <span  class="text"><slot></slot></span>
  </button>
</template>
<script lang="javascript">
export default {
  name: 'lf-button',
  props: {
    type: {
      type: String,
      default: 'default'
      // default, primary, dashed, danger, link
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
      // default small large
    }
  },
  data () {
    return {
      tete: ''
    }
  },
  methods: {
    onClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss" src="./button.scss"></style>
<style lang="scss" scoped>
  // .lf-botton, .lf-botton:active, .lf-botton:focus{
  //   outline: 0;
  // }
  // .lf-botton-type-default{
  //   color: #000;
  //   background-color: #fff;
  //   border: 1px solid #d9d9d9;
  //   &:hover{
  //     color: #4049ff;
  //     border: 1px solid #4049ff;
  //   }
  // }
  // .lf-botton-type-default.lf-botton-disabled {
  //   color: #c0c4cc;
  //   background-color: #fff;
  //   border: 1px solid #ebeef5;
  //   cursor: not-allowed;
  //   &:hover{
  //     color: #c0c4cc;
  //     background-color: #fff;
  //     border: 1px solid #ebeef5;
  //   }
  // }
  // .lf-botton-type-primary{
  //   color: #fff;
  //   background-color: #096dd9;
  //   border: 1px solid #096dd9;
  //   &:hover{
  //     background-color: #4049ff;
  //     border: 1px solid #4049ff;
  //   }
  // }
  // .lf-botton-type-primary.lf-botton-disabled {
  //   color: #fff;
  //   background-color: #a0cfff;
  //   border: 1px solid #a0cfff;
  //   cursor: not-allowed;
  //   &:hover{
  //     color: #fff;
  //     background-color: #a0cfff;
  //     border: 1px solid #a0cfff;
  //   }
  // }
  // .lf-botton-size-large{
  //   height: 32px;
  //   padding: 0 15px;
  //   font-size: 14px;
  //   line-height: 32px;
  // }
  // .lf-botton-size-default{
  //   height: 28px;
  //   padding: 0 12px;
  //   font-size: 13px;
  //   line-height: 28px;
  // }
  // .lf-botton-size-small{
  //   height: 24px;
  //   padding: 0 10px;
  //   font-size: 12px;
  //   line-height: 24px;
  // }
  // .lf-botton {
  //   box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  //   position: relative;
  //   cursor: pointer;
  //   display: inline-block;
  //   font-weight: 400;
  //   white-space: nowrap;
  //   text-align: center;
  //   touch-action: manipulation;
  //   border-radius: 4px;
  // }
</style>
