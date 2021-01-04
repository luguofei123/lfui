<!--
 * @Author: your name
 * @Date: 2020-08-21 13:46:06
 * @LastEditTime: 2020-10-27 14:34:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit 修改成youyonmoon中的图标
 * @FilePath: /agla-fe-8.50/vuedev/src/components/BaseToolsBar.vue
-->
<template>
  <div>
    <a-row>
      <a-col class="txt-r">
        <a-button-group style="padding:10px 0;" class="mr-5">
          <a-input-search placeholder="请输入要搜索的关键词" class="mt-5" style="width: 200px;" @search="onSearch" />
        </a-button-group>
        <a-radio-group style="padding:10px 0;">
          <a-radio-button value="print" @click="print"><i class="icon-print"></i></a-radio-button>
          <a-radio-button value="exportData" @click="exportData"><i class="icon-upload"></i></a-radio-button>
        </a-radio-group>
      </a-col>
    </a-row>
  </div>
</template>
<script>
  export default {
    methods: {
      onSearch(e){
          console.log(e.target.value);
          this.$emit('toolsBarBtnsCallBack',e.target.value);
      },
      print(e){
          console.log(e.target.value);
          this.$emit('toolsBarBtnsCallBack',e.target.value);
      },
      exportData(e){
          console.log(e.target.value);
          this.$emit('toolsBarBtnsCallBack',e.target.value);
      }
    }
  }
</script>
<style scoped>
</style>