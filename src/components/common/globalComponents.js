
import LfButton from '@/components/common/button/button'
import LfButtonGroup from '@/components/common/button/buttonGroup'
const global = {
  install: function (Vue) {
    Vue.component('lf-button', LfButton)
    Vue.component('lf-button-group', LfButtonGroup)
  }
}

export default global
