<!--
 * @Author: sunch
 * @Date: 2020-12-09 09:46:13
 * @LastEditTime: 2020-12-24 16:56:41
 * @LastEditors: Please set LastEditors
 * @Description: form表单测试用例
 * @FilePath: /agla-fe-8.50/vuedev/src/views/document/manual/formExp.vue
-->
<template>
  <div>
    <h2>表单 uf-form</h2>

    <h3>表单校验</h3>
    <p style="margin-top: 10px;">使用校验功能rules属性必填，必须使用表单项组件 uf-form-item，且prop属性必填：</p>
    <uf-form :model="formData" :rules="rules" ref="uform">
      <!-- <div class="row"><uf-label align="right">姓名：</uf-label><uf-input v-model="formData.name" :placeholder="'请输入姓名'"></uf-input></div>
      <div class="row mt-10"><uf-label align="right">城市：</uf-label><uf-select v-model="formData.city" :options="cityList"></uf-select></div>
      <div class="row mt-10"><uf-label align="right">部门：</uf-label><uf-tree-select v-model="formData.orgCode" :treeData="orgDataList"></uf-tree-select></div> -->

      <uf-form-item label="姓名" prop="name">
        <uf-input v-model="formData.name" @input="onInput" :placeholder="'请输入姓名'"></uf-input>
      </uf-form-item>
      <uf-form-item label="城市" prop="city">
        <uf-select v-model="formData.city" :options="cityList"></uf-select>
      </uf-form-item>
      <uf-form-item label="部门" prop="orgCode">
        <uf-tree-select v-model="formData.orgCode" :treeData="orgDataList"></uf-tree-select>
      </uf-form-item>
    </uf-form>

    <h3>表单排列</h3>

    <h3>混合排列</h3>

    <!-- <h3>Methods 方法：</h3> -->
    <p style="margin-top: 200px;">
      <uf-button @click="getFormData">获取表单内容</uf-button>
    </p>
    <p style="margin-top: 20px;">
      <uf-button @click="validateForm">表单校验</uf-button>
    </p>
    <!-- <p>this.$refs.ufform.getFormData()</p> -->
  </div>
</template>
<script>
import { orgDataList } from './orgCodes'
export default {
  name: 'form-exp',
  data() {
    return {
      formData: {
        name: '财务核算',
        city: '',
        orgCode: '001',
      },
      cityList: [
        {
          label: '北京',
          value: '1',
        },
        {
          label: '天津',
          value: '2',
        },
        {
          label: '杭州',
          value: '3',
        },
      ],
      orgDataList,
      rules: {
        name: [{ required: true, message: '姓名必填' }],
        // city: [{ required: true, message: '必须选择一个城市' }],
        orgCode: [{ required: true, message: '必须选择一个部门' }],
      },
    }
  },
  mounted() {},
  methods: {
    getFormData() {
      // let obj = this.$refs.uform.getFormData()
      console.log(this.formData)
    },
    validateForm() {
      this.$refs.uform.validate().then((valid) => {
        console.log(valid)
      }).catch(error => console.log(error))
    },
    onInput(val){
      console.log(this.formData)
    }
  },
}
</script>
<style>
.row {
  display: flex;
}
</style>
