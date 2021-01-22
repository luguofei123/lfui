/*
 * @Author: sunch
 * @Date: 2020-08-11 14:41:11
 * @LastEditTime: 2020-12-31 14:07:25
 * @LastEditors: Please set LastEditors
 * @Description: 高频率使用的“核算项目”业务组件
 * @FilePath: /agla-fe-8.50/vuedev/src/assets/js/plugin/globalComponents.js
 */

//带有核算业务的下拉菜单
import HsSelect from '@/components/hsCommon/HsSelect'
//带有核算业务的下拉树
import HsTreeSelect from '@/components/hsCommon/HsTreeSelect'
//单位下拉框
// import HsAgencySelect from '@/components/hsCommon/HsAgencySelect'
//账套下拉框
// import HsAcctSelect from '@/components/hsCommon/HsAcctSelect'
//单位账套合成一个树的下拉框
// import HsAcctMergeSelect from '@/components/hsCommon/HsAcctMergeSelect'
//仅带单位下拉框的头部
import HsAgencyHeader from '@/components/hsCommon/HsAgencyHeader'
//带 “单位账套合成一个树的下拉框” 的头部
import HsAcctMergeHeader from '@/components/hsCommon/HsAcctMergeHeader'
//带 “单位下拉框” 和 “账套下拉框” 分开的头部
import HsAgencyAcctHeader from '@/components/hsCommon/HsAgencyAcctHeader'
// glrpt 账表头部 提供一个名为prjTab方案列表的插槽
import HsRptHeader from '@/components/hsCommon/HsRptHeader'

const hsGlobal = {
  install: function(Vue) {
    //带有核算业务的下拉菜单
    Vue.component('hs-select', HsSelect)
    //带有核算业务的下拉树
    Vue.component('hs-tree-select', HsTreeSelect)
    //单位下拉框
    // Vue.component('hs-agency-select', HsAgencySelect)
    //账套下拉框
    // Vue.component('hs-acct-select', HsAcctSelect)
    //单位账套合成一个树的下拉框
    // Vue.component('hs-acct-merge-select', HsAcctMergeSelect)
    //仅带单位下拉框的头部
    Vue.component('hs-agency-header', HsAgencyHeader)
    //带 “单位账套合成一个树的下拉框” 的头部
    Vue.component('hs-acct-merge-header', HsAcctMergeHeader)
    //带 “单位下拉框” 和 “账套下拉框” 分开的头部
    Vue.component('hs-agency-acct-header', HsAgencyAcctHeader)
    // glrpt 账表头部 提供一个名为prjTab方案列表的插槽
    Vue.component('hs-rpt-header', HsRptHeader)
  },
}

export default hsGlobal
