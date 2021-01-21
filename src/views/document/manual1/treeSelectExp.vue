<!--
 * @Author: sunch
 * @Date: 2020-12-16 15:39:41
 * @LastEditTime: 2020-12-24 16:09:19
 * @LastEditors: Please set LastEditors
 * @Description: 下拉树例子
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/treeSelectExp.vue
-->
<template>
  <div>
    <h2>基于ztree的下拉树 uf-tree-select</h2>
    <h4>1、默认</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" @change="onClickChange"></uf-tree-select>
    <h4>2、自定义宽度</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" style="width: 300px;"></uf-tree-select>
    <h4>3、无边框</h4>
    <uf-tree-select :treeData="orgDataList" noborder v-model="orgCode"></uf-tree-select>
    <h4>4、显示下拉箭头</h4>
    <uf-tree-select :treeData="orgDataList" show-arrow v-model="orgCode"></uf-tree-select>
    <h4>5、尺寸</h4>
    <p style="margin-top: 10px;">large 大型：</p>
    <uf-tree-select :treeData="orgDataList" size="large" v-model="orgCode"></uf-tree-select>
    <p style="margin-top: 10px;">small 小型 可插入表格单元格的大小：</p>
    <uf-tree-select :treeData="orgDataList" size="small" noborder v-model="orgCode"></uf-tree-select>
    <h4>6、可勾选</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCodes" checkable @change="onCheckChange"></uf-tree-select>
    <h4>7、无内容提示</h4>
    <div>
      <uf-tree-select :treeData="orgDataList" v-model="noCode" placeholder="请选择部门"></uf-tree-select>
      <uf-tree-select :treeData="orgDataList" v-model="noCodes" placeholder="请勾选部门" checkable></uf-tree-select>
    </div>
    <h4>8、带有清除按钮</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" allowClear></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCodes" allowClear checkable></uf-tree-select>
    <h4>9、带有图标</h4>
    <p style="margin-top: 10px;">默认：</p>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" beforeIcon="icon-journal"></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" afterIcon="icon-ledger"></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" beforeIcon="icon-journal" afterIcon="icon-ledger"></uf-tree-select>
    <p style="margin-top: 10px;">有清除：</p>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" beforeIcon="icon-journal" allowClear></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" afterIcon="icon-ledger" allowClear></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" beforeIcon="icon-journal" afterIcon="icon-ledger" allowClear></uf-tree-select>
    <h4>10、图标插槽</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" allowClear>
      <template v-slot:beforeIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" allowClear>
      <template v-slot:afterIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" allowClear>
      <template v-slot:beforeIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
      <template v-slot:afterIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-tree-select>
    <h4>11、禁用</h4>
    <p style="margin-top: 10px;">1：</p>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" disabled beforeIcon="icon-journal" allowClear></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" disabled afterIcon="icon-ledger" allowClear></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" disabled beforeIcon="icon-journal" afterIcon="icon-ledger" allowClear></uf-tree-select>
    <p style="margin-top: 10px;">2：</p>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" allowClear disabled>
      <template v-slot:beforeIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" allowClear disabled>
      <template v-slot:afterIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" allowClear disabled>
      <template v-slot:beforeIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
      <template v-slot:afterIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-tree-select>
    <h4>12、自定义数据属性</h4>
    <p style="margin-top: 10px;">使用keyProp、labelProp、parentKeyProp自定义扁平数据关键属性</p>
    <h4>13、模糊搜索模式</h4>
    <p style="margin-top: 10px;">过滤数据</p>
    <uf-tree-select :treeData="orgDataList" v-model="noCode" search-filter-model="filter" :search-label="'codeName'" allowClear></uf-tree-select>
    <p style="margin-top: 10px;">定位数据</p>
    <uf-tree-select :treeData="orgDataList" v-model="noCode" search-filter-model="position" allowClear></uf-tree-select>
    <p style="margin-top: 10px;">多选 过滤数据</p>
    <uf-tree-select :treeData="orgDataList" v-model="noCodes" checkable search-filter-model="filter" :search-label="['code','name']" allowClear></uf-tree-select>
    <p style="margin-top: 10px;">多选 定位数据</p>
    <uf-tree-select :treeData="orgDataList" v-model="noCodes" checkable search-filter-model="position" allowClear></uf-tree-select>
    <h4>混入“核算业务”配置的组件HsTreeSelect：</h4>
    <hs-tree-select :treeData="orgDataList" v-model="noCode" allowClear @change="onClickChange"></hs-tree-select>
    <p style="margin-top: 10px;">除了可以自动根据“系统选项”判断模糊搜索模式外，仍然可以指定模式</p>
    <hs-tree-select :treeData="orgDataList" v-model="noCode" hs-search-filter-model="filter" allowClear></hs-tree-select>
    <h4>14、自定义下拉容器class</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" :dropdown-class-name="'w400 bgYellow'"></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCodes" checkable :dropdown-class-name="['w400', 'bgYellow']"></uf-tree-select>
    <h4>15、自定义下拉容器style</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" :dropdown-style="{ width: '500px', background: '#FFFFCC' }"></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCodes" checkable :dropdown-style="{ width: '500px', background: '#FFFFCC' }"></uf-tree-select>
    <h4>16、父级可选中(默认：不可选中)</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" :parentNodeSelectDisabled="false"></uf-tree-select>
    <h4>17、不展开所有树节点</h4>
    <uf-tree-select :treeData="orgDataList" v-model="orgCode" :treeDefaultExpandAll="false"></uf-tree-select>
    <uf-tree-select :treeData="orgDataList" v-model="orgCodes" checkable :treeDefaultExpandAll="false"></uf-tree-select>
    <h4>18、多选情况：最多展示已选的数量</h4>
    <uf-tree-select :treeData="orgDataList" v-model="noCodes" checkable :max-tag-count="2"></uf-tree-select>
    <h4>19、多选情况：change事件不返回父级节点选中的key</h4>
    <uf-tree-select :treeData="orgDataList" v-model="noCodes" checkable :noGetParentChecked="true" @change="onCheckChange"></uf-tree-select>
    <h4>事件</h4>
    <p style="margin-top: 10px;">@change</p>
    <p style="margin-top: 10px;">@search</p>
    <p style="margin-top: 10px;">@clear</p>
    <p style="margin-top: 10px;">@clickBeforeIcon</p>
    <p style="margin-top: 10px;">@clickAfterIcon</p>
    
  </div>
</template>
<script>
import { orgDataList } from './orgCodes'
export default {
  name: 'tree-select-exp',
  data() {
    return {
      orgDataList,
      orgCode: '235',
      orgCodes: ['011', '235'],
      noCode: '',
      noCodes: [],
    }
  },
  mounted() {},
  methods: {
    onClickChange(arg){
      console.log(arg)
      let {value,title,node} = arg
      console.log(value)
      console.log(title)
      console.log(node)
    },
    onCheckChange({values,labels,labelStr,nodes}){
      console.log(values)
    }
  }
}
</script>
<style lang="scss">
.w400 {
  width: 400px;
}
.bgYellow {
  background: #ffff66;
}
.red {
  color: red;
}
</style>
