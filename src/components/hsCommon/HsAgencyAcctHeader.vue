<!--
 * @Date: 2020-12-09 19:34:37
 * @LastEditTime: 2021-01-04 16:06:27
 * @LastEditors: Please set LastEditors
 * @Description: 带 “单位下拉框” 和 “账套下拉框” 分开的头部
 * @FilePath: /agla-fe-8.50/vuedev/src/components/hsCommon/HsAgencyAcctHeader.vue
-->
<template>
  <div class="header-wrap">
    <div class="title-wrap">
      <div class="caption">
        <div class="title">{{ titleName }}</div>
      </div>
      <div class="select-wrap">
        <hs-tree-select class="mr-10" noborder placeholder="请选择单位" :treeData="agencyList" v-model="agencyData" @clear="clear" @change="agencyChange">
          <template v-slot:beforeIcon>
            <span class="icon icon-unit"></span>
          </template>
        </hs-tree-select>
        <hs-select noborder placeholder="请选择账套" :options="acctList" v-model="acctData" keyProp="code" labelProp="codeName" @clear="clear" @change="acctChange">
          <template v-slot:beforeIcon>
            <span class="icon icon-book"></span>
          </template>
        </hs-select>
      </div>
    </div>
    <div class="ctrl-wrap">
      <div class="prjTabWrap">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { getAgencyTree } from '@/views/gl/rpt/common/service/service'
import { fromRmis } from '@/assets/js/util'
import store from '@/store/index'
import common from '@/assets/js/common'

