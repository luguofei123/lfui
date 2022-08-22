<template>
  <div class="demoBox">
    <div class="demo">
      <lf-radio v-model="radio" label="1" @change="radioChange">单选</lf-radio>
      <lf-radio v-model="radio" label="2" @change="radioChange">单选</lf-radio>
    </div>
    <div class="demo">
      <pre v-highlightjs><code class="javascript">{{code1}}</code></pre>
    </div>
    <div class="demo">
      <lf-radio-group>
        <lf-radio v-model="radio1" label="1">单选</lf-radio>
        <lf-radio v-model="radio1" label="2">单选</lf-radio>
        <lf-radio v-model="radio1" label="3">单选</lf-radio>
      </lf-radio-group>
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
      radio: '1',
      radio1: '1',
      code1: `
      <lf-radio v-model="radio" label="1" @change="radioChange">单选</lf-radio>
      <lf-radio v-model="radio" label="2" @change="radioChange">单选</lf-radio>
      `,
      code2: `
    <lf-radio-group>
      <lf-radio v-model="radio1" label="1">单选</lf-radio>
      <lf-radio v-model="radio1" label="2">单选</lf-radio>
      <lf-radio v-model="radio1" label="3">单选</lf-radio>
    </lf-radio-group>`
    }
  },
  methods: {
    radioChange(e) {
      console.log('test1')
      console.log(e)
    }
  }
}
</script>
<style lang='scss'>
// .demoBox {
//   .demo {
//     margin-bottom: 16px;
//   }
// }
</style>
