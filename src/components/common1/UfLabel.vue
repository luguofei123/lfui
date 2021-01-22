<!--
 * @Author: sunch
 * @Date: 2020-12-09 14:21:12
 * @LastEditTime: 2020-12-21 14:24:37
 * @LastEditors: Please set LastEditors
 * @Description: 表单的label
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfLabel.vue
-->
<template>
  <label v-tooltip="content" class="uf-label" :class="[align === 'left' ? 'align-left' : 'align-right']" :for="forId">
    <span class="labelText" ref="labelText" :style="{ width: labelTextWidth }"><slot></slot></span><span v-if="tag1 || tag2" style="margin-left: -6px;display:inline-block;width: 10px;
  vertical-align: middle;">：</span>
  </label>
</template>
<script>
export default {
  name: 'uf-label',
  props: {
    align: {
      type: String,
      default: 'left',
    },
    width: {
      type: [String, Number],
      default: () => {
        return 'auto'
      },
    },
    forId: {
      type: String,
      default: '',
    },
    overflowEllipsis: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    // console.log(this.$refs.label.$el.offsetWidth)
    // console.log(this.$refs.overlabel.$el.scrollWidth)
    let $refs = this.$refs
    return {
      $refs,
      content: '',
    }
  },
  computed: {
    tag1() {
      let ind1 = this.content.indexOf(':')
      if (ind1 > -1 && ind1 === this.content.length - 1) {
        return true
      } else {
        return false
      }
    },
    tag2() {
      let ind2 = this.content.indexOf('：')
      if (ind2 > -1 && ind2 === this.content.length - 1) {
        return true
      } else {
        return false
      }
    },
    labelTextWidth() {
      if (this.width === 'auto') {
        return this.width
      } else {
        if ((this.tag1 || this.tag2) && parseInt(this.width) > 10) {
          return `${parseInt(this.width) - 10}px`
        } else {
          return this.width + 'px'
        }
      }
    },
  },
  mounted() {},
  watch: {
    $refs: {
      handler(refs) {
        this.$nextTick(() => {
          if (refs.labelText) {
            const labelEl = refs.labelText
            this.content = this.overflowEllipsis && labelEl.scrollWidth > labelEl.offsetWidth ? labelEl.innerHTML : ''
          }
        })
      },
      immediate: true,
    },
  },
}
</script>
<style>
.uf-label {
  display: inline-block;
  width: 120px;
  line-height: 32px;
  height: 32px;
  vertical-align: middle;
}
.uf-label.align-left {
  text-align: left;
}
.uf-label.align-right {
  text-align: right;
}
.labelText {
  display: inline-block;
  min-width: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
