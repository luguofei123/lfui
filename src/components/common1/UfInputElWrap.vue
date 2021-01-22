<!--
 * @Author: sunch
 * @Date: 2020-12-18 10:16:00
 * @LastEditTime: 2020-12-24 15:12:26
 * @LastEditors: Please set LastEditors
 * @Description: Input框类型的表单元素的包装 组件
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfInputElWrap.vue
-->
<template>
  <div
    class="uf-input-el-wrap"
    :class="[
      focus ? 'active' : '',
      noborder ? 'noborder' : '',
      size,
      disabled ? 'disabled' : '',
      inputValue && allowClear ? 'allowClear' : '',
      hasBeforeIconSlot ? 'hasBeforeIconSlot' : '',
      hasAfterIconSlot ? 'hasAfterIconSlot' : '',
    ]"
    @click="$emit('click', $event)"
  >
    <div class="uf-input-el-before-icons-wrap" ref="beforeIconSlotWrap" @click="$emit('clickBeforeIcon')">
      <slot name="beforeIcon">
        <div v-if="beforeIcon" class="icon icon-wrap">
          <i :class="beforeIcon"></i>
        </div>
      </slot>
    </div>

    <slot></slot>

    <div class="uf-input-el-after-icons-wrap">
      <div class="icon clear-wrap" v-if="allowClear && inputValue">
        <i class="icon-cross-circle clear" @click="$emit('clear')"></i>
      </div>
      <div class="uf-input-el-after-icon-slot-wrap" ref="afterIconSlotWrap" @click="$emit('clickAfterIcon')">
        <slot name="afterIcon">
          <div v-if="afterIcon" class="icon icon-wrap">
            <i :class="afterIcon"></i>
          </div>
          <div v-else-if="select" class="icon icon-wrap">
            <i class="uf-select-arrow icon-angle-bottom" :class="focus ? 'uf-transTop' : ''"></i>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'uf-input-el-wrap',
  props: {
    inputValue: {
      type: String,
      default: '',
    },
    select: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    noborder: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    beforeIcon: {
      type: String,
      default: '',
    },
    afterIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hasBeforeIconSlot: false,
      hasAfterIconSlot: false,
    }
  },
  methods: {
    onInputElFocus(){}
  },
  watch: {
    $refs: {
      handler(refs) {
        this.$nextTick(() => {
          if (refs.beforeIconSlotWrap) {
            const el = refs.beforeIconSlotWrap
            if (el.innerHTML && el.innerHTML != '<!---->') {
              this.hasBeforeIconSlot = true
            } else {
              this.hasBeforeIconSlot = false
            }
          }
          if (refs.afterIconSlotWrap) {
            const el = refs.afterIconSlotWrap
            if (el.innerHTML && el.innerHTML != '<!---->') {
              this.hasAfterIconSlot = true
            } else {
              this.hasAfterIconSlot = false
            }
          }
        })
      },
      immediate: true,
    },
  },
}
</script>
