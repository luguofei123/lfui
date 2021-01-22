<!--
 * @Author: sunch
 * @Date: 2020-12-08 10:50:08
 * @LastEditTime: 2020-12-08 16:02:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfSearch.vue
-->
<template>
  <uf-input v-model="inputValue" icon="icon-search" @input="(val) => { this.$emit('input', val) }" @focus="(e) => { this.$emit('focus', e) }" @blur="(e) => { this.$emit('blur', e) }" @keyup="onKeyup"></uf-input>
</template>
<script>
export default {
  name: 'uf-search',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      inputValue: this.value ? this.value : '',
    }
  },
  watch: {
    value: {
      handler(val) {
        // console.log(val)
        this.inputValue = val
      },
      immediate: true,
    }
  },
  methods: {
    onKeyup(e) {
      console.log(e.keyCode)
      if (e.keyCode === 13) {
        this.$emit('search', this.value)
      }
    },
  },
}
</script>
<style></style>