export default {
  name: 'hs-agency-acct-header',
  data() {
    return {
      agencyList: [], // 单位列表
      acctList: [], //账套列表
      agencyData: '', // 单位编码
      acctData: '', //账套编码
      initAcctFlag: true
    }
  },
  props: {
    titleName: {
      // 页面名
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      pfData: (state) => state.pfData,
      agencyCode: (state) => state.agencyCode,
      agencyName: (state) => state.agencyName,
      acctCode: (state) => state.acctCode,
      acctName: (state) => state.acctName
    }),
  },
  created() {
    //获取单位
    this.getAgencyList()
  },
  watch: {
    agencyData(val){
      if(val){
        this.getAcctList()
      }
    }
  },
  methods: {
    ...mapActions(['setAgencyCode', 'setAgencyName', 'setAcctCode', 'setAcctName', 'setAcctChanged']),
    /**
     * @description: 单位 改变
     */
    agencyChange(item) {
      this.agencyData = item.value
      this.setAgencyCode(item.value)
      this.setAgencyName(item.title)
      if(!this.initAcctFlag){
        this.setAcctCode('')
        this.setAcctName('')
        this.acctData = ''
      }
      // 标记账套改变
      this.setAcctChanged(true)
      console.log(this.acctCode,this.acctName)
      let params = {
        selAgencyCode: item.value,
        selAgencyName: item.title,
        selAcctCode: this.acctCode,
        selAcctName: this.acctName
      }
      console.log(params)
      this.setSelectedVar(params)
      this.$emit('agencyChange', {
        agencyCode: item.value,
        agencyName: item.title,
        node: item.node
      })
    },
    /**
     * @description: 账套改变
     */
    acctChange(item) {
      this.setAcctCode(item.code)
      this.setAcctName(item.codeName)
      // 标记账套改变
      this.setAcctChanged(true)
      let params = {
        selAgencyCode: this.agencyData,
        selAgencyName: this.agencyName,
        selAcctCode: item.code,
        selAcctName: item.codeName,
      }
      this.setSelectedVar(params)
      console.log(params)
      this.$emit('acctChange', {
        acctCode: item.code,
        acctName: item.codeName,
        node: item
      })
    },
    /**
     * @description: sessionStorage 在缓存中写入单位
     * @param {*} params
     */
    setSelectedVar: function(params) {
      var base = new common.base64OBj()
      var selEnviornmentVar = {
        selAgencyCode: params.selAgencyCode ? base.encode(params.selAgencyCode) : '',
        selAgencyName: params.selAgencyName ? base.encode(params.selAgencyName) : '',
        selAcctCode: params.selAcctCode ? base.encode(params.selAcctCode) : '',
        selAcctName: params.selAcctName ? base.encode(params.selAcctName) : '',
        // selAccBookCode: params.selAccBookCode ? base.encode(params.selAccBookCode) : '',
        // selAccBookName: params.selAccBookName ? base.encode(params.selAccBookName) : '',
      }
      console.log(selEnviornmentVar)
      sessionStorage.setItem('selEnviornmentVar', JSON.stringify(selEnviornmentVar))
    },
    /**
     * @description: 查询单位账套树
     */
    getAgencyList() {
      let that = this
      this.$axios({
        method: 'get',
        url: '/ma/sys/eleAgency/getAgencyTree',
        params: {
          roleId: this.pfData.svRoleId,
          setYear: this.pfData.svSetYear,
          rgCode: this.pfData.svRgCode,
        },
      })
        .then((result) => {
          if (result.data.data.length === 0) {
            this.$message.warning('未获取到单位信息')
            this.agencyList = []
            this.clear()
            return
          }
          // 整理成默认数据格式
          this.agencyList = result.data.data
          this.initAcctFlag = true
          this.setAgency()
        })
        .catch((error) => {
          console.log(error)
          if (error) {
            this.$message.error(error)
          }
        })
    },
    /**
     * @description: 获取账套列表
     */
    getAcctList(){
      let that = this
      if(!this.agencyData) return
      this.$axios({
        method: 'get',
        url: '/gl/eleCoacc/getRptAccts',
        params: {
          agencyCode: this.agencyData,
          roleId: this.pfData.svRoleId,
          setYear: this.pfData.svSetYear,
          rgCode: this.pfData.svRgCode,
        },
      })
        .then((result) => {
          if(result.data.flag === 'success'){
            if(result.data.data){
              if (result.data.data.length === 0) {
                this.$message.warning('未获取到账套信息')
                this.acctList = []
                this.acctClear()
                return
              }
              this.acctList = result.data.data
              console.log(this.initAcctFlag)
              console.log(this.acctData)
              if(this.initAcctFlag){
                this.setAcct()
                console.log(this.acctData)
                this.initAcctFlag = false
              }
            }else{
              this.$message.warning('未获取到账套信息')
              this.acctList = []
              this.acctClear()
              return
            }
          }else{
            throw result.data.msg
          }
        })
        .catch(this.$showError)
    },
    setAgency() {
      let agencyCode = this.pfData.svAgencyCode;
      let agencyName = this.pfData.svAgencyName;
      let acctCode = this.pfData.svAcctCode?this.pfData.svAcctCode:'*';
      let acctName = this.pfData.svAcctName?this.pfData.svAcctName:'*';
      //如果有单位账套的缓存，则取缓存的值，解决全局设置中没有账套，则进入总账-vue或明细账-vue页面不显示账套的bug CWYXM-21023 2020.10.15
      var selEnviornmentVar = this.$common.getSelectedVar()
      console.log(selEnviornmentVar)
      if (selEnviornmentVar) {
        agencyCode = selEnviornmentVar.selAgencyCode ? selEnviornmentVar.selAgencyCode : this.pfData.svAgencyCode
        agencyName = selEnviornmentVar.selAgencyName ? selEnviornmentVar.selAgencyName : this.pfData.svAgencyName
        acctCode = selEnviornmentVar.selAcctCode ? selEnviornmentVar.selAcctCode : this.pfData.svAcctCode
        acctName = selEnviornmentVar.selAcctName ? selEnviornmentVar.selAcctName : this.pfData.svAcctName
      }
      this.agencyData = agencyCode
      this.setAgencyCode(agencyCode);
      this.setAgencyName(agencyName);
      this.setAcctCode(acctCode);
      this.setAcctName(acctName);
      // 标记账套改变
      this.setAcctChanged(true);
    },
    /**
     * @description: 1、如果之前存过单位账套 继续使用这个单位账套初始化 2、如果没有 使用平台登录之后默认的单位账套
     */
    setAcct() {
      let acctCode = this.pfData.svAcctCode?this.pfData.svAcctCode:'*';
      let acctName = this.pfData.svAcctName?this.pfData.svAcctName:'*';
      //如果有单位账套的缓存，则取缓存的值，解决全局设置中没有账套，则进入总账-vue或明细账-vue页面不显示账套的bug CWYXM-21023 2020.10.15
      var selEnviornmentVar = this.$common.getSelectedVar()
      if (selEnviornmentVar) {
        acctCode = selEnviornmentVar.selAcctCode ? selEnviornmentVar.selAcctCode : this.pfData.svAcctCode
        acctName = selEnviornmentVar.selAcctName ? selEnviornmentVar.selAcctName : this.pfData.svAcctName
      }
      this.acctData = acctCode;
      console.log(this.acctData)
      this.setAcctCode(acctCode);
      this.setAcctName(acctName);
      // 标记账套改变
      this.setAcctChanged(true);
    },
    /**
     * @description: 清除账套信息
     */
    clear() {
      this.setAgencyCode('')
      this.setAgencyName('')
      //清除账套信息
      this.setAcctCode('')
      this.setAcctName('')
      this.setAcctChanged(true)
      this.$emit('clear')
    },
    acctClear(){
      //清除账套信息
      this.setAcctCode('')
      this.setAcctName('')
      this.setAcctChanged(true)
    }
  },
}
</script>
<style lang="scss" scoped>
.header-wrap {
  position: relative;
  border-bottom: 1px solid #dfe6ec;
  height: 46px;
  .title-wrap {
    float: left;
    width: 582px;
    display: flex;
    align-items: center;
  }
  .ctrl-wrap {
    float: right;
    margin-left: 58px;
    height: 45px;
    overflow: hidden;
  }
  .prjTabWrap {
    margin-right: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0;
  }
  .caption {
    display: inline-block;
    font-size: 18px;
    line-height: 18px;
    padding: 13px 0 11px 0;
    border-bottom: 3px solid #108ee9;
    .title {
      font-size: 16px;
      color: #2f353b;
      font-weight: 400;
    }
  }
  .select-wrap {
    margin-left: 24px;
    display: flex;
    align-items: center;
    padding-top: 1px;
    box-sizing: border-box;
    .icon {
      margin-right: 4px;
      color: #fff;
      padding: 3px;
      border-radius: 2px;
      background: #febe2d;
      font-size: 10px;
    }
  }
}
</style>
