<template>
  <button type="button" :disabled="disabled" :class="['lf-button', 'lf-button--' + size, 'lf-button--' + type, disabled ? 'is-disabled' : '']" @click="onClick">
    <i class="iconloading" v-if="loading"></i>
    <i :class="['iconfont', icon]" v-if="icon && !loading"></i>
    <span class="text" v-if="$slots.default"><slot></slot></span>
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
<style lang="scss" src="./button.scss"></style>
