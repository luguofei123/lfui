<template>
  <div>
    <div class="header">
      <div class="headerLeft">
        <a href="#">
          <img src="../../assets/logo.png" alt="">
        </a>
      </div>
      <div class="headerRight">
        <ul>
          <li><a href="">测试1</a></li>
          <li><a href="">测试2</a></li>
          <li><a href="">测试3</a></li>
          <li><a href="">测试4</a></li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="leftMenu"></div>
      <div class="rightContent"></div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
// import Vue from 'vue'
// 文档源码高亮部分
// import hljs from "highlight.js";
// import 'highlight.js/styles/vs2015.css'
// import hljscore from "highlight.js/lib/core";
// window.hljs = hljs
// Vue.use(hljscore.vuePlugin);

export default {
  data () {
    return {
      ind: 1
    }
  },
  mounted () {
    // console.log(window.innerHeight)
  }
}
</script>
<style lang="scss">
.header{
  display: flex;
  justify-content:space-between;
  height: 50px;
  .headerLeft{
    a>img{
      width: 50px;
    }
  }
  .headerRight{
    ul>li{
      float:left;
    }
  }
}
</style>
