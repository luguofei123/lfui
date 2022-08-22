
import LfButton from '@/components/common/button/button'
import LfButtonGroup from '@/components/common/button/buttonGroup'
import LfRadio from '@/components/common/radio/radio'
import LfRadioGroup from '@/components/common/radio/radioGroup'
const global = {
  install: function (Vue) {
    Vue.component('lf-button', LfButton)
    Vue.component('lf-button-group', LfButtonGroup)
    Vue.component('lf-radio', LfRadio)
    Vue.component('lf-radio-group', LfRadioGroup)
  }
}

export default global
