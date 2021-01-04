<!--
 * @Author: sunch
 * @Date: 2020-08-24 10:47:31
 * @LastEditTime: 2020-12-31 15:05:26
 * @LastEditors: Please set LastEditors
 * @Description: 单位下拉框
 * @FilePath: /src/components/hsCommon/HsAgencySelect.vue
 -->
<template>
  <hs-tree-select class="mr-10" noborder placeholder="请选择单位" :treeData="agencyList" v-model="agencyData" @clear="agencyClear" @change="agencyChange">
  </hs-tree-select>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { getAgencyTree } from "@/views/gl/rpt/common/service/service";
import { fromRmis } from "@/assets/js/util";
import store from "@/store/index";
import common from "@/assets/js/common";

export default {
  name: 'hs-agency-select',
  data() {
    return {
      agencyList: [], // 单位列表
      agencyData: '', // 单位编码
    }
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
      this.$emit("change", {
        agencyCode: item.value,
        agencyName: item.title
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
        selAccBookCode: params.selAccBookCode
          ? base.encode(params.selAccBookCode)
          : "",
        selAccBookName: params.selAccBookName
          ? base.encode(params.selAccBookName)
          : "",
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
}
</script>
