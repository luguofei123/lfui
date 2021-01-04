<!--
 * @Author: liwz
 * @Date: 2020-09-27 10:00:39
 * @LastEditTime: 2021-01-04 15:08:36
 * @LastEditors: Please set LastEditors
 * @Description: 仅带单位下拉框的头部
 * @FilePath: /vuedev/src/components/hsCommon/HsAgencyHeader.vue
 -->
<template>
  <div class="header-wrap">
    <div class="title-wrap">
      <div class="caption">
        <div class="title">{{ titleName }}</div>
      </div>
      <div class="select-wrap">
        <hs-tree-select class="mr-10" noborder placeholder="请选择单位" :treeData="agencyList" v-model="agencyData" @clear="agencyClear" @change="agencyChange">
          <template v-slot:beforeIcon>
            <span class="icon icon-unit"></span>
          </template>
        </hs-tree-select>
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
import { mapState, mapActions } from "vuex";
import { getAgencyTree } from "@/views/gl/rpt/common/service/service";
import { fromRmis } from "@/assets/js/util";
import store from "@/store/index";
import common from "@/assets/js/common";

export default {
  name: "hs-agency-header",
  data() {
    return {
      agencyList: [], // 单位列表
      agencyData: '', // 单位编码
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
      agencyName: (state) => state.agencyName
    }),
  },
  created() {
    //获取单位
    this.getAgencyList();
  },
  methods: {
    ...mapActions(["setAgencyCode", "setAgencyName", "setAcctChanged"]),
    /**
     * @description: 单位 改变
     */
    agencyChange(item) {
      this.agencyData = item.value;
      this.setAgencyCode(item.value);
      this.setAgencyName(item.title);
      // 标记账套改变
      this.setAcctChanged(true);
      let params = {
        selAgencyCode: item.value,
        selAgencyName: item.title,
      };
      this.setSelectedVar(params);
      this.$emit("agencyChange", {
        agencyCode: item.value,
        agencyName: item.title,
        node: item.node
      });
    },
    /**
     * @description: sessionStorage 在缓存中写入单位
     * @param {*} params
     */
    setSelectedVar: function (params) {
      var base = new common.base64OBj();
      var selEnviornmentVar = {
        selAgencyCode: params.selAgencyCode
          ? base.encode(params.selAgencyCode)
          : "",
        selAgencyName: params.selAgencyName
          ? base.encode(params.selAgencyName)
          : "",
        // selAccBookCode: params.selAccBookCode
        //   ? base.encode(params.selAccBookCode)
        //   : "",
        // selAccBookName: params.selAccBookName
        //   ? base.encode(params.selAccBookName)
        //   : "",
      };
      sessionStorage.setItem(
        "selEnviornmentVar",
        JSON.stringify(selEnviornmentVar)
      );
    },
    /**
     * @description: 查询单位账套树
     */
    getAgencyList() {
      let that = this;
      this.$axios({
        method: "get",
        url: "/ma/sys/eleAgency/getAgencyTree",
        params: {
          roleId: this.pfData.svRoleId,
          setYear: this.pfData.svSetYear,
          rgCode: this.pfData.svRgCode,
        },
      })
        .then((result) => {
          if (result.data.data.length === 0) {
            this.$message.warning("未获取到单位信息");
            this.agencyList = [];
            this.agencyClear();
            return;
          }
          // 整理成默认数据格式
          this.agencyList = result.data.data;
          this.rmisFlag = fromRmis();
          if (this.rmisFlag) {
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
      //如果有单位账套的缓存，则取缓存的值，解决全局设置中没有账套
      var selEnviornmentVar = this.$common.getSelectedVar()
      if (selEnviornmentVar) {
        agencyCode = selEnviornmentVar.selAgencyCode ? selEnviornmentVar.selAgencyCode : this.pfData.svAgencyCode
        agencyName = selEnviornmentVar.selAgencyName ? selEnviornmentVar.selAgencyName : this.pfData.svAgencyName
      }
      this.agencyData = agencyCode;
      console.log(agencyCode)
      this.setAgencyCode(agencyCode);
      this.setAgencyName(agencyName);
      // 标记账套改变
      this.setAcctChanged(true);
    },
    /**
     * @description: 清除账套信息
     */
    agencyClear() {
      this.setAgencyCode("");
      this.setAgencyName("");
      this.setAcctChanged(true);
      this.$emit('clear')
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