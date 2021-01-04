<!--
 * @Author: sunch
 * @Date: 2020-12-21 14:07:58
 * @LastEditTime: 2020-12-21 16:31:31
 * @LastEditors: Please set LastEditors
 * @Description: 表单项的包装组件包含表单校验的提示
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfFormItem.vue
-->
<template>
  <div>
    <uf-label align="right" ref="label" style="width: 80px">{{ label }}：</uf-label>
    <slot></slot>
    <p class="error-message" :style="{ 'margin-left': errorMarginLeft + 'px' }">
      <span v-if="error">{{ error }}</span>
    </p>
  </div>
</template>
<script>
import Schema from 'async-validator' // 校验包
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      error: '',
      errorMarginLeft: 120,
    }
  },
  mounted() {
    this.errorMarginLeft = this.$refs.label.$el.offsetWidth
    this.$on('valid', () => {
      this.validate()
    })
  },
  methods: {
    /**
     * @description: 返回Promise
     */

    validate() {
      if (!this.form.rules || !this.form.rules instanceof Object) {
        return Promise.reject('表单内没有校验规则')
      }
      const rules = this.form.rules[this.prop]
      const value = this.form.model[this.prop]
      if (rules) {
        const schema = new Schema({ [this.prop]: rules })
        return schema.validate({ [this.prop]: value }).catch((error) => {
          this.error = error.errors[0].message
          return Promise.reject(error)
        })
      } else {
        return Promise.resolve(true)
      }
    },
  },
}
</script>
<style>
.error-message {
  margin: 0;
  margin-left: 120px;
  height: 20px;
  font-size: 12px;
  line-height: 12px;
  color: #cc0000;
  padding-top: 5px;
  padding-bottom: 3px;
}
</style>
