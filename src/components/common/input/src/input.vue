<template>
  <input type="text" @focus="$emit('handleFocus')" />
</template>
<script lang="javascript">
export default {
  name: 'lf-input',
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

