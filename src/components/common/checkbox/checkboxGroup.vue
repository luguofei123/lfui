<template>
  <div class="lf-radio-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'lf-checkbox-group',
  provide() {
    return {
      checkboxGroup: this
    }
  },
  props: {
    value: null
  }
}
</script>
<style lang="scss" src="./checkbox.scss"></style>
