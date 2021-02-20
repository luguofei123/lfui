<template>
  <button type="button" :disabled="disabled" :class="['lf-btn', size, 'lf-btn-'+type]">
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
    }
  }
}
</script>
<style lang="scss" scoped>
  .lf-btn, .lf-btn:active, .lf-btn:focus{
    outline: 0;
  }
  .lf-btn-default{
    color: #000;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    &:hover{
      color: #4049ff;
      border: 1px solid #4049ff;
    }
  }
  .lf-btn-primary{
    color: #fff;
    background-color: #096dd9;
    border: 1px solid #096dd9;
    &:hover{
      background-color: #4049ff;
      border: 1px solid #4049ff;
    }
  }
  .lf-btn {
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    position: relative;
    cursor: pointer;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
  }
</style>
