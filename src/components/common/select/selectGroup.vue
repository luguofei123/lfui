<template>
  <div class="lf-radio-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'lf-radio-group',
  provide() {
    return {
      RadioGroup: this
    }
  },
  props: {
    value: null
  }
}
</script>
<style lang="scss" src="./radioGroup.scss"></style>
