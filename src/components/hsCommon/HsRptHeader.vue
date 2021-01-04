<!--
 * @Date: 2020-06-28 19:34:37
 * @LastEditTime: 2020-12-31 14:21:00
 * @LastEditors: Please set LastEditors
 * @Description: gl rpt 账表头部 提供一个名为prjTab方案列表的插槽
 * @FilePath: /agla-fe-8.50/vuedev/src/components/hsCommon/HsRptHeader.vue
-->
<template>
  <div class="header-wrap">
    <div class="title-wrap">
      <div class="caption">
        <div class="title">{{ titleName }}</div>
      </div>
      <div class="select-wrap">
        <!-- 由title-wrap的定宽482计算的宽度400px -->
        <hs-tree-select 
          class="mr-10"
          style="width: 400px;"
          noborder 
          placeholder="请选择单位账套" 
          :treeData="agencyAcctList" 
          v-model="acctData" 
          keyProp="id"
          searchLabelProp="agencyAcctName"
          @clear="acctClear" 
          @change="acctChange">
            <template v-slot:beforeIcon>
              <span class="icon icon-unit"></span>
            </template>
        </hs-tree-select>
      </div>
    </div>
    <div class="ctrl-wrap">
      <div class="prjTabWrap">
        <slot name="prjTab"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { getAgencyAcctTree } from "@/views/gl/rpt/common/service/service";
import { fromRmis } from "@/assets/js/util";
import store from "@/store/index";
import common from '@/assets/js/common'

