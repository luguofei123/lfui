<!--
 * @Author: liuyyn
 * @Date: 2020-07-15 10:24:27
 * @LastEditTime: 2020-11-20 14:48:31
 * @LastEditors: Please set LastEditors
 * @Description: （未完成）多选按钮
 * @FilePath: 
-->
<template>
  <!-- 多选按钮 -->
  <div class="checkbox-group" :style="{ 'height': selectH + 'px' }">
    <span :class="['checkbox-wrapper', getTypeStr(type), item.checked ? 'checkbox-wrapper-checked' : '', disabled || item.disabled ? 'checkbox-wrapper-disabled' : '']"
      :style="{ 'height': selectH + 'px' }"
      v-for="item in checkList" :key="item.value" :value="item.value"
      @click="onChange(item)">
      <span :class="['checkbox', item.checked ? 'checkbox-checked' : '', 'checkbox-disabled']"
        :style="{ 'top': checkboxTop + 'px' }">
        <input type="checkbox" class="checkbox-input" :value="item.value" :disabled="item.disabled">
        <span class="checkbox-inner"></span>
      </span>
      <span class="checkbox-label" :style="{ 'height': selectH + 'px', 'line-height': selectH - 2 + 'px', 'font-size': fontSize + 'px', }">{{item.label}}</span>
    </span>
  </div>
</template>
<script>
const types = ['normal', 'button'];
export default {
  name: "uf-checkbox",
  props: {
    type: {
      type: String,
      default: 'normal',
    },
    size: {
      type: String,
      default: 'default',
    },
    half: {
      type: Boolean,
      default: true,
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
      checkList: [],
    }
  },
  created() {
    this.checkList = Object.assign({}, this.options);
    console.log(this.checkList)
  },
  mounted() {
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
    checkboxTop() {
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
      item.checked = !item.checked;
      this.$emit('click', item)
    },
    getTypeStr(type) {
      let classStr = 'checkbox-normal-wrapper';
      if (
        types.some((i) => {
          return i === type;
        })
      ) {
        classStr = 'checkbox-' + type + '-wrapper';
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
$base-disabled-color: #EEEEEE;
$btn-disabled-color: #CCCCCC;
$btn-border-color: #888888;

.checkbox-group {
  display: inline-block;
  vertical-align: middle;
  .checkbox-wrapper {
    display: inline-block;
    margin-left: 8px;
    .checkbox {
      cursor: pointer;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: $base-background-color;
      border: 1px solid $base-border-color;
      border-radius: 2px;
      box-sizing: border-box;
      position: relative;
      .checkbox-input {
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
    .checkbox-label {
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
  .checkbox-wrapper-checked {
    .checkbox-checked {
      border-color: $base-main-color;
      .checkbox-inner {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 14px;
        height: 14px;
        background-color: $base-main-color;
        &:after {
          box-sizing: content-box;
          content: "";
          height: 7px;
          width: 3px;
          border: 1px solid $base-background-color;
          border-left: 0;
          border-top: 0;
          position: absolute;
          left: 5px;
          top: 2px;
          transform: rotate(45deg) scaleY(1);
          transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
          transform-origin: center;
        }
      }
    }
  }
  // 禁止选择效果
  .checkbox-wrapper-disabled {
    .checkbox-disabled {
      cursor: not-allowed;
      .checkbox-inner {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 14px;
        height: 14px;
        background-color: $base-disabled-color;
        border-radius: 2px;
      }
      &:hover {
        border: 1px solid $base-border-color;
      }
    }
    .checkbox-checked {
      border-color: $base-border-color;
      .checkbox-inner {
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
          border-radius: 2px;
        }
      }
    }
    .checkbox-label {
      color: $base-border-color;
    }
  }
  // 按钮式
  .checkbox-button-wrapper {
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
    .checkbox {
      display: none;
    }
    .checkbox-label {
      padding: 0 6px;
      display: inline-block;
      width: 100%;
      text-align: center;
      font-family: AlibabaPuHuiTiR;
      color: $base-font-color;
    }
    // 选中效果
    &.checkbox-wrapper-checked {
      background: $base-main-color;
      border-color: $base-main-color;
      border-right-color: $base-background-color;
      .checkbox-label {
        color: $base-background-color;
      }
    }
    // 禁止选择
    &.checkbox-wrapper-disabled {
      cursor: not-allowed;
      border-color: $btn-disabled-color;
      .checkbox-label {
        color: $base-border-color;
      }
    }
    &.checkbox-wrapper-checked.checkbox-wrapper-disabled {
      background: $base-disabled-color;
      color: $base-border-color;
    }
  }
}
</style>
