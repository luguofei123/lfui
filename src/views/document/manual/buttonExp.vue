<template>
  <div>
    <lf-button>默认按钮</lf-button>
    &nbsp;&nbsp;
    <lf-button type="primary" size="small">primary</lf-button>
    &nbsp;&nbsp;
    <lf-button type="primary">primary</lf-button>
    &nbsp;&nbsp;
    <lf-button @click="test1" loading disabled>默认按钮</lf-button>
    &nbsp;&nbsp;
    <lf-button type="primary" size="large" @click="test" icon="iconyujing3" disabled>primary</lf-button>
    <!-- <span class="iconfont iconyujing3">
      default, primary, dashed, danger, link
      </span> -->
    <br />
    <br />
    <lf-button-group>
      <lf-button type="default" size="small" @click="test($event, '3333')">primary</lf-button>
      <lf-button type="primary" size="small" @click="test('dddd')">primary</lf-button>
      <lf-button type="dashed" size="small" @click="test">primary</lf-button>
      <lf-button type="danger" size="small" @click="test">primary</lf-button>
      <lf-button type="link" size="small" @click="test">primary</lf-button>
      <lf-button type="warning" size="small" @click="test">primary</lf-button>
    </lf-button-group>
  </div>
</template>
<script>
export default {
  data() {
    return {}
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
