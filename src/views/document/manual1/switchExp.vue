<!--
 * @Author: your name
 * @Date: 2020-12-16 16:39:13
 * @LastEditTime: 2020-12-17 18:55:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/switchExp.vue
-->
<template>
  <div>
    <h3>标签菜单 uf-switch</h3>
    <h4>默认</h4>
    <p>第一种颜色样式</p>
    <uf-switch v-model="value1"  @focus="onfocus"></uf-switch>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource1 = !showSource1">显示代码</a>
    </div>
    <pre v-if="showSource1">
      <code>{{sourceText1}}</code>
    </pre>
    <p>第二种颜色样式</p>
    <uf-switch v-model="value2" active-color="#339900" inactive-color="#cc0000" ></uf-switch>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource2 = !showSource2">显示代码</a>
    </div>
    <pre v-if="showSource2">
      <code>{{sourceText2}}</code>
    </pre>
    <h4>组合开关</h4>
    <uf-switch v-model="value3" active-color="#339900" inactive-color="#cc0000" active-text="开"
      inactive-text="关"></uf-switch> <br/>
    <uf-switch v-model="value4" :width="52" active-color="#339900" inactive-color="#cc0000" active-text="开启"
      inactive-text="关闭"></uf-switch>  <br/>
    <uf-switch v-model="value5" :width="52" active-text="开启"
      inactive-text="关闭" @change="onChange"></uf-switch> <br/>
    <uf-switch v-model="value6" active-color="#339900" inactive-color="#cc0000" :activeIconClass="'icon-check'"
      ></uf-switch>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource3 = !showSource3">显示代码</a>
    </div>
    <pre v-if="showSource3">
      <code>{{sourceText3}}</code>
    </pre>

    <h4>disabled</h4>

    <uf-switch v-model="value7" active-color="#339900" inactive-color="#cc0000" active-text="开"
      inactive-text="关" disabled></uf-switch> <br/>
    <uf-switch v-model="value7" active-text="开"
      inactive-text="关" disabled></uf-switch> <br/>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource4 = !showSource4">显示代码</a>
    </div>
    <pre v-if="showSource4">
      <code>{{sourceText4}}</code>
    </pre>

    <h3>属性</h3>
    <p class="com-intro"><strong>参数：value / v-model</strong> <strong>说明：</strong> 绑定值 <strong>类型：</strong>boolean/string/number <strong>默认值：</strong> -</p>
    <p class="com-intro"><strong>参数：disabled</strong>  <strong>说明：</strong> 是否禁用 <strong>类型：</strong>boolean <strong>默认值：</strong> false </p>
    <p class="com-intro"><strong>width</strong>  <strong>说明：</strong> switch 的宽度（像素) <strong>类型：</strong>number	 <strong>默认值：</strong> 44 </p>
    <p class="com-intro"><strong>active-icon-class</strong>  <strong>说明：</strong> switch 打开时所显示图标的类名 <strong>类型：</strong>string <strong>默认值：</strong> - </p>
    <p class="com-intro"><strong>参数：inactive-icon-class</strong>  <strong>说明：</strong> switch 打开时所显示图标的类名 <strong>类型：</strong>string <strong>默认值：</strong> - </p>
    <p class="com-intro"><strong>参数：active-text</strong>  <strong>说明：</strong> switch 打开时的文字描述 <strong>类型：</strong>string <strong>默认值：</strong> - </p>
    <p class="com-intro"><strong>参数：inactive-text</strong>  <strong>说明：</strong> switch 关闭时的文字描述 <strong>类型：</strong>string <strong>默认值：</strong> - </p>
    <p class="com-intro"><strong>参数：active-color</strong>  <strong>说明：</strong> switch 打开时的背景色 <strong>类型：</strong>string <strong>默认值：</strong> #0066ff </p>
    <p class="com-intro"><strong>参数：inactive-color</strong>  <strong>说明：</strong> switch 关闭时的背景色 <strong>类型：</strong>string <strong>默认值：</strong> #ccc </p>

    <h3>事件</h3>
    <p class="com-intro"><strong>事件名称：change</strong>  <strong>说明：</strong> switch 状态发生变化时的回调函数 <strong>回调参数：</strong> 新状态的值 </p>



    <h3>事件</h3>


  </div>
</template>

<script>
  export default {
    data(){
      return{
        value1:true,
        value2:true,
        value3:true,
        value4:true,
        value5:true,
        value6:true,
        value7:false,
        showSource1:false,
        sourceText1:`<uf-switch v-model="value1"  @focus="onfocus"></uf-switch>`,
        showSource2:false,
        sourceText2:`<uf-switch v-model="value2" active-color="#339900" inactive-color="#cc0000" ></uf-switch>`,
        showSource3:false,
        sourceText3:`<uf-switch v-model="value3" active-color="#339900" inactive-color="#cc0000" active-text="开"
          inactive-text="关"></uf-switch> <br/>
        <uf-switch v-model="value4" width="52" active-color="#339900" inactive-color="#cc0000" active-text="开启"
          inactive-text="关闭"></uf-switch>  <br/>
        <uf-switch v-model="value5" width="52" active-text="开启"
          inactive-text="关闭" @change="onChange"></uf-switch> <br/>
        <uf-switch v-model="value6" active-color="#339900" inactive-color="#cc0000" :activeIconClass="'icon-check'"
          ></uf-switch>`,
        showSource4:false,
        sourceText4:`<uf-switch v-model="value7" active-color="#339900" inactive-color="#cc0000" active-text="开"
          inactive-text="关" disabled></uf-switch> <br/>
        <uf-switch v-model="value7" active-text="开"
          inactive-text="关" disabled></uf-switch> <br/>`
      }
    },
    methods: {
      onChange(val) {
        console.log(val);
      },
      onfocus(val){
        console.log('focus: ',val);
      }

    },
  }
</script>

<style lang="scss" scoped>
.com-intro{
  strong,b{
    margin-right:10px;
  }
}
</style>
