<template>
  <div>
    <h3>按钮 uf-button</h3>

    <h4>按钮类型(size默认)</h4>
    <div>
      <uf-button type="primary">主要按钮</uf-button>
    </div>
    <h4>主题颜色</h4>
  </div>
</template>
<script>
export default {
  name: 'buttonExp',
  data () {
    return {
      showSource: false,
      pagerText: '<uf-pager :pager-config="page" @page-change="handlePageChange"></uf-pager>',
      dataList: [
        {
          title: '北京',
          value: '1'
        },
        {
          title: '上海',
          value: '2'
        },
        {
          title: '广州',
          value: '3'
        }
      ]
    }
  },
  methods: {
    onClick1 (e) {
      console.log(e)
      alert('点击了按钮1')
    },
    onClick2 () {
      alert('点击了按钮2')
    },
    onClickComboxBtnOption (item, e) {
      console.log(item, e)
    },
    onClickcomboxlinkOption (item, e) {
      console.log(item, e)
    }
  }
}
</script>
