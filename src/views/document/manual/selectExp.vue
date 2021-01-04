<template>
  <div>
    <h2>下拉框 uf-select</h2>
    <h4>1、默认</h4>
    <uf-select :options="comboxDataList" v-model="defaultValue" @change="onClickChange"></uf-select>
    <h4>2、自定义宽度</h4>
    <uf-select :options="comboxDataList" v-model="defaultValue" style="width: 300px;"></uf-select>
    <h4>3、无边框</h4>
    <uf-select :options="comboxDataList" noborder v-model="defaultValue"></uf-select>
    <h4>4、不显示下拉箭头</h4>
    <uf-select :options="comboxDataList" :show-arrow="false" v-model="defaultValue"></uf-select>
    <h4>5、尺寸</h4>
    <p style="margin-top: 10px;">large 大型：</p>
    <uf-select :options="comboxDataList" size="large" v-model="defaultValue"></uf-select>
    <p style="margin-top: 10px;">small 小型 可插入表格单元格的大小：</p>
    <uf-select :options="comboxDataList" size="small" noborder v-model="defaultValue"></uf-select>
    <h4>6、无内容提示</h4>
    <div>
      <uf-select :options="comboxDataList" v-model="noCode" placeholder="请选择城市"></uf-select>
    </div>
    <h4>7、带有清除按钮</h4>
    <uf-select :options="comboxDataList" v-model="defaultValue" allowClear></uf-select>
    <h4>8、带有图标</h4>
    <p style="margin-top: 10px;">默认：</p>
    <uf-select :options="comboxDataList" v-model="defaultValue" beforeIcon="icon-journal"></uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" afterIcon="icon-ledger"></uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" beforeIcon="icon-journal" afterIcon="icon-ledger"></uf-select>
    <p style="margin-top: 10px;">有清除：</p>
    <uf-select :options="comboxDataList" v-model="defaultValue" beforeIcon="icon-journal" allowClear></uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" afterIcon="icon-ledger" allowClear></uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" beforeIcon="icon-journal" afterIcon="icon-ledger" allowClear></uf-select>
    <h4>9、图标插槽</h4>
    <uf-select :options="comboxDataList" v-model="defaultValue" allowClear>
      <template v-slot:beforeIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" allowClear>
      <template v-slot:afterIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" allowClear>
      <template v-slot:beforeIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
      <template v-slot:afterIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-select>
    <h4>10、禁用</h4>
    <p style="margin-top: 10px;">1：</p>
    <uf-select :options="comboxDataList" v-model="defaultValue" disabled beforeIcon="icon-journal" allowClear></uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" disabled afterIcon="icon-ledger" allowClear></uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" disabled beforeIcon="icon-journal" afterIcon="icon-ledger" allowClear></uf-select>
    <p style="margin-top: 10px;">2：</p>
    <uf-select :options="comboxDataList" v-model="defaultValue" allowClear disabled>
      <template v-slot:beforeIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" allowClear disabled>
      <template v-slot:afterIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-select>
    <uf-select :options="comboxDataList" v-model="defaultValue" allowClear disabled>
      <template v-slot:beforeIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
      <template v-slot:afterIcon>
        <div class="icon icon-wrap">
          <i class="icon-journal" style="color: red;"></i>
        </div>
      </template>
    </uf-select>
    <!-- <h4>插槽形式option 使用uf-option组件插入</h4> -->
    <h4>11、自定义数据属性</h4>
    <p style="margin-top: 10px;">使用keyProp、labelProp自定义扁平数据关键属性</p>
    <h4>12、模糊搜索模式</h4>
    <p style="margin-top: 10px;">过滤数据</p>
    <uf-select :options="comboxDataList" v-model="noCode" search-filter-model="filter" :search-label="'label'" allowClear></uf-select>
    <p style="margin-top: 10px;">定位数据</p>
    <uf-select :options="comboxDataList" v-model="noCode" search-filter-model="position" allowClear></uf-select>
    <h4>混入“核算业务”配置的组件HsSelect：</h4>
    <hs-select :options="comboxDataList" v-model="noCode" allowClear @change="onClickChange"></hs-select>
    <p style="margin-top: 10px;">除了可以自动根据“系统选项”判断模糊搜索模式外，仍然可以指定模式</p>
    <hs-select :options="comboxDataList" v-model="noCode" hs-search-filter-model="filter" allowClear></hs-select>
    <h4>13、自定义下拉容器class</h4>
    <uf-select :options="comboxDataList" v-model="defaultValue" :dropdown-class-name="'w400 bgYellow'"></uf-select>
    <h4>14、自定义下拉容器style</h4>
    <uf-select :options="comboxDataList" v-model="defaultValue" :dropdown-style="{ width: '500px', background: '#FFFFCC' }"></uf-select>
    <h4>事件</h4>
    <p style="margin-top: 10px;">@change</p>
    <p style="margin-top: 10px;">@search</p>
    <p style="margin-top: 10px;">@clear</p>
    <p style="margin-top: 10px;">@clickBeforeIcon</p>
    <p style="margin-top: 10px;">@clickAfterIcon</p>
  </div>
</template>
<script>
import UfSelect from '@/components/common/UfSelect'
export default {
  name: 'selectExp',
  data() {
    return {
      defaultValue: '2',
      noCode: '',
      comboxDataList: [
        {
          label: '北京',
          value: '1',
        },
        {
          label: '天津',
          value: '2',
        },
        {
          label: '广州',
          value: '3',
        },
        {
          label: '深圳',
          value: '4',
        },
        {
          label: '杭州',
          value: '5',
        },
        {
          label: '厦门',
          value: '6',
        },
        {
          label: '南京',
          value: '7',
        },
        {
          label: '苏州',
          value: '8',
        },
        {
          label: '无锡',
          value: '9',
        },
        {
          label: '合肥',
          value: '10',
        },
        {
          label: '郑州',
          value: '11',
        },
        {
          label: '呼和浩特',
          value: '12',
        },
        {
          label: '常州',
          value: '13',
        },
        {
          label: '沈阳',
          value: '14',
        },
        {
          label: '哈尔滨',
          value: '15',
        },

      ],
      comboxDataList2: [
        {
          prtypeCode: '01',
          prtypeName: '在职',
        },
        {
          prtypeCode: '02',
          prtypeName: '离职',
        },
        {
          prtypeCode: '03',
          prtypeName: '返聘',
        },
      ],
    }
  },
  methods: {
    onClickChange(item, index, e) {
      console.log(item, index, e)
    },
  }
}
</script>
<style lang="scss">
.w400 {
  width: 400px;
}
.bgYellow {
  background: #ffff66;
}
.red {
  color: red;
}
</style>