<template>
  <label :class="['lf-radio', 'lf-radio--' + size, 'lf-radio--' + type, disabled ? 'is-disabled' : '', type === 'button' ? 'lf-radio-button' : '']">
    <span class="lf-radio_input">
      <input type="radio" class="lf-radio_label" :value="label" :name="name" v-model="currentValue" />
    </span>
    <span class="lf-radio_label">
      <slot></slot>
      <!-- 如果没有传值，就把label作为文本显示 -->
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script lang="javascript">
export default {
  name: 'lf-radio',
  props: {
    type: {
      type: String,
      default: 'radio' // button
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
    }
  },
  data() {
    return {}
  },
  inject: {
    RadioGroup: {
      default: ''
    }
  },
  computed: {
    // 如果用双向绑定一个计算属性，必须提供一个get和set;需要写成一个对象
    currentValue: {
      get() {
        // model的值是父组件传过来的value
        return this.isGroup ? this.RadioGroup.value : this.value
      },
      set(value) {
        // 触发父组件给当前组件注册的input事件
        if (this.isGroup) {
          this.RadioGroup.$emit('input', value)
          this.RadioGroup.$emit('change', value)
        } else {
          this.$emit('input', value)
          this.$emit('change', value)
        }
      }
    },
    isGroup() {
      // 用于判断radio是否被radioGroup所包裹(使用2个感叹号，将其改为布尔值)
      return !!this.RadioGroup
    }
  },
  methods: {}
}
</script>
<style lang="scss" src="./radio.scss"></style>