export default {
  name: "hs-rpt-header",
  data() {
    return {
      agencyAcctList: [], // 单位账套列表
      acctData: "", // 设置跳转单位账套信息 格式 ${单位编码}_${账套编码}
      fromOtherRpt: false, //标记
    };
  },
  props: {
    titleName: {
      // 页面名
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState({
      pfData: (state) => state.pfData,
      agencyCode: (state) => state.agencyCode,
      agencyName: (state) => state.agencyName,
      acctCode: (state) => state.acctCode,
      acctName: (state) => state.acctName,
      acctChanged: (state) => state.acctChanged
    }),
  },
  created() {
    //获取单位账套
    this.getAgencyAcctList();
  },
  mounted() {
    //如果是从报表跳转来的
    //如果是从其他页面跳转来的
    let param = this.$route.query,
      { dataFrom } = param;
    if (dataFrom) {
      this.fromOtherRpt = true;
      let arguStr = localStorage.getItem(`from_${dataFrom}Params`);
      let argu = JSON.parse(arguStr);
      if (argu.agencyCode && argu.acctCode) {
        this.acctData = `${argu.agencyCode}_${argu.acctCode}`;
      }
    }
  },
  methods: {
    ...mapActions([
      "setAgencyCode",
      "setAgencyName",
      "setAcctCode",
      "setAcctName",
      "setAccsCode",
      "setAccsName",
      "setAcctChanged",
      "setAcctChangedFlag",
      "setFromRmisArgu",
    ]),
    /**
     * @description: 账套 改变
     */
    acctChange(item) {
      console.log(item)
      this.acctData = item.value;
      let agencyCode = item.node.agencyCode
      let agencyCodeName = item.node.agencyCodeName
      let acctCode = '', acctName = item.title
      if(item.value && item.value.indexOf('_')>-1){
        acctCode = item.value.split('_')[1]
      }
      this.setAgencyCode(agencyCode);
      this.setAgencyName(agencyCodeName);
      this.setAcctName(acctName);
      this.setAcctCode(acctCode);
      // 标记账套改变
      this.setAcctChanged(true);
      let params = {
        selAgencyCode: agencyCode,
        selAgencyName: agencyCodeName,
        selAcctCode: acctCode,
        selAcctName: acctName
      }
      this.setSelectedVar(params);
      this.$emit("acctChange", {
        agencyCode: agencyCode,
        agencyName: agencyCodeName,
        acctCode,
        acctName
      });
    },
    setSelectedVar: function(params) {
      var base = new common.base64OBj()
      var selEnviornmentVar = {
        selAgencyCode: params.selAgencyCode ? base.encode(params.selAgencyCode) : "",
        selAgencyName: params.selAgencyName ? base.encode(params.selAgencyName) : "",
        selAcctCode: params.selAcctCode ? base.encode(params.selAcctCode) : '',
        selAcctName: params.selAcctName ? base.encode(params.selAcctName) : '',
        selAccBookCode: params.selAccBookCode ? base.encode(params.selAccBookCode) : "",
        selAccBookName: params.selAccBookName ? base.encode(params.selAccBookName) : "",
      };
      sessionStorage.setItem("selEnviornmentVar", JSON.stringify(selEnviornmentVar))
    },
    /**
     * @description: 查询单位账套树
     */
    getAgencyAcctList() {
      let that = this;
      getAgencyAcctTree({})
        .then((result) => {
          if (result.data.data.length === 0) {
            this.$message.warning("未获取到单位信息");
            this.agencyAcctList = [];
            this.acctClear();
            return;
          }
          result.data.data.forEach(item => {
            if(item.isAcct) item.agencyAcctName = `${item.agencyCodeName}-${item.codeName}`
          })
          // 整理成默认数据格式
          this.agencyAcctList = result.data.data;
          //插入一个判断 如果是从报表跳转来的 store内部记录一个状态 action获取跳转来的参数并处理
          this.rmisFlag = fromRmis();
          if (this.rmisFlag) {
            //将rmis传递过来的参数设置成方案内容
            //包含以下
            this.setFromRmisArgu()
              .then((result) => {
                this.setAgencyCode(result.agencyCode);
                this.setAcctCode(result.acctCode);
                let agencyName = "",
                  acctName = "";
                this.agencyAcctList.forEach((item) => {
                  if (result.agencyCode === item.agencyCode) {
                    agencyName = item.agencyCodeName;
                  }
                  if (result.acctCode === item.code) {
                    acctName = item.codeName;
                  }
                });
                this.setAgencyName(agencyName);
                this.setAcctName(acctName);
              })
              .catch((error) => {
                console.log(error);
                if (error) {
                  this.$message.error(error);
                }
              });
          } else if (this.fromOtherRpt) {
            // this.setAcctCodeFromOtherRpt()
          } else {
            this.setAgencyAndAcct();
          }
        })
        .catch((error) => {
          console.log(error);
          if (error) {
            this.$message.error(error);
          }
        });
    },
    /**
     * @description: 1、如果之前存过单位账套 继续使用这个单位账套初始化 2、如果没有 使用平台登录之后默认的单位账套
     */
    setAgencyAndAcct() {
      let agencyCode = this.pfData.svAgencyCode;
      let agencyName = this.pfData.svAgencyName;
      let acctCode = this.pfData.svAcctCode?this.pfData.svAcctCode:'*';
      let acctName = this.pfData.svAcctName?this.pfData.svAcctName:'*';
      //如果有单位账套的缓存，则取缓存的值，解决全局设置中没有账套，则进入总账-vue或明细账-vue页面不显示账套的bug CWYXM-21023 2020.10.15
      var selEnviornmentVar = this.$common.getSelectedVar()
      if (selEnviornmentVar) {
        agencyCode = selEnviornmentVar.selAgencyCode ? selEnviornmentVar.selAgencyCode : this.pfData.svAgencyCode
        agencyName = selEnviornmentVar.selAgencyName ? selEnviornmentVar.selAgencyName : this.pfData.svAgencyName
        acctCode = selEnviornmentVar.selAcctCode ? selEnviornmentVar.selAcctCode : this.pfData.svAcctCode
        acctName = selEnviornmentVar.selAcctName ? selEnviornmentVar.selAcctName : this.pfData.svAcctName
      }
      this.acctData = agencyCode + '_' + acctCode;
      this.setAgencyCode(agencyCode);
      console.log(agencyCode)
      this.setAgencyName(agencyName);
      this.setAcctCode(acctCode);
      this.setAcctName(acctName);
      // 标记账套改变
      this.setAcctChanged(true);
      this.setAcctChangedFlag(true);
    },
    /**
     * @description: 清除账套信息
     */
    acctClear() {
      this.setAgencyCode("");
      this.setAgencyName("");
      //清除会计体系信息
      this.setAccsCode("");
      this.setAccsName("");
      //清除账套信息
      this.setAcctCode("");
      this.setAcctName("");
      this.setAcctChanged(true);
      this.setAcctChangedFlag(true);
    }
  },
};
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
    margin-left: 582px;
    height: 45px;
    overflow: hidden;
  }
  .prjTabWrap {
    margin-right: 0px;
    height: 100%;
    display: flex;
    align-items: center;
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
    .select-item {
      width: 220px;
      margin-right: 50px;
    }
  }
}
</style>