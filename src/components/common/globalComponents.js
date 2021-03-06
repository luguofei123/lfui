/*
 * @Author: sunch
 * @Date: 2020-08-11 14:41:11
 * @LastEditTime: 2021-01-04 16:25:09
 * @LastEditors: Please set LastEditors
 * @Description: 全局编程式组件和全局组件注册方法
 * @FilePath: /agla-fe-8.50/vuedev/src/assets/js/plugin/globalComponents.js
 */

import LfButton from '@/components/common/button/botton'
const global = {
  install: function (Vue) {
    Vue.component('lf-button', LfButton)
  }
}

export default global
