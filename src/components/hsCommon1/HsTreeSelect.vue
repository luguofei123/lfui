<!--
 * @Author: sunch
 * @Date: 2020-12-17 13:57:42
 * @LastEditTime: 2020-12-31 11:49:46
 * @LastEditors: Please set LastEditors
 * @Description: 核算用的下拉树组件，主要用于处理全局下拉模糊搜索模式，包含了UfTreeSelect完整属性方法
 * @FilePath: /agla-fe-8.50/vuedev/src/components/common/HsTreeSelect.vue
-->
<template>
  <uf-tree-select :searchFilterModel="filterModel" v-model="hsValue" :treeData="treeData" :noborder="noborder"
  :size="size" :checkable="checkable" :placeholder="placeholder" :allowClear="allowClear" 
  :beforeIcon="beforeIcon" :afterIcon="afterIcon" :disabled="disabled" 
  :keyProp="keyProp" :labelProp="labelProp" :parentKeyProp="parentKeyProp" :searchLabel="searchLabel" 
  :searchLabelProp="searchLabelProp" :dropdownClassName="dropdownClassName" :dropdownStyle="dropdownStyle" 
  :parentNodeSelectDisabled="parentNodeSelectDisabled" :treeDefaultExpandAll="treeDefaultExpandAll" 
  :maxTagCount="maxTagCount" :noGetParentChecked="noGetParentChecked" @change="(arg) => { $emit('change', arg)}" 
  @search="(arg) => { $emit('search', arg)}" @clear="(arg) => { $emit('clear', arg)}" 
  @valueChanged="(arg) => { $emit('valueChanged', arg)}"
  @clickBeforeIcon="(arg) => { $emit('clickBeforeIcon', arg)}" @clickAfterIcon="(arg) => { $emit('clickAfterIcon', arg)}">
    <template v-slot:beforeIcon>
      <slot name="beforeIcon"></slot>
    </template>
    <template v-slot:afterIcon>
      <slot name="afterIcon"></slot>
    </template>
  </uf-tree-select>
</template>
<script>
import UfTreeSelect from '@/components/common/UfTreeSelect'
const SearchModels = ['filter', 'position']
export default {
  name: 'hs-tree-select',
  props: {
    hsSearchFilterModel: {
      type: String,
      default: '',
    },
  },
  extends: { props: UfTreeSelect.props },
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
//   mounted() {
//     console.log('核算下拉树模糊搜索模式：',this.filterModel)
//   },
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
