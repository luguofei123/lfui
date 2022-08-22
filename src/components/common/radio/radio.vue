<template>
  <label class="lf-radio" :class="{ 'is-checked1111': label == value }">
    <span class="lf-radio_input">
      <input type="radio" class="lf-radio_label" :value="label" :name="name" v-model="model" />
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
      default: 'radio'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
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
  computed: {
    // 如果用双向绑定一个计算属性，必须提供一个get和set;需要写成一个对象
    model: {
      get() {
        // model的值是父组件传过来的value
        return this.value
      },
      set(value) {
        debugger
        // 触发父组件给当前组件注册的input事件
        this.$emit('input', value)
        this.$emit('change', value)
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" src="./radio.scss"></style>
