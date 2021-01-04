<!--
 * @Author: sunch
 * @Date: 2020-05-15 11:20:10
 * @LastEditTime: 2021-01-04 16:22:05
 * @LastEditors: Please set LastEditors
 * @Description: 自定义下拉框
 * @FilePath: /src/components/common/UfTreeSelect.vue
 -->
<template>
  <uf-input-el-wrap
    ref="ufTree"
    v-clickout="clickOutHandler"
    :focus="focus" 
    :select="showArrow"
    :noborder="noborder"
    :size="size"
    :inputValue="searchText"
    :allowClear="allowClear"
    :disabled="disabled"
    :beforeIcon="beforeIcon"
    :afterIcon="afterIcon"
    @click="onClickInput"
    @clear="searchClear"
    @clickBeforeIcon="$emit('clickBeforeIcon')"
    @clickAfterIcon="$emit('clickAfterIcon')"
  >
    <template v-slot:beforeIcon>
      <slot name="beforeIcon"></slot>
    </template>
    <template v-slot:afterIcon>
      <slot name="afterIcon"></slot>
    </template>
    <div style="width: 100%;height: 100%;display: flex;">
      <input type="text" ref="selectSearch" v-model="searchText" :disabled="disabled" @keyup="onSearchKeyUp" @focus="searchFocus($event)" :placeholder="placeholder" />
    </div>

    <transition name="myfade">
      <div class="ufSelectOptionsWrap" ref="optionsWrap" v-show="treeVisible" :class="dropdownClassName" :style="dropdownStyle" @click.stop>
        <slot>
          <uf-option :class="item.highlight?'selectItemHighlight':''" v-for="(item, index) in (searchFilterModel==='filter'?filterTreeData:selectOptions)" :key="item[keyProp]" :value="item[keyProp]" @click.stop="onOptionClick(item, index, $event)">
            {{ item[labelProp] }}
          </uf-option>
        </slot>
      </div>
    </transition>
  </uf-input-el-wrap>
