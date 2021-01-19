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
  .headerLeft{
    a>img{
      width: 50px;
    }
  }
  .headerRight{
    flex: 1;
  }
}
.mainBox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.menuBox {
  float: left;
  width: 200px;
  height: 100%;
  overflow: auto;
  padding-top: 15px;
  box-sizing: border-box;
}
.menuTitle{
  color: #555
}
.menuBox .indexItem {
  margin-bottom: 10px;
  padding: 0 15px;
  font-size: 14px;
  font-weight: 500;
}
.menuBox .indexItem a {
  color: #3384ff;
}
.menuBox .indexItem a:hover{
  color: #0066ff;
}
.menuBox .active a{
  color: #0051cc;
}
.example {
  height: 100%;
  margin-left: 200px;
  width: calc(100% - 200px);
  padding: 0 15px;
  box-sizing: border-box;
  overflow-y: auto;
}
.exampleInner{
  min-width: 1100px;
  overflow-x: auto;
}
h3 {
  margin: 15px 0;
}
h4 {
  margin: 10px 0;
}
h5 {
  margin: 10px 0;
}
.showSrcWrap {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.showSrcWrap a {
  text-decoration: none;
}
pre {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #f0f0f0;
}
</style>
