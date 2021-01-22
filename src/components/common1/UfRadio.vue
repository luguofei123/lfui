<!--
 * @Author: liuyyn
 * @Date: 2020-07-15 10:24:27
 * @LastEditTime: 2020-11-20 14:48:31
 * @LastEditors: Please set LastEditors
 * @Description: （未完成）单选按钮
 * @FilePath: 
-->
<template>
  <!-- 单选按钮 -->
  <div class="radio-group" :style="{ 'height': selectH + 'px' }">
    <span :class="['radio-wrapper', getTypeStr(type), item.value == radioValue ? 'radio-wrapper-checked' : '', disabled || item.disabled ? 'radio-wrapper-disabled' : '']"
      :style="{ 'height': selectH + 'px' }"
      v-for="item in options" :key="item.value" :value="item.value"
      @click="onChange(item)">
      <span :class="['radio', item.value == radioValue ? 'radio-checked' : '', 'radio-disabled']"
        :style="{ 'top': radioTop + 'px' }">
        <input type="radio" class="radio-input" :value="item.value" :disabled="item.disabled">
        <span class="radio-inner"></span>
      </span>
      <span class="radio-label" :style="{ 'height': selectH + 'px', 'line-height': selectH - 2 + 'px', 'font-size': fontSize + 'px', }">{{item.label}}</span>
    </span>
  </div>
</template>
<script>
/* 说明：
    1. type: 按钮类型(radio式和按钮式) 参数normal/button 可选
    2. size: 按钮尺寸 参数default/small/large 可选
             radio式控制：行高、字号
             按钮式控制：行高、字号、按钮整体高度
    3. 因内容不限 组件宽度不可设置
    4. 按钮式没有无边框的样式，插入表格插槽时可用radio样式
    5. disabled: 控制整组是否禁止选择 可选
    5. options: 主要属性 选项 label内容、value值、disabled此项是否禁止选择
*/
const types = ['normal', 'button']
export default {
  name: "uf-radio",
  props: {
    type: {
      type: String,
      default: 'normal',
    },
    size: {
      type: String,
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
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
      radioValue: 1
    }
  },
  mounted() {
    this.radioValue = this.options[0].value;
  },
  computed: {
    selectH() {
      let h = 30;
      switch (this.size) {
        case 'small':
          h = 24;
          break
        case 'large':
          h = 40;
          break
        default:
          h = 30;
      }
      return h;
    },
    radioTop() {
      let t = -8;
      switch (this.size) {
        case 'small':
          t = -5;
          break
        case 'large':
          t = -12;
          break
        default:
          t = -8;
      }
      return t;
    },
    fontSize() {
      let s = 14;
      switch (this.size) {
        case 'small':
          s = 12;
          break
        case 'large':
          s = 16;
          break
        default:
          s = 14;
      }
      return s;
    },
  },
  methods: {
    onChange(item) {
      if (this.disabled || item.disabled) return;
      this.radioValue = item.value;
      this.$emit('click', item)
    },
    getTypeStr(type) {
      let classStr = 'radio-normal-wrapper';
      if (
        types.some((i) => {
          return i === type;
        })
      ) {
        classStr = 'radio-' + type + '-wrapper';
      }
      return classStr;
    },
  },
}
</script>
<style lang="scss" scoped>
$base-main-color: #0066FF;
$base-background-color: #FFFFFF;
$base-border-color: #AAAAAA;
$base-font-color: #333333;
$base-select-color: #1890ff;
$base-disabled-color: #EEEEEE;
$btn-disabled-color: #CCCCCC;
$btn-border-color: #888888;

.radio-group {
  display: inline-block;
  vertical-align: middle;
  .radio-wrapper {
    display: inline-block;
    margin-left: 8px;
    .radio {
      cursor: pointer;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: $base-background-color;
      border: 1px solid $base-border-color;
      border-radius: 100%;
      box-sizing: border-box;
      position: relative;
      .radio-input {
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
      }
      &:hover {
        border: 1px solid $base-main-color;
      }
    }
    .radio-label {
      display: inline-block;
      box-sizing: border-box;
      max-width: 140px;
      height: 15px;
      padding-left: 8px;
      font-family: AlibabaPuHuiTiR;
      color: $base-font-color;
      line-height: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  // 选中效果
  .radio-wrapper-checked {
    .radio-checked {
      border-color: $base-select-color;
      .radio-inner {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 14px;
        height: 14px;
        background-color: $base-background-color;
        border-radius: 100%;
        &:after {
          content: " ";
          display: block;
          width: 10px;
          height: 10px;
          position: absolute;
          top: 2px;
          left: 2px;
          background-color: $base-select-color;
          border-top: 0;
          border-left: 0;
          border-radius: 8px;
        }
      }
    }
  }
  // 禁止选择效果
  .radio-wrapper-disabled {
    .radio-disabled {
      cursor: not-allowed;
      .radio-inner {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 14px;
        height: 14px;
        background-color: $base-disabled-color;
        border-radius: 100%;
      }
      &:hover {
        border: 1px solid $base-border-color;
      }
    }
    .radio-checked {
      border-color: $base-border-color;
      .radio-inner {
        &:after {
          content: " ";
          display: block;
          width: 10px;
          height: 10px;
          position: absolute;
          top: 2px;
          left: 2px;
          background-color: $base-border-color;
          border-top: 0;
          border-left: 0;
          border-radius: 100%;
        }
      }
    }
  }
  // 按钮式
  .radio-button-wrapper {
    cursor: pointer;
    margin-left: 0;
    display: inline-block;
    width: 70px;
    background: $base-background-color;
    border-right: 1px solid $btn-border-color;
    border-top: 1px solid $btn-border-color;
    border-bottom: 1px solid $btn-border-color;
    box-sizing: border-box;
    &:first-child {
      border-left: 1px solid $btn-border-color;
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0px 4px 4px 0px;
    }
    .radio {
      display: none;
    }
    .radio-label {
      padding: 0 6px;
      display: inline-block;
      width: 100%;
      text-align: center;
      font-family: AlibabaPuHuiTiR;
      color: $base-font-color;
    }
    // 选中效果
    &.radio-wrapper-checked {
      background: $base-main-color;
      border-color: $base-main-color;
      .radio-label {
        color: $base-background-color;
      }
    }
    // 禁止选择
    &.radio-wrapper-disabled {
      cursor: not-allowed;
      border-color: $btn-disabled-color;
      .radio-label {
        color: $base-border-color;
      }
    }
    &.radio-wrapper-checked.radio-wrapper-disabled {
      background: $base-disabled-color;
    }
  }
}
</style>
