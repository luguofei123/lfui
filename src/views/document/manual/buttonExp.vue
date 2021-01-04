<template>
  <div>
    <h3>按钮 uf-button</h3>

    <h4>按钮类型(size默认)</h4>
    <div>
      <uf-button type="primary">主要按钮</uf-button>
      <uf-button class="ml-10" type="default">次要按钮</uf-button>
      <uf-button class="ml-10" type="normal">辅助按钮</uf-button>
      <uf-button class="ml-10" type="primary" icon="icon-plus">图标文字按钮</uf-button>
      <uf-button class="ml-10" type="default" icon="icon-print">图标文字按钮</uf-button>
      <uf-button class="ml-10" type="normal" icon="icon-download">图标文字按钮</uf-button>
    </div>
    <div class="mt-10">
      <uf-button type="primary" icon="icon-setting"></uf-button>
      <uf-button class="ml-10" type="default" icon="icon-print"></uf-button>
      <uf-button class="ml-10" type="normal" icon="icon-download"></uf-button>
      <uf-button-group class="ml-10">
        <uf-button type="default" icon="icon-print" />
        <uf-button type="default" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button type="normal" icon="icon-print" />
        <uf-button type="normal" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button type="default" icon="icon-print" />
        <uf-button type="default" icon="icon-plus"></uf-button>
        <uf-button type="default" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button type="normal" icon="icon-print" />
        <uf-button type="normal" icon="icon-plus"></uf-button>
        <uf-button type="normal" icon="icon-download" />
      </uf-button-group>
    </div>
    <div class="mt-10">
      <uf-button-group>
        <uf-button type="default" icon="icon-plus">按钮</uf-button>
        <uf-button type="default" icon="icon-print">按钮</uf-button>
        <uf-button type="default" icon="icon-print">按钮</uf-button>
        <uf-button type="default" icon="icon-download">按钮</uf-button>
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button type="normal" icon="icon-plus">按钮</uf-button>
        <uf-button type="normal" icon="icon-print">按钮</uf-button>
        <uf-button type="normal" icon="icon-print">按钮</uf-button>
        <uf-button type="normal" icon="icon-download">按钮</uf-button>
      </uf-button-group>
    </div>
    <div class="mt-10">
      <uf-button type="combox" :options="dataList" @select="onClickComboxBtnOption">下拉按钮</uf-button>
      <uf-button class="ml-20" type="comboxlink" :options="dataList" @select="onClickcomboxlinkOption">下拉链接</uf-button>
      <uf-button class="ml-20" type="more">更多</uf-button>
      <uf-button class="ml-20" type="link">链接</uf-button>
      <uf-button class="ml-20" type="iconlink" icon="icon-trash">图标链接</uf-button>
      <uf-button class="ml-20" type="iconlink" icon="icon-trash"></uf-button>
    </div>

    <h4>按钮大小</h4>

    <h5>&nbsp;&nbsp;1、大按钮 size="large"</h5>
    
    <div>
      <uf-button size="large" type="primary">主要按钮</uf-button>
      <uf-button size="large" class="ml-10" type="default">次要按钮</uf-button>
      <uf-button size="large" class="ml-10" type="normal">辅助按钮</uf-button>
      <uf-button size="large" class="ml-10" type="primary" icon="icon-plus">图标文字按钮</uf-button>
      <uf-button size="large" class="ml-10" type="default" icon="icon-print">图标文字按钮</uf-button>
      <uf-button size="large" class="ml-10" type="normal" icon="icon-download">图标文字按钮</uf-button>
    </div>
    <div class="mt-10">
      <uf-button size="large" type="primary" icon="icon-setting"></uf-button>
      <uf-button size="large" class="ml-10" type="default" icon="icon-print"></uf-button>
      <uf-button size="large" class="ml-10" type="normal" icon="icon-download"></uf-button>
      <uf-button-group class="ml-10">
        <uf-button size="large" type="default" icon="icon-print" />
        <uf-button size="large" type="default" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button size="large" type="normal" icon="icon-print" />
        <uf-button size="large" type="normal" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button size="large" type="default" icon="icon-print" />
        <uf-button size="large" type="default" icon="icon-plus"></uf-button>
        <uf-button size="large" type="default" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button size="large" type="normal" icon="icon-print" />
        <uf-button size="large" type="normal" icon="icon-plus"></uf-button>
        <uf-button size="large" type="normal" icon="icon-download" />
      </uf-button-group>
    </div>
    <div class="mt-10">
      <uf-button-group>
        <uf-button size="large" type="default" icon="icon-plus">按钮</uf-button>
        <uf-button size="large" type="default" icon="icon-print">按钮</uf-button>
        <uf-button size="large" type="default" icon="icon-print">按钮</uf-button>
        <uf-button size="large" type="default" icon="icon-download">按钮</uf-button>
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button size="large" type="normal" icon="icon-plus">按钮</uf-button>
        <uf-button size="large" type="normal" icon="icon-print">按钮</uf-button>
        <uf-button size="large" type="normal" icon="icon-print">按钮</uf-button>
        <uf-button size="large" type="normal" icon="icon-download">按钮</uf-button>
      </uf-button-group>
    </div>
    <div class="mt-10">
      <uf-button size="large" type="combox" :options="dataList" @select="onClickComboxBtnOption">下拉按钮</uf-button>
      <uf-button size="large" class="ml-20" type="comboxlink" :options="dataList" @select="onClickcomboxlinkOption">下拉链接</uf-button>
      <uf-button size="large" class="ml-20" type="more">更多</uf-button>
      <uf-button size="large" class="ml-20" type="link">链接</uf-button>
      <uf-button size="large" class="ml-20" type="iconlink" icon="icon-trash">图标链接</uf-button>
      <uf-button size="large" class="ml-20" type="iconlink" icon="icon-trash"></uf-button>
    </div>

    <h5 class="mt-10">&nbsp;&nbsp;2、小按钮 size="small"</h5>
    
    <div>
      <uf-button size="small" type="primary">主要按钮</uf-button>
      <uf-button size="small"  class="ml-10" type="default">次要按钮</uf-button>
      <uf-button size="small"  class="ml-10" type="normal">辅助按钮</uf-button>
      <uf-button size="small"  class="ml-10" type="primary" icon="icon-plus">图标文字按钮</uf-button>
      <uf-button size="small"  class="ml-10" type="default" icon="icon-print">图标文字按钮</uf-button>
      <uf-button size="small"  class="ml-10" type="normal" icon="icon-download">图标文字按钮</uf-button>
    </div>
    <div class="mt-10">
      <uf-button size="small"  type="primary" icon="icon-setting"></uf-button>
      <uf-button size="small"  class="ml-10" type="default" icon="icon-print"></uf-button>
      <uf-button size="small"  class="ml-10" type="normal" icon="icon-download"></uf-button>
      <uf-button-group class="ml-10">
        <uf-button size="small"  type="default" icon="icon-print" />
        <uf-button size="small"  type="default" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button size="small"  type="normal" icon="icon-print" />
        <uf-button size="small"  type="normal" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button size="small"  type="default" icon="icon-print" />
        <uf-button size="small"  type="default" icon="icon-plus"></uf-button>
        <uf-button size="small"  type="default" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button size="small"  type="normal" icon="icon-print" />
        <uf-button size="small"  type="normal" icon="icon-plus"></uf-button>
        <uf-button size="small"  type="normal" icon="icon-download" />
      </uf-button-group>
    </div>
    <div class="mt-10">
      <uf-button-group>
        <uf-button size="small"  type="default" icon="icon-plus">按钮</uf-button>
        <uf-button size="small"  type="default" icon="icon-print">按钮</uf-button>
        <uf-button size="small"  type="default" icon="icon-print">按钮</uf-button>
        <uf-button size="small"  type="default" icon="icon-download">按钮</uf-button>
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button size="small"  type="normal" icon="icon-plus">按钮</uf-button>
        <uf-button size="small"  type="normal" icon="icon-print">按钮</uf-button>
        <uf-button size="small"  type="normal" icon="icon-print">按钮</uf-button>
        <uf-button size="small"  type="normal" icon="icon-download">按钮</uf-button>
      </uf-button-group>
    </div>
    <div class="mt-10">
      <uf-button size="small"  type="combox" :options="dataList" @select="onClickComboxBtnOption">下拉按钮</uf-button>
      <uf-button size="small"  class="ml-20" type="comboxlink" :options="dataList" @select="onClickcomboxlinkOption">下拉链接</uf-button>
      <uf-button size="small"  class="ml-20" type="more">更多</uf-button>
      <uf-button size="small"  class="ml-20" type="link">链接</uf-button>
      <uf-button size="small"  class="ml-20" type="iconlink" icon="icon-trash">图标链接</uf-button>
      <uf-button size="small"  class="ml-20" type="iconlink" icon="icon-trash"></uf-button>
    </div>

    <h4>点击事件(click)</h4>
    <div>
      <uf-button type="primary" @click="onClick1">按钮1</uf-button>
      <uf-button class="ml-20" type="default" @click="onClick2">按钮2</uf-button>
    </div>

    <h4>开关切换/下拉事件(select)</h4>

    <h4>禁用</h4>

    <div>
      <uf-button disabled type="primary">主要按钮</uf-button>
      <uf-button disabled class="ml-10" type="default">次要按钮</uf-button>
      <uf-button disabled class="ml-10" type="normal">辅助按钮</uf-button>
      <uf-button disabled class="ml-10" type="primary" icon="icon-plus">图标文字按钮</uf-button>
      <uf-button disabled class="ml-10" type="default" icon="icon-print">图标文字按钮</uf-button>
      <uf-button disabled class="ml-10" type="normal" icon="icon-download">图标文字按钮</uf-button>
    </div>
    <div class="mt-10">
      <uf-button disabled type="primary" icon="icon-setting"></uf-button>
      <uf-button disabled class="ml-10" type="default" icon="icon-print"></uf-button>
      <uf-button disabled class="ml-10" type="normal" icon="icon-download"></uf-button>
      <uf-button-group class="ml-10">
        <uf-button disabled type="default" icon="icon-print" />
        <uf-button disabled type="default" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button disabled type="normal" icon="icon-print" />
        <uf-button disabled type="normal" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button disabled type="default" icon="icon-print" />
        <uf-button disabled type="default" icon="icon-plus"></uf-button>
        <uf-button disabled type="default" icon="icon-download" />
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button disabled type="normal" icon="icon-print" />
        <uf-button disabled type="normal" icon="icon-plus"></uf-button>
        <uf-button disabled type="normal" icon="icon-download" />
      </uf-button-group>
    </div>
    <div class="mt-10">
      <uf-button-group>
        <uf-button disabled type="default" icon="icon-plus">按钮</uf-button>
        <uf-button disabled type="default" icon="icon-print">按钮</uf-button>
        <uf-button disabled type="default" icon="icon-print">按钮</uf-button>
        <uf-button disabled type="default" icon="icon-download">按钮</uf-button>
      </uf-button-group>
      <uf-button-group class="ml-10">
        <uf-button disabled type="normal" icon="icon-plus">按钮</uf-button>
        <uf-button disabled type="normal" icon="icon-print">按钮</uf-button>
        <uf-button disabled type="normal" icon="icon-print">按钮</uf-button>
        <uf-button disabled type="normal" icon="icon-download">按钮</uf-button>
      </uf-button-group>
    </div>
    <div class="mt-10">
      <uf-button disabled type="combox" :options="dataList" @select="onClickComboxBtnOption">下拉按钮</uf-button>
      <uf-button disabled class="ml-20" type="comboxlink" :options="dataList" @select="onClickcomboxlinkOption">下拉链接</uf-button>
      <uf-button disabled class="ml-20" type="more">更多</uf-button>
      <uf-button disabled class="ml-20" type="link">链接</uf-button>
      <uf-button disabled class="ml-20" type="iconlink" icon="icon-trash">图标链接</uf-button>
      <uf-button disabled class="ml-20" type="iconlink" icon="icon-trash"></uf-button>
    </div>

    <h4>主题颜色</h4>

    <!-- <div class="showSrcWrap">
      <uf-button class="ml-20" @click="showSource = !showSource" type="more">显示代码</uf-button>
    </div> -->

    <!-- <pre v-if="showSource">
      <code>{{pagerText}}</code>
      <code>
      export default {
      }
      </code>
    </pre> -->
  </div>
</template>
<script>
export default {
  name: 'buttonExp',
  data() {
    return {
      showSource: false,
      pagerText: '<uf-pager :pager-config="page" @page-change="handlePageChange"></uf-pager>',
      dataList: [
        {
          title: '北京',
          value: '1',
        },
        {
          title: '上海',
          value: '2',
        },
        {
          title: '广州',
          value: '3',
        },
      ],
    }
  },
  methods: {
    onClick1(e) {
      console.log(e)
      alert('点击了按钮1')
    },
    onClick2() {
      alert('点击了按钮2')
    },
    onClickComboxBtnOption(item, e) {
      console.log(item, e)
    },
    onClickcomboxlinkOption(item, e) {
      console.log(item, e)
    },
  }
}
</script>
