<template>
  <div>
    <h3>分页器(uf-pager)</h3>

    <uf-pager :pager-config="page" @page-change="handlePageChange" style="margin-top: 100px;"></uf-pager>
    <div class="showSrcWrap">
      <a href="javascript:;" @click="showSource = !showSource">显示代码</a>
    </div>

    <pre v-if="showSource">
        <code>{{pagerText}}</code>
        <code>
        export default {
            data() {
                return {
                    page: {
                        tableName: 'componentsView', //表格或页面唯一名称标识
                        currentPage: 1, //当前页
                        pageSize: 20,
                        pageSizes: [ 20, 50, 100, '全部'],
                        total: 233 //总条数
                    },
                    currentPage: 1,
                    pageSize: 20
                }
            },
            methods: {
                handlePageChange({ currentPage, pageSize }){
                    if(pageSize==='全部'){
                        this.currentPage = ''
                        this.pageSize = ''
                    }else{
                        this.page.currentPage = currentPage
                        this.page.pageSize = pageSize
                    }
                }
            }
        }
        </code>
      </pre>
  </div>
</template>
<script>
export default {
  name: 'pagerExp',
  data() {
    return {
      page: {
        tableName: 'componentsView', //表格或页面唯一名称标识
        currentPage: 1, //当前页
        pageSize: 20,
        pageSizes: [20, 50, 100, '全部'],
        total: 233, //总条数
      },
      currentPage: 1,
      pageSize: 20,
      showSource: false,
      pagerText: '<uf-pager :pager-config="page" @page-change="handlePageChange"></uf-pager>',
    }
  },
  methods: {
    handlePageChange({ currentPage, pageSize }) {
      if (pageSize === '全部') {
        this.currentPage = ''
        this.pageSize = ''
      } else {
        this.page.currentPage = currentPage
        this.page.pageSize = pageSize
      }
    },
  },
}
</script>
