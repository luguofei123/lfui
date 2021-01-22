<!--
 * @Author: your name
 * @Date: 2020-12-16 13:56:37
 * @LastEditTime: 2020-12-17 15:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfSwitch.vue
-->

<template>
  <div
    class="uf-switch"
    :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
    role="switch"
    :aria-checked="checked"
    :aria-disabled="switchDisabled"
    @click.prevent="switchValue"
    :style="{ 'width': coreWidth + 'px'}"
  >
  <!-- ,'border':checked? activeColor :inactiveColor,'background':checked? activeColor :inactiveColor -->
    <input
      class="uf-switch__input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :id="id"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @keydown.enter="switchValue"
      @focus="onFocus"
    >
    <span
      :class="['uf-switch__label', 'uf-switch__label--left', checked ? 'is-active' : '']"
      v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText && checked" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
    <span
      :class="['uf-switch__label', 'uf-switch__label--right', !checked ? 'is-active' : '']"
      v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText && !checked" :aria-hidden="!checked">{{ inactiveText }}</span>
    </span>
    <span class="uf-switch__core" ref="core" :style="{ 'width': coreWidth + 'px'}">
    </span>
  </div>
</template>
<script>
  // import emitter from 'element-ui/src/mixins/emitter';
  // import Focus from 'element-ui/src/mixins/focus';
  // import Migrating from 'element-ui/src/mixins/migrating';
  export default {
    name: 'UfSwitch',
    // mixins: [Focus('input'), Migrating, emitter],
    // inject: {
    //   elForm: {
    //     default: ''
    //   }
    // },
    props: {
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 40
      },
      activeIconClass: {
        type: String,
        default: ''
      },
      inactiveIconClass: {
        type: String,
        default: ''
      },
      activeText: String,
      inactiveText: String,
      activeColor: {
        type: String,
        default: ''
      },
      inactiveColor: {
        type: String,
        default: ''
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      },
      name: {
        type: String,
        default: ''
      },
      // validateEvent: {
      //   type: Boolean,
      //   default: true
      // },
      id: String
    },
    data() {
      return {
        coreWidth: this.width,
        focus: false,
      };
    },
    created() {
      if (!~[this.activeValue, this.inactiveValue].indexOf(this.value)) {
        this.$emit('input', this.inactiveValue);
      }
    },
    computed: {
      checked() {
        return this.value === this.activeValue;
      },
      switchDisabled() {
        return this.disabled;
      }
    },
    watch: {
      checked() {
        this.$refs.input.checked = this.checked;
        if (this.activeColor || this.inactiveColor) {
          this.setBackgroundColor();
        }
        // if (this.validateEvent) {
        //   this.dispatch('ElFormItem', 'el.form.change', [this.value]);
        // }
      }
    },
    methods: {
      handleChange(event) {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', val);
        this.$emit('change', val);
        this.$nextTick(() => {
          // set input's checked property
          // in case parent refuses to change component's value
          this.$refs.input.checked = this.checked;
        });
      },
      setBackgroundColor() {
        let newColor = this.checked ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = newColor;
        this.$refs.core.style.backgroundColor = newColor;
      },
      switchValue() {
        !this.switchDisabled && this.handleChange();
      },
      onFocus(e) {
        this.focus = true
        this.$emit('focus', e)
      },
    },
    mounted() {
      /* istanbul ignore if */
      this.coreWidth = this.width || 44;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      this.$refs.input.checked = this.checked;
    }
  };
</script>
<style lang="scss" scoped>

.uf-switch{
  width:44px;
  height:24px;
  display:inline-flex;
  align-items:center;
  position:relative;
  font-size:14px;
  line-height:24px;
  vertical-align: middle;
  background:#ccc;
  .uf-switch__input{
    position:absolute;
    width:0;
    height:0;
    opacity:0;
    margin:0;
  }
  .uf-switch__label{
    display:none;
    position:absolute;
    top:0;
    font-size:12px;
    color: #fff;
    z-index:2;
  }
  .uf-switch__label--left{
    left:4px;
  }
  .uf-switch__label--right{
    right:4px;
  }
  .is-active{
    display:inline-block;
    transition:all .3s;
  }
}

.uf-switch__core{
  margin:0;
  display:inline-block;
  position:relative;
  width:44px;
  height:24px;
  border:1px solid #ccc;
  background:#ccc;
  outline:none;
  border-radius:2px;
  box-sizing:border-box;
  cursor:pointer;
  transition:border-color .3s,background-color .3s;
  vertical-align:middle;
}

.uf-switch__core::after{
  content:'';
  position: absolute;
  top:1px;
  left:1px;
  border-radius:2px;
  transition:all .3s;
  width:20px;
  height:20px;
  background:#fff;
  z-index:2;
}


.uf-switch.is-checked .uf-switch__core{
  border:solid 1px #0066ff;
  background-color:#0066ff;
}
.uf-switch.is-checked .uf-switch__core:after{
  left:100%;
  margin-left:-21px;
}
.uf-switch.is-disabled .uf-switch__core, .uf-switch.is-disabled .uf-switch__label{
  cursor:not-allowed;
}
.uf-switch.is-disabled{
  opacity: .6;
}
</style>