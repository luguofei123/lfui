<!--
 * @Author: your name
 * @Date: 2020-12-21 14:37:21
 * @LastEditTime: 2020-12-22 14:26:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/confirmExp.vue
-->
<template>
  <div>
    <h3>confirmExp</h3>
    <uf-button type="default" @click="del1()">confirm删除确认框</uf-button> </br>
    <br>

    <uf-button type="default" @click="del2()">confirm删除确认框,无提示</uf-button>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource1 = !showSource1">显示代码</a>
    </div>
    <pre v-if="showSource1">
      <code>{{sourceText1}}</code>
    </pre>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        showSource1:false,
        sourceText1:`<uf-button type="default" @click="del1()">confirm</uf-button>
        <uf-button type="default" @click="del2()">confirm删除确认框,无提示</uf-button>
        export default {
          methods: {
            del1(){
              this.$UfConfirm('提示','是否删除？',{
                yesBtnText:'确定',
                cancelBtnText:'取消',
                type: 'warning'
              }).then(() => {
                //点是
                console.log('点击了是');
              }).catch(() => {
                  //点否
                console.log('点击了否');
              });
            },
            del2(){
              this.$UfConfirm('','是否删除？',{
                yesBtnText:'确定',
                cancelBtnText:'取消',
                type: 'warning'
              }).then(() => {
                //点是
                console.log('点击了是');
              }).catch(() => {
                  //点否
                console.log('点击了否');
              });
            }
          },

        }`
      }
    },
    methods: {
      del1(){
        this.$UfConfirm('是否删除？','提示',{
          yesBtnText:'确定',
          cancelBtnText:'取消',
          type: 'warning'
        }).then(() => {
          //点是
          console.log('点击了是');
        }).catch(() => {
            //点否
          console.log('点击了否');
        });
      },
      del2(){
        this.$UfConfirm('','是否删除？',{
          yesBtnText:'确定',
          cancelBtnText:'取消',
          type: 'warning'
        }).then(() => {
          //点是
          console.log('点击了是');
        }).catch(() => {
            //点否
          console.log('点击了否');
        });
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>