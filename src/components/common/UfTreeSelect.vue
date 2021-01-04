<!--
 * @Author: sunch
 * @Date: 2020-05-15 11:20:10
 * @LastEditTime: 2021-01-04 14:20:29
 * @LastEditors: Please set LastEditors
 * @Description: 自定义下拉树
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
    :inputValue="searchText||checkedContent"
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
    <div v-if="checkable" style="width: 100%;height: 100%;display: flex;">
      <input v-show="treeVisible" type="text" v-model="searchText" :disabled="disabled" @keyup="onSearchKeyUp" @focus="searchFocus($event)" :placeholder="placeholder" />
      <div v-show="!treeVisible" :class="checkedContent ? 'showChecked' : 'placeholder'">
        {{ checkedContent ? checkedContent : placeholder }}
      </div>
    </div>
    <div v-else style="width: 100%;height: 100%;display: flex;">
      <input type="text" v-model="searchText" :disabled="disabled" @keyup="onSearchKeyUp" @focus="searchFocus($event)" :placeholder="placeholder" />
    </div>

    <transition name="myfade">
      <div class="ufTreeOptionsWrap" ref="treeWrap" v-show="treeVisible" :class="dropdownClassName" :style="dropdownStyle" @click.stop>
        <select-tree
          :setting="setting"
          :nodes="searchFilterModel === 'filter' ? filterTreeData : treeData"
          @onCreated="onZtreeCreated"
          :selectKey="selectNodeCode"
          :keyProp="keyProp"
          :searchChanged="searchChanged"
          :searchKey="searchNodeCode"
          :checkedCodes="checkedCodes"
          :treeDefaultExpandAll="treeDefaultExpandAll"
          @onCheck="onCheck"
          @onClick="onClick"
          @onSelect="onSelect"
          @searchChangedBack="searchChangedBack"
          @searchScrollTo="searchScrollTo"
        ></select-tree>
      </div>
    </transition>
  </uf-input-el-wrap>
</template>
<script>
import UfInputElWrap from './UfInputElWrap'
import SelectTree from '@/components/common/SelectTree'

