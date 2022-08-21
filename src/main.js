import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/yonyou3.0/iconfont.css'



// import VueHighlightJS from 'vue-highlightjs'
// import 'highlight.js/styles/atom-one-dark.css'
// Vue.use(VueHighlightJS)


// 自定义公共组件
import globalComponents from './components/common/globalComponents.js' // 全局基础组件
Vue.use(globalComponents)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
