<!--
 * @Author: sunch
 * @Date: 2020-12-07 14:48:57
 * @LastEditTime: 2020-12-24 16:21:30
 * @LastEditors: Please set LastEditors
 * @Description: 输入框测试用例
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/inputExp.vue
-->
<template>
  <div>
    <h3>输入框 uf-input</h3>

    <h4>1、默认：</h4>
    <uf-input v-model="ufname" class="mt-10" @input="onInput"></uf-input>
    
    <h4>2、自定义宽度：</h4>
    <uf-input v-model="ufname" style="width: 300px;"></uf-input>

    <h4>3、无边框：</h4>
    <uf-input v-model="ufname" noborder></uf-input>

    <h4>4、尺寸：</h4>
    <p style="margin-top: 10px;">large 大型：</p>
    <uf-input v-model="ufname" size="large"></uf-input>
    <p style="margin-top: 10px;">small 小型 可插入表格单元格的大小：</p>
    <uf-input v-model="ufname" size="small"></uf-input>

    <h4 v-tooltip="'输入框placeholder：'">输入框placeholder：</h4>
    <uf-input v-model="content" :placeholder="'请输入内容'"></uf-input>

    <h4>5、有清除按钮：</h4>
    <uf-input v-model="ufname" allowClear></uf-input>

    <!-- <h4>UfSearch组件 搜索框(自带回车键监听)：</h4>
    <uf-search v-model="content" @search="onSearch"></uf-search> -->
    <h4>6、带图标：</h4>
    <uf-input v-model="content" beforeIcon="icon-log"></uf-input>
    <uf-input v-model="content" afterIcon="icon-log"></uf-input>
    <h4>7、有图标有清除按钮：</h4>
    <uf-input v-model="ufname" allowClear afterIcon="icon-journal"></uf-input>
    <h4>8、禁用：</h4>
    <uf-input v-model="ufname" disabled afterIcon="icon-journal"></uf-input>
    <h4>事件</h4>
    <p style="margin-top: 10px;">@input</p>
    <p style="margin-top: 10px;">@clear</p>
    <p style="margin-top: 10px;">@clickBeforeIcon</p>
    <p style="margin-top: 10px;">@clickAfterIcon</p>
  </div>
</template>
<script>
export default {
  name: 'input-exp',
  data() {
    return {
      drawerVisible: false,
      showSource: false,
      content: '',
      ufname: '财务云',
    }
  },
  mounted() {},
  methods: {
    onSearch(val) {
      alert(`搜索了：${val}`)
    },
    onInput(val){
      console.log(val)
    }
  },
}
</script>
<style></style>
