<!--
 * @Author: sunch
 * @Date: 2020-12-09 09:47:42
 * @LastEditTime: 2020-12-21 15:45:12
 * @LastEditors: Please set LastEditors
 * @Description: 表单及序列化
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/UfForm.vue
-->
<template>
  <div class="uf-form" ref="form">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'uf-form',
  props: {
    model: {
      type: Object,
      reuqired: true,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      formData: {},
    }
  },
  provide() {
    return {
      form: this,
    }
  },
  watch: {
    model: {
      handler(data) {
        if (data && data instanceof Object) {
          this.formData = data
        }
      },
      immediate: true,
    },
  },
  methods: {
    getFormData() {
      return this.formData
    },
    async validate() {
      const checkRes = this.$children.filter((item) => item.prop).map((item) => item.validate())
      return Promise.all(checkRes)
        .then(() => {
          return { flag: true }
        })
        .catch((error) => {
          if(error && typeof(error) === 'string'){
            return Promise.reject({ flag: false, message: error })
          }else{
            let { errors } = error
            return Promise.reject({ flag: false, field: errors[0].field, message: errors[0].message })
          }
        })
    },
  },
}
</script>
<style></style>