</template>
<script>
import UfInputElWrap from './UfInputElWrap'
export default {
  name: 'uf-select',
  components: {
    'uf-input-el-wrap': UfInputElWrap,
  },
  props: {
    value: {
      //选中或勾选的内容
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
    noborder: {
      //是否无边框
      type: Boolean,
      default: false,
    },
    size: {
      //尺寸
      type: String,
      default: '',
    },
    placeholder: {
      //选择框默认文字
      type: String,
      default: '',
    },
    allowClear: {
      //是否带有清除按钮
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
    showArrow: {
      type: Boolean,
      default: true
    },
    disabled: {
      //是否禁用
      type: Boolean,
      default: false,
    },
    keyProp: {
      //数据中的key的属性
      type: String,
      default: 'value',
    },
    labelProp: {
      //数据中的用于展示的属性
      type: String,
      default: 'label',
    },
    searchFilterModel: {
      //模糊搜索模式 position：定位模式 filter：过滤模式 默认为定位模式
      type: String,
      default: 'position',
    },
    searchLabel: {
      //用于模糊搜索的属性范围 ['code','name']
      type: [Array, String],
      default: () => [],
    },
    dropdownClassName: {
      //下拉列表的样式名
      type: [String, Array],
      default: '',
    },
    dropdownStyle: {
      //下拉菜单的样式
      type: Object,
      default: () => {},
    },
    maxTagCount: {
      //多选时的最多展示数量
      type: Number,
      default: 0,
    },
    optionDisabledProp: {
      type: String,
      default: 'disabled',
    },
  },
  model: {
    prop: 'value',
    event: 'valueChanged',
  },
  data() {
    return {
      selectOptions: [], //
      searchText: '', //搜索的内容
      focus: false,
      searchNodeCode: '', //使用搜索筛选出的code
      treeVisible: false, //控制下拉列表的隐藏显示
      searchLoading: false, //搜索的loading
      searchResult: [], //搜索结果
      keyCur: 0, //搜索按回车定位的搜索结果下标
    }
  },
  computed: {
    selfSearchLabels() {
      const warnTip = '注意：如果指定了“searchFilterModel”为“filter”，应该指定搜索数据的属性范围“searchLabel”，否则默认按照[keyProp]（默认为codeName）属性过滤，可能显示不出期望的结果！'
      if (this.searchLabel) {
        if (this.searchLabel instanceof Array) {
          if (this.searchLabel.length > 0) {
            return this.searchLabel
          } else {
            if (this.searchFilterModel === 'filter') console.warn(warnTip)
            return [this.labelProp]
          }
        } else {
          return [this.searchLabel]
        }
      } else {
        if (this.searchFilterModel === 'filter') console.warn(warnTip)
        return [this.labelProp]
      }
    },
    filterTreeData() {
      let rest = []
      if (this.selectOptions && this.selectOptions.length > 0 && this.searchText) {
        console.log(this.selfSearchLabels)
        this.selfSearchLabels.forEach((prop) => {
          let arr = this.selectOptions.filter((item) => {
            return item[prop] && item[prop].indexOf(this.searchText) > -1
          })
          rest = rest.concat(arr)
        })
        this.searchResult = rest
        if (this.searchResult.length > 0) {
          this.$nextTick(() => {
            this.searchNodeCode = this.searchResult[0][this.keyProp]
          })
        } else {
          this.searchNodeCode = ''
        }
      } else {
        rest = this.selectOptions
      }
      return rest
    },
  },
  watch: {
    /**
     * @description: 搜索框内容变化
     */
    searchText(val) {
      this.$emit('search', val)
      if (this.searchFilterModel === 'filter') return
      //只做模糊搜索为：定位模式 的处理
      if (val) {
        let rest = []
        this.selfSearchLabels.forEach((prop) => {
          let arr = this.options.filter((item) => {
            return item[prop].indexOf(val) > -1
          })
          rest = rest.concat(arr)
        })
        this.searchResult = rest
        if (this.searchResult.length > 0) {
          this.searchNodeCode = this.searchResult[0][this.keyProp]
          console.log(this.searchNodeCode)
        } else {
          this.searchNodeCode = ''
        }
      } else {
        this.searchNodeCode = ''
      }
      this.searchChanged()
    },
    /**
     * @description: value变化
     */
    value: {
      handler(newVal) {
        if (newVal) {
          let rest = this.options.filter((item) => item[this.keyProp] === newVal)
          if (rest.length > 0) this.searchText = rest[0][this.labelProp]
        } else {
          this.searchText = ''
        }
      },
      immediate: true,
    },
    options: {
      handler(list) {
        if (list&&list.length > 0) {
          this.selectOptions = this.options.map(item => { return { highlight: false, ...item } })
          this.searchChanged()
        } else {
          this.searchText = ''
        }
      },
      immediate: true,
    },
  },
  methods: {
    searchChanged() {
      console.log(this.selectOptions)
      if (this.selectOptions.length > 0) {
        let curIndex = 0
        this.selectOptions.forEach((item, index) => {
          if(item[this.keyProp] === this.searchNodeCode){
            item.highlight = true
            curIndex = index
          }else{
            item.highlight = false
          }
        })
        let el = this.$refs.optionsWrap
        this.$(el).scrollTop(curIndex * 22 + 5)
      }
    },
    onOptionClick(item, index, e) {
      if (!this.disabled) {
        this.treeVisible = false
        this.$emit('valueChanged', item[this.keyProp])
        this.$emit('select', item, index, e)
        this.$emit('change', item, index, e)
      }
    },
    clickOutHandler() {
      this.treeVisible = false
      this.focus = false
    },
    onSearchKeyUp(e) {
      if (this.disabled) return
      if (e.keyCode === 13) {
        //如果按回车键
        ++this.keyCur
        if (this.searchResult.length === 0) {
          this.keyCur = 0
          this.$message.info('最后1个')
        } else if (this.keyCur > this.searchResult.length - 1) {
          this.keyCur = 0
          this.$message.info('第1个')
        } else if (this.keyCur === this.searchResult.length - 1) {
          this.$message.info(`最后1个`)
        } else {
          this.$message.info(`第${this.keyCur + 1}个`)
        }
        this.searchNodeCode = this.searchResult[this.keyCur][this.keyProp]
      }
    },
    /**
     * @description: 点击了
     */
    onClickInput() {
      if (this.disabled) return
      this.treeVisible = true
      this.focus = true
      this.$refs.selectSearch.focus()
    },
    searchFocus(event) {
      if (this.disabled) return
      event.currentTarget.select()
      this.treeVisible = true
    },
    onClick(...arg) {
      this.treeVisible = false
      if (arg[2][this.keyProp]) {
        this.searchText = arg[2][this.labelProp]
        this.$emit('valueChanged', arg[2][this.keyProp])
        this.$emit('change', {
          title: arg[2][this.labelProp],
          value: arg[2][this.keyProp],
          node: arg[2],
        })
      } else {
        this.searchText = ''
        this.$emit('valueChanged', '')
        this.$emit('change', {
          title: '',
          value: '',
        })
      }
    },
    onSelect(node) {
      this.treeVisible = false
      if (node) {
        this.searchText = node[this.labelProp]
        this.$emit('valueChanged', node[this.keyProp])
        this.$emit('change', {
          title: node[this.labelProp],
          value: node[this.keyProp],
          node,
        })
      } else {
        this.searchText = ''
        this.$emit('valueChanged', '')
        this.$emit('change', {
          title: '',
          value: '',
        })
      }
    },
    searchClear() {
      if (this.disabled) return
      this.treeVisible = true
      this.searchText = ''
      this.searchNodeCode = ''
      this.$emit('clear')
    },
  },
}
</script>
