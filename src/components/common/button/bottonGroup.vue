<template>
  <button
    type="button"
    :disabled="disabled"
    :class="['lf-btn', 'lf-btn-size-' + size, 'lf-btn-type-' + type, disabled ? 'lf-btn-disabled' : '']"
    @click="onClick"
  >
    <span class="text"><slot></slot></span>
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
  data   () {
    return {
      tete: ''
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.lf-btn,
.lf-btn:active,
.lf-btn:focus {
  outline: 0;
}
.lf-btn-type-default {
  color: #000;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  &:hover {
    color: #4049ff;
    border: 1px solid #4049ff;
  }
}
.lf-btn-type-default.lf-btn-disabled {
  color: #c0c4cc;
  background-color: #fff;
  border: 1px solid #ebeef5;
  cursor: not-allowed;
  &:hover {
    color: #c0c4cc;
    background-color: #fff;
    border: 1px solid #ebeef5;
  }
}
.lf-btn-type-primary {
  color: #fff;
  background-color: #096dd9;
  border: 1px solid #096dd9;
  &:hover {
    background-color: #4049ff;
    border: 1px solid #4049ff;
  }
}
.lf-btn-type-primary.lf-btn-disabled {
  color: #fff;
  background-color: #a0cfff;
  border: 1px solid #a0cfff;
  cursor: not-allowed;
  &:hover {
    color: #fff;
    background-color: #a0cfff;
    border: 1px solid #a0cfff;
  }
}
.lf-btn-size-large {
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  line-height: 32px;
}
.lf-btn-size-default {
  height: 28px;
  padding: 0 12px;
  font-size: 13px;
  line-height: 28px;
}
.lf-btn-size-small {
  height: 24px;
  padding: 0 10px;
  font-size: 12px;
  line-height: 24px;
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
  border-radius: 4px;
}
</style>
