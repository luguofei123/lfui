<template>
  <div class="lf-select-dropdown lf-popper" :class="[{ 'is-multiple': $parent.multiple }, popperClass]" :style="{ minWidth: minWidth }">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
import Popper from '../utils/vue-popper'

export default {
  name: 'LfSelectDropdown',

  componentName: 'LfSelectDropdown',

  mixins: [Popper],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    popperOptions: {
      default() {
        return {
          gpuAcceleration: false
        }
      }
    },

    visibleArrow: {
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      minWidth: ''
    }
  },

  computed: {
    popperClass() {
      return this.$parent.popperClass
    }
  },

  watch: {
    '$parent.inputWidth'() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px'
    }
  },

  mounted() {
    this.referenceElm = this.$parent.$refs.reference.$el
    debugger
    this.$parent.popperElm = this.popperElm = this.$el
    this.$on('updatePopper', () => {
      debugger
      if (this.$parent.visible) this.updatePopper()
    })
    this.$on('destroyPopper', this.destroyPopper)
  }
}
</script>
