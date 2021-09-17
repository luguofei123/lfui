<template>
  <div>
    <lf-button>默认按钮</lf-button>
    &nbsp;&nbsp;
    <lf-button type="primary" size="small">primary</lf-button>
    &nbsp;&nbsp;
    <lf-button type="primary">primary</lf-button>
    &nbsp;&nbsp;
    <lf-button @click="test1" disabled>默认按钮</lf-button>
    &nbsp;&nbsp;
    <lf-button type="primary" size="large" @click="test" disabled>primary</lf-button>
    <span class="iconfont iconyujing3"></span>
    <br />
    <lf-button-group>
      <lf-button type="primary" size="small" @click="test">primary</lf-button>
      <lf-button type="primary" size="small" @click="test">primary</lf-button>
      <lf-button type="primary" size="small" @click="test">primary</lf-button>
      <lf-button type="primary" size="small" @click="test">primary</lf-button>
      <lf-button type="primary" size="small" @click="test">primary</lf-button>
      <lf-button type="primary" size="small" @click="test">primary</lf-button>
    </lf-button-group>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    test(e) {
      console.log('test')
      console.log(e)
    },
    test1(e) {
      console.log('test1')
      console.log(e)
    }
  }
}
</script>
