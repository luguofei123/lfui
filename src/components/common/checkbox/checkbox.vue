<!-- 选择框 -->
<template>
  <label :class="['lf-checkbox', 'lf-checkbox--' + size, 'lf-checkbox--' + type, disabled ? 'is-disabled' : '']">
    <span class="lf-checkbox_input">
      <input type="checkbox" class="lf-checkbox_label" :value="label" :name="name" v-model="currentValue" />
    </span>
    <span class="lf-checkbox_label">
      <slot></slot>
      <!-- 如果没有传值，就把label作为文本显示 -->
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script lang="javascript">
export default {
  name: 'lf-checkbox',
  props: {
    type: {
      type: String,
      default: 'default' // button
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
      // default small large
    },
    label: {
      type: String,
      default: '0'
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tete: ''
    }
  },
  inject: {
    checkboxGroup: {
      default: ''
    }
  },
  computed: {
    // 如果用双向绑定一个计算属性，必须提供一个get和set;需要写成一个对象
    currentValue: {
      get() {
        // model的值是父组件传过来的value
        return this.isGroup ? this.checkboxGroup.value : this.value
      },
      set(value) {
        // 触发父组件给当前组件注册的input事件
        if (this.isGroup) {
          this.checkboxGroup.$emit('input', value)
          this.checkboxGroup.$emit('change', value)
        } else {
          this.$emit('input', value)
          this.$emit('change', value)
        }
      }
    },
    isGroup() {
      // 用于判断radio是否被radioGroup所包裹(使用2个感叹号，将其改为布尔值)
      return !!this.checkboxGroup
    }
  },
  methods: {}
}
</script>
<style lang="scss" src="./checkbox.scss"></style>
