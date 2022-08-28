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
      default: 'default'
      // default, primary, dashed, danger, link
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'samll'
      // default small large
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
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
<style lang="scss" src="./checkbox.scss"></style>