export default {
  name: 'uf-tree-select',
  components: {
    'select-tree': SelectTree,
    'uf-input-el-wrap': UfInputElWrap,
  },
  props: {
    value: {
      //选中或勾选的内容
      type: [String, Array],
      default: () => '',
    },
    treeData: {
      //treeNodes 数据
      type: Array,
      default: () => [],
    },
    noborder: {
      //是否无边框
      type: Boolean,
      default: false,
    },
    size: {
      //尺寸
      type: String,
      default: ''
    },
    checkable: {
      //是否允许多选
      type: Boolean,
      default: false,
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
      default: false
    },
    disabled: {
      //是否禁用
      type: Boolean,
      default: false,
    },
    keyProp: {
      //数据中的key的属性
      type: String,
      default: 'code',
    },
    labelProp: {
      //数据中的用于展示的属性
      type: String,
      default: 'codeName',
    },
    parentKeyProp: {
      //数据中的父级key的属性
      type: String,
      default: 'pId',
    },
    searchLabelProp: {
      //搜索框显示的数据属性
      type: String,
      default: '',
    },
    searchFilterModel: {
      //模糊搜索模式 position：定位模式 filter：过滤模式 默认为定位模式
      type: String,
      default: 'position'
    },
    searchLabel: {
      //用于模糊搜索的属性范围 ['code','name']
      type: [Array, String],
      default: () => []
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
    parentNodeSelectDisabled: {
      //父级节点不可选中 默认：是
      type: Boolean,
      default: true,
    },
    treeDefaultExpandAll: {
      //默认展开所有树节点
      type: Boolean,
      default: true,
    },
    maxTagCount: {
      //多选时的最多展示数量
      type: Number,
      default: 0,
    },
    noGetParentChecked: {
      //change事件不返回父级节点选中的key
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'value',
    event: 'valueChanged'
  },
  data() {
    return {
      searchText: '', //搜索的内容
      searchTextProp: '', //搜索框显示的数据属性
      focus: false,
      selectNodeCode: '', //选择了哪个node
      searchChanged: false,
      searchNodeCode: '', //使用搜索筛选出的code
      checkedCodes: [], //回写的勾选数组
      checkedContent: '', //勾选了的label内容
      setting: {
        data: {
          key: {
            name: this.labelProp,
          },
          simpleData: {
            enable: true,
            idKey: this.keyProp,
            pIdKey: this.parentKeyProp,
          },
        },
        check: {
          enable: this.checkable,
        },
        view: {
          showLine: false,
          showIcon: false,
          nodeClasses: function(treeId, treeNode) {
            return treeNode.highlight ? { add: ['searchBg'] } : { remove: ['searchBg'] }
          },
        },
        callback: {
          beforeClick: (treeId, treeNode) => treeNode.isParent ? !this.parentNodeSelectDisabled : true,
        },
      },
      treeVisible: false, //控制下拉列表的隐藏显示
      searchLoading: false, //搜索的loading
      searchResult: [], //搜索结果
      keyCur: 0, //搜索按回车定位的搜索结果下标
    }
  },
  computed: {
    selfSearchLabels() {
      const warnTip = '注意：如果指定了“searchFilterModel”为“filter”，应该指定搜索数据的属性范围“searchLabel”，否则默认按照[labelProp]（默认为codeName）属性过滤，可能显示不出期望的结果！'
      let rest = []
      if (this.searchLabel) {
        if (this.searchLabel instanceof Array) {
          if (this.searchLabel.length > 0) {
            rest = this.searchLabel
          } else {
            if (this.searchFilterModel === 'filter') console.warn(warnTip)
            rest = [this.labelProp]
          }
        } else {
          rest = [this.searchLabel]
        }
      } else {
        if (this.searchFilterModel === 'filter') console.warn(warnTip)
        if(this.searchTextProp && (this.labelProp !== this.searchTextProp)) {
          rest = [this.labelProp, this.searchTextProp]
        }else{
          rest = [this.labelProp]
        }
      }
      return rest
    },
    filterTreeData() {
      let rest = []
      if (this.treeData && this.treeData.length > 0 && this.searchText) {
        this.selfSearchLabels.forEach((prop) => {
          let arr = this.treeData.filter((item) => {
            return item[prop] && item[prop].indexOf(this.searchText) > -1 && this.canParentNodeSelect(item)
          })
          rest = rest.concat(arr)
        })
        this.searchResult = rest
        if (this.searchResult.length > 0) {
          this.$nextTick(() => {
            this.searchNodeCode = this.searchResult[0][this.keyProp]
            this.searchChanged = true
          })
        } else {
          this.searchNodeCode = ''
        }
      } else {
        rest = this.treeData
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
          let arr = this.treeData.filter((item) => {
            return item[prop].indexOf(val) > -1 && this.canParentNodeSelect(item)
          })
          rest = rest.concat(arr)
        })
        this.searchResult = rest
        if (this.searchResult.length > 0) {
          this.searchNodeCode = this.searchResult[0][this.keyProp]
        } else {
          this.searchNodeCode = ''
        }
      } else {
        this.searchNodeCode = ''
      }
      this.searchChanged = true
    },
    /**
     * @description: value变化
     */
    value: {
      handler(newVal) {
        if (newVal) {
          if (this.checkable && newVal instanceof Array) {
            this.checkedCodes = newVal
          } else {
            this.selectNodeCode = newVal
          }
        } else {
          this.searchText = ''
        }
      },
      immediate: true,
    },
    //如果用户自定义搜索展示数据属性
    searchLabelProp: {
      handler(prop) {
        if(prop) {
          this.searchTextProp = prop
        }else{
          this.searchTextProp = this.labelProp
        }
        // console.log(this.searchTextProp)
      },
      immediate: true,
    },
    /**
     * @description: 选择的key值改变
     */
    selectNodeCode: {
      handler(newVal) {
        if (newVal) {
          if (!this.checkable && this.treeData.length > 0) {
            console.log(newVal)
            let rest = this.treeData.filter((item) => item[this.keyProp] === newVal)
            console.log(rest)
            rest.length > 0 ? (this.searchText = rest[0][this.searchTextProp]) : (this.searchText = '')
            console.log(this.searchText)
          }
        } else {
          this.searchText = ''
        }
      },
      immediate: true,
    },
    checkedCodes: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          if (this.checkable && this.treeData.length > 0) {
            let rest = this.treeData.filter((item) => newVal.some((code) => code === item[this.keyProp])).map((item) => item[this.labelProp])
            rest.length > 0 ? (this.checkedContent = rest.join('，')) : (this.checkedContent = '')
          }
        } else {
          this.searchText = ''
        }
      },
      immediate: true,
    },
  },
  methods: {
    clickOutHandler(){
      this.treeVisible = false
      this.focus = false
    },
    /**
     * @description: 节点数据是否可以选中
     * @param {*} item
     */
    canParentNodeSelect(item) {
      if (this.parentNodeSelectDisabled) {
        return !!item.isLeaf && item.isLeaf != '0'
      } else {
        return true
      }
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
    },
    /**
     * @description: ztree创建成功的回调
     */
    onZtreeCreated() {
      // console.log('ztree创建成功')
    },
    searchFocus(event) {
      if (this.disabled) return
      event.currentTarget.select()
      this.treeVisible = true
    },
    onClick(...arg) {
      if (this.checkable) {
        var zTree = $.fn.zTree.getZTreeObj(arg[1])
        zTree.checkNode(arg[2], !arg[2].checked, true, true)
      } else {
        this.treeVisible = false
        if (arg[2][this.keyProp]) {
          this.searchText = arg[2][this.searchTextProp]
          this.selectNodeCode = arg[2][this.keyProp]
          this.$emit('valueChanged', arg[2][this.keyProp])
          this.$emit('change', {
            title: arg[2][this.labelProp],
            value: arg[2][this.keyProp],
            node: arg[2],
          })
        } else {
          this.searchText = ''
          this.selectNodeCode = ''
          this.$emit('valueChanged', '')
          this.$emit('change', {
            title: '',
            value: '',
          })
        }
      }
    },
    onCheck(...arg) {
      // console.log(arg);
      let treeObj = $.fn.zTree.getZTreeObj(arg[1])
      let nodes = treeObj.getCheckedNodes(true)
      // console.log(nodes);
      let codes = [],
        names = []
      nodes.forEach((node) => {
        if (this.noGetParentChecked) {
          if (!node.isParent) {
            codes.push(node[this.keyProp])
            names.push(node.name)
          }
        } else {
          codes.push(node[this.keyProp])
          names.push(node.name)
        }
      })
      if (this.maxTagCount) {
        if (names.length > this.maxTagCount) {
          this.checkedContent = names.slice(0, this.maxTagCount).join('，')
        } else {
          this.checkedContent = names.join('，') //!!!注意都是以中文逗号做的分隔
        }
      } else {
        this.checkedContent = names.join('，')
      }
      this.$emit('valueChanged', codes)
      this.$emit('change', { values: codes, labels: names, labelStr: this.checkedContent, nodes })
    },
    onSelect(node) {
      this.treeVisible = false
      if (node) {
        this.searchText = node[this.searchTextProp]
        this.selectNodeCode = node[this.keyProp]
        this.$emit('valueChanged', node[this.keyProp])
        this.$emit('change', {
          title: node[this.labelProp],
          value: node[this.keyProp],
          node,
        })
      } else {
        this.searchText = ''
        this.selectNodeCode = ''
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
      this.searchChanged = true
      this.checkedContent = ''
      this.selectNodeCode = ''
      this.checkedCodes = []
      this.$emit('clear')
    },
    searchChangedBack() {
      this.searchChanged = false
    },
    searchScrollTo(val) {
      if (this.searchFilterModel !== 'position') return
      let el = this.$refs.treeWrap
      this.$(el).scrollTop(val)
    },
  },
}
</script>
