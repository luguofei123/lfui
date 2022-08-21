<template>
  <div class="demoBox">
    <div class="demo">
      <lf-button>默认按钮</lf-button>
      &nbsp;&nbsp;
      <lf-button type="primary" size="small">primary</lf-button>
      &nbsp;&nbsp;
      <lf-button type="primary">primary</lf-button>
      &nbsp;&nbsp;
      <lf-button @click="test1" loading disabled>默认按钮</lf-button>
      &nbsp;&nbsp;
      <lf-button type="primary" size="large" @click="test" icon="iconyujing3" disabled>primary</lf-button>
    </div>
    <div class="demo">
      <pre v-highlightjs><code class="javascript">{{code1}}</code></pre>
    </div>
    <div class="demo">
      <lf-button-group>
        <lf-button type="default" size="small" @click="test($event, '3333')">primary</lf-button>
        <lf-button type="primary" size="small" @click="test('dddd')">primary</lf-button>
        <lf-button type="dashed" size="small" @click="test">primary</lf-button>
        <lf-button type="danger" size="small" @click="test">primary</lf-button>
        <lf-button type="link" size="small" @click="test">primary</lf-button>
        <lf-button type="warning" size="small" @click="test">primary</lf-button>
      </lf-button-group>
    </div>
    <div class="demo">
      <pre v-highlightjs><code class="javascript">{{code2}}</code></pre>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code1: `
      <lf-button>默认按钮</lf-button>
      &nbsp;&nbsp;
      <lf-button type="primary" size="small">primary</lf-button>
      &nbsp;&nbsp;
      <lf-button type="primary">primary</lf-button>
      &nbsp;&nbsp;
      <lf-button @click="test1" loading disabled>默认按钮</lf-button>
      &nbsp;&nbsp;
      <lf-button type="primary" size="large" @click="test" icon="iconyujing3" disabled>primary</lf-button>
      `,
      code2: `
    <lf-button-group>
      <lf-button type="default" size="small" @click="test($event, '3333')">primary</lf-button>
      <lf-button type="primary" size="small" @click="test('dddd')">primary</lf-button>
      <lf-button type="dashed" size="small" @click="test">primary</lf-button>
      <lf-button type="danger" size="small" @click="test">primary</lf-button>
      <lf-button type="link" size="small" @click="test">primary</lf-button>
      <lf-button type="warning" size="small" @click="test">primary</lf-button>
    </lf-button-group>
      `
    }
  },
  methods: {
    test(e, value) {
      console.log(value)
      console.log(e)
    },
    test1(e) {
      console.log('test1')
      console.log(e)
    }
  }
}
</script>
<style lang='scss'>
.demoBox {
  .demo {
    margin-bottom: 16px;
  }
}
</style>
