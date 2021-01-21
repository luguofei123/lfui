<template>
  <div>
    <h3>抽屉 uf-drawer</h3>

    <p>业务化的抽屉组件，为头部(header)的显示预留出了空间</p>
    <uf-button @click="drawerVisible = !drawerVisible">显示抽屉</uf-button>

    <div class="showSrcWrap">
      <uf-button class="ml-20" @click="showSource = !showSource" type="more">显示代码</uf-button>
    </div>

    <div>
        <highlightjs language='html' :code="htmlcode" />
    </div>

    <uf-drawer v-model="drawerVisible" :zIndex="99" :width="500" @drawerClose="drawerClose" ref="drawer">
      <div class="drawer-content" @click.stop>
        <h3 style="padding: 20px;">这里是展示内容</h3>
      </div>

      <template v-slot:footer>
        <div @click.stop>
          <uf-button class="mr-8" type="primary" @click.stop="queryHandle">查询</uf-button>
          <uf-button class="mr-8">保存</uf-button>
          <uf-button>另存为</uf-button>
        </div>
      </template>
    </uf-drawer>
  </div>
</template>
<script>
export default {
  name: 'drawer-exp',
  data() {
    return {
      drawerVisible: false,
      showSource: false,
      htmlcode: '<template>\n<a-input placeholder="Basic usage" />\n</template>'
    }
  },
  mounted() {
  },
  methods: {
    queryHandle() {
      console.log('query')
    },
    drawerClose() {
      this.drawerVisible = false
    },
  },
}
</script>
<style>
</style>
