<template>
  <div>
    <div class="container">
      <div class="leftMenu">
        <ul>
          <li><router-link to="/document/buttonExp">按钮组件</router-link></li>
          <li><router-link to="/document/radioExp">单选组件</router-link></li>
          <li><router-link to="/document/checkboxExp">复选组件</router-link></li>
          <li><router-link to="/document/selectExp">下拉选择</router-link></li>
        </ul>
      </div>
      <div class="rightContent">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
// 文档源码高亮部分hao
import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(VueHighlightJS)
export default {
  data() {
    return {
      ind: 1
    }
  },
  mounted() {
    // console.log(window.innerHeight)
  }
}
</script>
<style lang="scss">
.container {
  margin: 10px;
  display: flex;
  height: 500px;
  .leftMenu {
    width: 200px;
    font-size: 14px;
    ul li {
      margin-bottom: 10px;
    }
  }
  .rightContent {
    flex: 1;
    .demoBox {
      .demo {
        margin-bottom: 16px;
      }
    }
  }
}
</style>
