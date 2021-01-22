<!--
 * @Author: sunch
 * @Date: 2020-05-15 11:20:10
 * @LastEditTime: 2020-12-16 14:00:14
 * @LastEditors: Please set LastEditors
 * @Description: 符合财务云样式的Tab标签菜单
 * @FilePath: /src/components/common/UfTab.vue
 -->
<template>
  <div class="tabWrap">
    <div v-if="tabList.length > maxShowTabNum" class="prevTab" :class="{ 'not-allowed': startTab === 0 }" @click="onClickPrevTab">
      <i class="icon-angle-left"></i>
    </div>
    <ul class="tabs">
      <li
        v-for="item in tabList.slice(startTab, endTab)"
        :key="item[activeKeyProp]"
        :class="{ active: isNaN(activeKey) ? activeKey === item[activeKeyProp] : parseInt(activeKey) === item[activeKeyProp] }"
        @click="onClickTabItem(item, item[activeKeyProp])"
      >
        {{ item[labelProp] }}
      </li>
    </ul>
    <div v-if="tabList.length > maxShowTabNum" class="nextTab" :class="{ 'not-allowed': endTab === tabList.length }" @click="onClickNextTab">
      <i class="icon-angle-right"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'uf-tab',
  props: {
    data: {
      //tab数组数据
      type: Array,
      default: () => {
        return []
      },
    },
    tabIndex: {
      //初始激活状态的tab的key值
      type: [Number, String],
      default: 0,
    },
    maxShowTabNum: {
      //最大显示的tab个数
      type: Number,
      default: 6,
    },
    labelProp: {
      //显示tab内容的属性
      type: String,
      default: 'text',
    },
    activeKeyProp: {
      //激活状态的key的属性
      type: String,
      default: 'current',
    },
  },
  data() {
    return {
      activeKey: '', //tab项显示激活状态的数据的唯一值
      tabList: [], //tab列表数据
      startTab: 0, //显示范围内起始tab角标
      endTab: 6, //显示范围内结束tab角标
    }
  },
  watch: {
    tabIndex: {
      handler(key) {
        this.activeKey = key
      },
      immediate: true,
    },
    data: {
      handler(list) {
        if (list && list.length > 0) {
          if (!list.some((item) => this.activeKeyProp in item)) {
            if (!isNaN(this.activeKey)) {
              list.forEach((item, index) => {
                item[this.activeKeyProp] = index
              })
            }
          }
          this.tabList = list
        }
      },
      immediate: true,
    },
    maxShowTabNum: {
      handler(num) {
        this.endTab = num
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * @description: 切换tab
     */
    onClickTabItem(item, key) {
      this.activeKey = key
      this.$emit('click', item, key)
    },
    /**
     * @description: 点击“上一个tab”按钮
     */
    onClickPrevTab() {
      if (this.startTab > 0) {
        this.startTab--
        this.endTab = this.startTab + this.maxShowTabNum
        this.$emit('clickPrev', true)
      }else{
        this.$emit('clickPrev', false)
      }
    },
    /**
     * @description: 点击“下一个tab”按钮
     */
    onClickNextTab() {
      if (this.endTab < this.tabList.length) {
        this.endTab++
        this.startTab = this.endTab - this.maxShowTabNum
        this.$emit('clickNext', true)
      }else{
        this.$emit('clickNext', false)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.tabWrap {
  display: flex;
  margin-bottom: -6px;
}

.tabs {
  margin: 0;
  display: flex;
  align-items: center;
}

.tabs li {
  height: 34px;
  padding: 6px 16px;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 4px 4px 0 0;
  user-select: none;
}

.tabs li.active {
  border: 1px solid #ddd;
  border-bottom-color: #fff;
  color: $uf-primary-color;
}

.tabs li:hover {
  background-color: $uf-primary-color;
  border-color: $uf-primary-color;
  color: #ffffff;
}
.prevTab,
.nextTab {
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  background-color: #fff;
  padding: 0 2px;
  cursor: pointer;
}

.prevTab:hover,
.nextTab:hover {
  background: #ddd;
  color: #fff;
}
.not-allowed {
  cursor: not-allowed;
}
</style>
