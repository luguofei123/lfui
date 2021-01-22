<!--
 * @Author: sunch
 * @Date: 2020-12-24 13:48:47
 * @LastEditTime: 2020-12-30 15:17:13
 * @LastEditors: Please set LastEditors
 * @Description: 核算用的下拉组件，主要用于处理全局下拉模糊搜索模式，包含了UfSelect完整属性方法
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/HsSelect.vue
-->
<template>
  <uf-select :searchFilterModel="filterModel" v-model="hsValue" :options="options" :noborder="noborder"
  :size="size" :placeholder="placeholder" :allowClear="allowClear" :beforeIcon="beforeIcon" :afterIcon="afterIcon" 
  :disabled="disabled" :keyProp="keyProp" :labelProp="labelProp" :searchLabel="searchLabel" :dropdownClassName="dropdownClassName" :dropdownStyle="dropdownStyle" 
  @change="(arg) => { $emit('change', arg)}" @search="(arg) => { $emit('search', arg)}" @clear="(arg) => { $emit('clear', arg)}" 
  @valueChanged="(arg) => { $emit('valueChanged', arg)}"
  @clickBeforeIcon="(arg) => { $emit('clickBeforeIcon', arg)}" @clickAfterIcon="(arg) => { $emit('clickAfterIcon', arg)}">
    <template v-slot:beforeIcon>
      <slot name="beforeIcon"></slot>
    </template>
    <template v-slot:afterIcon>
      <slot name="afterIcon"></slot>
    </template>
  </uf-select>
</template>
<script>
import UfSelect from '@/components/common/UfSelect'
const SearchModels = ['filter', 'position']
export default {
  name: 'hs-select',
  props: {
    hsSearchFilterModel: {
      type: String,
      default: '',
    },
  },
  extends: { props: UfSelect.props },
  model: {
    prop: 'value',
    event: 'valueChanged'
  },
  data() {
    return {
      hsValue: '',
      filterModel: this.$store.getters.searchfilterModel,
    }
  },
  watch: {
    value: {
      handler(val) {
        this.hsValue = val
      },
      immediate: true,
    },
    hsSearchFilterModel: {
      handler(filterModel) {
        if (filterModel && SearchModels.some(item => item === filterModel)) {
          this.filterModel = filterModel
        } else {
          this.filterModel = this.$store.getters.searchfilterModel
        }
      },
      immediate: true,
    },
  },
}
</script>