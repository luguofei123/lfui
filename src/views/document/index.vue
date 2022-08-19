<template>
  <div>
    <div class="container">
      <div class="leftMenu">
        <ul>
          <li><router-link to="/document/buttonExp">按钮</router-link></li>
          <li><router-link to="/document/radioExp">单选框</router-link></li>
        </ul>
      </div>
      <div class="rightContent">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
// 文档源码高亮部分hao
// import hljs from "highlight.js";
// import 'highlight.js/styles/vs2015.css'
// import hljscore from "highlight.js/lib/core";
// window.hljs = hljs
// Vue.use(hljscore.vuePlugin);

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
  }
  .rightContent {
    flex: 1;
  }
}
</style>
